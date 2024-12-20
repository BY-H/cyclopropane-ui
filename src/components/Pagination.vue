<template>
    <div class="demo-pagination-block" style="display: flex; justify-content: flex-end; margin-top: 15px">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" :page-sizes="[10, 20, 50, 100, 200]" :background="background" layout="slot, sizes, prev, pager, next" :total="total" @change="changeEvent">
            <span>
                <div class="el-pagination__total">总 {{ total }} 条</div>
            </span>
        </el-pagination>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ComponentSize } from 'element-plus'

const props = defineProps({
    pageObj: {
        type: Object,
        default: () => {
            return {
                page: 1,
                page_size: 20
            }
        }
    },
    total: {
        type: Number,
        default: 0
    },
    onUpdate: {
        type: Function,
        required: true
    }
})
const emit = defineEmits(['update:pageObj'])

const size = ref<ComponentSize>('default')
const background = ref(true)

const currentPage = computed({
    get: () => props.pageObj.page,
    set: (val: number) => {
        emit('update:pageObj', {
            ...props.pageObj,
            page: val
        })
    }
})

const pageSize = computed({
    get: () => props.pageObj.page_size,
    set: (val: number) => {
        emit('update:pageObj', {
            ...props.pageObj,
            page_size: val
        })
    }
})

const changeEvent = () => {
    props.onUpdate()
}
</script>
<style>
.demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
}
.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>
