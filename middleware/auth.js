export default ( context )=>{
    context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent;
}