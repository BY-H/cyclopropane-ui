<template>
    <el-container>
        <el-aside width="180px">
            <AsideNav />
        </el-aside>

        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AsideNav from './components/AsideNav.vue'
</script>

<style scoped></style>
