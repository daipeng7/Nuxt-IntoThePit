<template>
    <div>
        <h1>这是users</h1>
    </div>
</template>
<script>
export default {
    name : 'users',
    head : {
        title : 'users',
        meta : [
            // hid字段可以设置，其作用是确保覆盖父组件的同name的meta
            { hid : 'description', name : 'discription', content : '这是users页面' }
        ]
    },
    transition : {
        name : 'users-id',
        mode : 'out-in'
    }
}
</script>
