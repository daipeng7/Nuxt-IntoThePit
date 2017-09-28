<template>
    <div class="layout">
        <img src="logo.png" alt="">
        <ul>
            <li>
                <nuxt-link to="/">
                    index
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/users">
                    users
                </nuxt-link>
            </li>
        </ul>
        <transition>
            <nuxt />
        </transition>
    </div>
</template>
<script>
    export default {
        name : 'layout-default'
    }
</script>
