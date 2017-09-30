# Nuxt 内部构造函数 #

### 描述 ###
	nuxt是一个SSR工具，也可以放弃SSR部分功能。如果想，也是可以自己搭建一个类似的工具。但是呢，大家都懂得。
	如果我们要用别人的工具，肯定要先入坑趟趟（专业术语叫做知识储备）。官方文档那是十分精简的（中文文档就先给你来波坑）。对于使用过vue-cli这套脚手架的同学来说入手那是很简单的。反正都是各种造轮子，就看哪个轮子圆。
	这次趟坑还是照样各种全部备注上，用得上的时候直接来。接下来主要是解读下内部构造函数
	
	const { 
	    Nuxt, 
	    Builder,
	    Generator,
	    Module,
	    Options,
	    Renderer,
	    Utils
 	} = require( 'nuxt' );

## Nuxt ##
- [NUXT CLASS](HTTPS://NUXTJS.ORG/API/INTERNALS-NUXT)  
- Source [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/nuxt.js "core/nuxt.js")
- 在这个阶段可以注册四个Tappable事件：

| name    |   arguments        | description                                 |
| --------|:------------------:|:--------------------------------------------|
| ready   | nuxt               |所有模块初始化完成，渲染前执行                   |
| error   | error              |错误时触发                                     |
| close   | -                  |nuxt关闭是触发                                 |
| listen  | {server,host,port} |Nuxt内部服务器开始监听。(使用nuxt启动或nuxt dev)  |
	
		
		import Tapable from 'tappable'
		import chalk from 'chalk'
		import { Options } from 'common'
		import ModuleContainer from './module'
		import Renderer from './renderer'
		import Debug from 'debug'
		import enableDestroy from 'server-destroy'
		import Module from 'module'
		import { join, resolve } from 'path'
		
		const debug = Debug('nuxt:')
		debug.color = 5
		//一开头就是这句，这个其实和webpack中Compiler中的Tapable.call(this)一样都在继承tappable插件（一个发布订阅模式的插件）的方法	
		export default class Nuxt extends Tapable {
		  constructor (_options = {}) {
		    super()
			//_options就是我们的config
		    this.options = Options.from(_options)
		
		    //根据rootDir解析node_modules包路径
		    this.nodeModulePaths = Module._nodeModulePaths(this.options.rootDir)
			
			//单例控制字段
		    this.initialized = false
			//错误处理方法，这儿绑定this，是为errorHandler内部的this。说明有可能这个方法脱离当前实例去执行
		    this.errorHandler = this.errorHandler.bind(this)
		
		    // 创建核心组件实例，
		    this.moduleContainer = new ModuleContainer(this)
			// 创建renderer实例
		    this.renderer = new Renderer(this)
		
		    // Backward compatibility
		    this.render = this.renderer.app
		    this.renderRoute = this.renderer.renderRoute.bind(this.renderer)
		    this.renderAndGetWindow = this.renderer.renderAndGetWindow.bind(this.renderer)
		
		    // Default Show Open if Nuxt is not listening
		    this.showOpen = () => {}
			
		    this._ready = this.ready().catch(this.errorHandler)
		  }
		
		  async ready () {
		    if (this._ready) {
		      return this._ready
		    }
		
		    await this.moduleContainer._ready()
			//这些触发的事件都是通过nuxt.plugin( name, handler )方法注册的，然后在这儿回调执行
		    await this.applyPluginsAsync('ready')
		    await this.renderer._ready()
		
		    this.initialized = true
		    return this
		  }
		
		  listen (port = 3000, host = 'localhost') {
		    // Update showOpen
		    this.showOpen = () => {
		      const _host = host === '0.0.0.0' ? 'localhost' : host
		      // eslint-disable-next-line no-console
		      console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` http://${_host}:${port}\n`))
		    }
		
		    return new Promise((resolve, reject) => {
		      const server = this.renderer.app.listen({ port, host, exclusive: false }, err => {
		        /* istanbul ignore if */
		        if (err) {
		          return reject(err)
		        }
		
		        // Close server on nuxt close
		        this.plugin('close', () => new Promise((resolve, reject) => {
		          // Destroy server by forcing every connection to be closed
		          server.destroy(err => {
		            debug('server closed')
		            /* istanbul ignore if */
		            if (err) {
		              return reject(err)
		            }
		            resolve()
		          })
		        }))
		
		        resolve(this.applyPluginsAsync('listen', { server, port, host }))
		      })
		
		      // Add server.destroy(cb) method
		      enableDestroy(server)
		    })
		  }
		
		  errorHandler /* istanbul ignore next */() {
		    // Apply plugins
		    // eslint-disable-next-line no-console
		    this.applyPluginsAsync('error', ...arguments).catch(console.error)
		
		    // Silent
		    if (this.options.errorHandler === false) {
		      return
		    }
		
		    // Custom errorHandler
		    if (typeof this.options.errorHandler === 'function') {
		      return this.options.errorHandler.apply(this, arguments)
		    }
		
		    // Default handler
		    // eslint-disable-next-line no-console
		    console.error(...arguments)
		  }
		
		  resolvePath (path) {
		    // Try to resolve using NPM resolve path first
		    try {
		      let resolvedPath = Module._resolveFilename(path, { paths: this.nodeModulePaths })
		      return resolvedPath
		    } catch (e) {
		      // Just continue
		    }
		    // Shorthand to resolve from project dirs
		    if (path.indexOf('@@') === 0 || path.indexOf('~~') === 0) {
		      return join(this.options.rootDir, path.substr(2))
		    } else if (path.indexOf('@') === 0 || path.indexOf('~') === 0) {
		      return join(this.options.srcDir, path.substr(1))
		    }
		    return resolve(this.options.srcDir, path)
		  }
		
		  async close (callback) {
		    await this.applyPluginsAsync('close')
		
		    /* istanbul ignore if */
		    if (typeof callback === 'function') {
		      await callback()
		    }
		  }
		}

## Renderer ##
- Source [core/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/renderer.js)  
	
		代码有点多，就不展示了。其主要目的就是构建一个中间件，负责拦截请求并结合nuxt做出相应的处理后response，所以该中间件必须放在所有中间件的最后，因为它不会再调用next()将请求向下传递。
		两个事件：
			nuxt.plugin('renderer', renderer => {
				//SSR中间件和所有资源都准备好了
			    renderer.plugin('setupMiddleware', app => {
			        // 在nuxt添加它的中间件堆栈之前。我们可以使用它来注册定制服务器端中间件。
			    })
			})

## Module Container ##

Source [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/lib/core/module.js)  

所有的模块都会在该实例中被操作处理，相当于除了在congfig中能够配置module，在这儿也可以操作，具体暴露的方法如下：

| name              |   params           | description                                 |
| ------------------|:------------------:|:--------------------------------------------|
| addVendor(vendor) | ['module']         |添加到配置中的options.build.vendor项           |
| addTemplate(tpl)  | string<br>{src,optios,filename}|添加到配置中的options.build.templates项   |
| close         | -                  |nuxt关闭是触发                                 |
| listen        | {server,host,port} |Nuxt内部服务器开始监听。(使用nuxt启动或nuxt dev)  |