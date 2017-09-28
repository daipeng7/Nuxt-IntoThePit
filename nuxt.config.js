const ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
module.exports = {
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
     * 2、可以修改\node_modules\_nuxt@1.0.0-rc11@nuxt\dist\nuxt.js中的配置extractCSS，但是试了下没用，所以可以使用build中plugins进行替换
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
     * Boolean 配置 Nuxt.js 应用是开发模式还是生产模式。该值会被指令修改。
     */ 
    // dev : true,

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
    build : {
        // 使用自己配的插件替换Nuxt的配置，nuxt.js中有一个extractCSS属性，但是现在没用
        // plugins : [
        //     new ExtractTextWebpackPlugin({
        //         filename : '/css/[name].[contenthash].css',
        //         allChunks : true
        //     })
        // ]
    }
}