<template>
    <div>
        <el-text size="large" style="font-size: 32px">工单列表</el-text>
        <el-form style="margin-top: 15px" :inline="true">
            <el-form-item>
                <el-button type="primary" @click="createOrder">新增</el-button>
                <el-button type="primary" @click="getOrders">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="orders" stripe border v-loading="tableLoading">
            <el-table-column prop="ID" label="工单ID" />
            <el-table-column prop="platform" label="平台" />
            <el-table-column prop="report_date" label="创建日期" />
            <el-table-column prop="account_id" label="账号ID" />
            <el-table-column prop="account_password" label="账号密码" />
            <el-table-column prop="url" label="链接" width="200">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-text class="url-text" :title="scope.row.url">
                            {{ scope.row.url }}
                        </el-text>
                        <el-button v-if="scope.row.url" type="primary" text bg @click="copyText(scope.row.url)">复制</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="数量" />
            <el-table-column prop="accuracy" label="正确率" />
            <el-table-column prop="creator_id" label="创建人" />
            <el-table-column prop="solver_id" label="处理人" />
            <el-table-column prop="money" label="金额" />
            <el-table-column prop="remark" label="备注" />
        </el-table>
        <PaginationComponent :total="total" v-model:page-obj="pageObj" :onUpdate="getOrders" />
        <CreateOrder v-model:show="showCreateOrder" :reflesh="getOrders" />
    </div>
</template>
<script lang="ts" name="Order" setup>
import { onMounted, ref } from 'vue'
import PaginationComponent from '@/components/Pagination.vue'
import { type Order } from '@/types/order'
import * as orderApi from '@/api/order'
import { ElMessage } from 'element-plus'
import CreateOrder from './components/CreateOrder.vue'

const total = ref(0)
const pageObj = ref({
    page: 1,
    page_size: 20
})
const orders = ref<Order[]>([])

const tableLoading = ref(false)

const getOrders = async () => {
    tableLoading.value = true
    const response = (await orderApi.getOrders(pageObj.value)) as any
    orders.value = response.list
    total.value = response.total
    tableLoading.value = false
}

onMounted(() => {
    getOrders()
})

const showCreateOrder = ref(false)
const createOrder = function () {
    showCreateOrder.value = true
}

const copyText = async (text: string) => {
    try {
        console.log(text)
        await navigator.clipboard.writeText(text)
        ElMessage.success('复制成功')
    } catch (err) {
        ElMessage.error('复制失败')
    }
}
</script>
<style scoped>
.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.url-text {
    max-width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
