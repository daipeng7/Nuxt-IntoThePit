<template>
    <div>
        <h1>hello world!</h1>
        <div>{{project}}</div>
    </div>
</template>
<script>
    export default {
        data () {
            return { project: 'default' }
        },
        // 在组件每次加载（或更新）前调用，可以返回对象会覆盖data
        asyncData(context){
            // console.log( context );     
            // return { project: 'nuxt' }
        },
        // fetch 在组件渲染前填充应用的状态树（store），与 asyncData 方法类似，不同的是它不会设置组件的数据。
        // async fetch ({ store, params }) {
        //     let { data } = await axios.get('http://my-api/stars')
        //     store.commit('setStars', data)
        // },
        // 选择布局，可以使用function
        // layout : 'default',
        // middleware : [],//中间件引用
        // scrollToTop : true,//用于控制页面渲染前是否滚动至页面顶部。默认false
        // 参数验证
        // validate({ params, query }) {
        //     return true // 如果参数有效
        //     return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
        // },
        name : 'index',
        head : {
            title : 'index',
            meta : [
                { hid : 'description', name : 'discription', content : '这是index页面' }
            ]
        },
        middleware : [
            'auth'
        ],
        transition : {
            name : 'index',
            mode : 'out-in'
        }
    }
</script>