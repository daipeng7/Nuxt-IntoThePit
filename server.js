/**
 * unxt 模块
 */ 
const { 
    Nuxt, 
    Builder,
    Generator,
    Module,
    Options,
    Renderer,
    Utils
 } = require( 'nuxt' );
const express = require( 'express' );
const nuxtConfig = require( './nuxt.config.js' );

const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3000;

let app = express();
let nuxt = new Nuxt( nuxtConfig );

/**
 * nuxt.render( req, res )函数将 nuxt 当做了一个Node.js服务端的中间件
 */ 
app.use( nuxt.render );


/**
 * 在开发模式下启用编译构建和热加载
 */ 
if( nuxt.options.dev ){
    new Builder( nuxt ).build()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    
}

app.listen( port, ()=>{
    console.log( 'server is running!' );
} );