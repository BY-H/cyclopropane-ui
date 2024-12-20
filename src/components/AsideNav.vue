<template>
    <el-menu :default-active="route.path" class="el-menu-vertical-demo" mode="vertical" :router="true">
        <el-menu-item v-for="routeItem in filteredRoutes" :key="routeItem.path" :index="routeItem.path">
            <template #title>
                <el-icon v-if="routeItem.meta?.icon">
                    <component :is="icons[routeItem.meta.icon]"></component>
                </el-icon>
                {{ routeItem.meta?.title }}
            </template>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts" name="AsideNav" setup>
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const icons = ElementPlusIconsVue

const filteredRoutes = computed(() => router.options.routes.filter(r => r.meta && r.meta.title))
</script>
<style scoped>
.el-menu-demo {
    background-color: #333;
    color: #fff;
}
.el-menu-item {
    color: inherit;
}
</style>
