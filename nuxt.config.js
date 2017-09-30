const ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
module.exports = {
    /**
     * rootDir 应用的根目录，默认值：process.cwd().该设置的限制条件是node_modules必须在改目录中
     */
    // rootDir : process.cwd(),

    /**
     * srcDir 应用的源码目录，默认值：rootDir。可以多应用共用资源，不用限制在node_modules同一路径
     */
    // srcDir : process.cwd(),
    head : {
        // title : 'nuxt',
        titleTemplate: '%s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '这是配置页面' }
        ],
        // link : [
        //     { rel : 'stylesheet', href : '/css/normalize.css' },
        //     { rel : 'stylesheet', href : '/css/main.css' }
        // ]
    },
    /**
     * loading :
     *      Boolean : true/false,默认true
     *      Object : 修改默认进度条样式
     *      String : 自定义loading组件path
     */
    loading : './components/loading.vue',

    /**
     * performance 性能
     *      gzip ： Boolean 压缩程序
     *      prefetch : 预加载
     */ 

    /**
     * 抽离style
     * 1、与head中的link属性不同的地方在于，使用css属性的是assets中的会进行便于，在link引用的不能编译，所以放在static中，static中的文件启动Nuxt后会复制到根路径'/'下.但是static下的内容是没有在HMR管理下的
     * 2、可以build中的配置extractCSS为true.
     * 3、所以可以使用build中plugins进行替换
     */ 
    css : [
        './assets/css/normalize.css',
        './assets/css/main.css'
    ],
    router : {
        middleware : [
            'auth'
        ]
    },
    /**
     * dev Boolean 配置 Nuxt.js 应用是开发模式还是生产模式。该值会被指令修改。如果想自己设置开发服务，可以自己配置一个server.js
     */ 
    dev : true,

    /**
     * env 配置环境变量
     */ 
    // env: {
    //     baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    // },

    /**
     * generate 生成静态站点的配置
     */ 
    // generate : {
    //     dir : 'dist',//默认dist
    //     minify : {},//压缩功能
    //     routes : []//动态路由生成，默认不按照路由生成静态文件。
    // },

    /**
     * 生产环境配置
     */
    // build : {
        /**
         * analyze 包信息可视化plugin，Boolean / Object  默认false（都一样会展示）,使用的webpack-bundle-analyzer插件，用于检查包的信息，包括大小、地址、gzip等，自己配的话可以查看npm。
         * 在nuxt.js中config.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin(Object.assign({}, this.options.build.analyze)));
         */ 
        analyze : true,
        // 针对js、vue的babel配置
        // babel : {
        //     presets : []
        // },
        // CSS 编译工具，自身提供了200多个插件用于处理编译css，也可以自己用js写一个.具体想用哪个直接npm查postcss文档
        // postcss : [
        //     require('postcss-modules')(),
        //     require('autoprefixer')({
        //         browsers: ['last 3 versions']
        //     })
        // ],
        // 使用自己配的插件替换Nuxt的配置，nuxt.js中有一个extractCSS属性，但是现在没用
        // plugins : [
        //     new ExtractTextWebpackPlugin({
        //         filename : '/css/[name].[contenthash].css',
        //         allChunks : true
        //     })
        // ]
    // },

    /**
     * cache 默认值：false。使用的是lru-cache插件更多的配置可以查看npm。该参数是在SSR才有用的。
     *      max : 默认1000，缓存的插件个数，如果个数1001那么第一个缓存的移除移除
     *      maxAge : 默认900000，缓存时间，毫秒数
     */
    // cache : {
    //     max : 1000,
    //     maxAge : 900000
    // },
    /**
     * watchers 首先webpack是自带一个watch参数的，从而实现监控文件并自动打包。但是Nuxt使用的监控文件变化是chokidar(警卫)插件来完成。辅助一些webapck的watchOptions参数。
     *      chokidar : Object  具体配置项，可以咋npm官网查看
     *      webpack : 其实就是webpack的watchOptions选项
     *          aggregateTimeout : 默认300毫秒，一个文件更改后到下一个文件更改之间的延迟时间，如果在这个时间之内则两次更改一起编译
     *          ignored : String/anymatch  排除那些文件不监控，出了使用字符串，还可以使用anymatch插件构建一个matchers传给ignored
     *          poll : Boolean/Number 可以指定毫秒数为单位进行轮询检查，如果为true只安默认的时间轮询
     */ 
    // watchers : {
    //     chokidar : {
    //         // 很多，可以参照npm插件文档按需添加
    //     },
    //     webpack : {
    //         // webpack的watchOptions参数配置
    //     }
    // }
}
