<template>
    <el-drawer title="创建工单" v-model="showDrawer" size="600" class="create-order">
        <el-row :gutter="20">
            <el-col :span="4" style="margin-top: 5px">平台</el-col>
            <el-col :span="8">
                <el-select v-model="platform">
                    <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-top: 5px">数量</el-col>
            <el-col :span="8">
                <el-input v-model="amount" />
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="4" style="margin-top: 5px">账号ID</el-col>
            <el-col :span="8">
                <el-input v-model="accountID" />
            </el-col>
            <el-col :span="4" style="margin-top: 5px">账号密码</el-col>
            <el-col :span="8">
                <el-input v-model="accountPassword" />
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="4" style="margin-top: 5px">正确率</el-col>
            <el-col :span="8">
                <el-input v-model.number="accuracy" />
            </el-col>
            <el-col :span="4" style="margin-top: 5px">金额</el-col>
            <el-col :span="8">
                <el-input v-model.number="money" />
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="4" style="margin-top: 5px">创建人</el-col>
            <el-col :span="8">
                <el-input v-model="creatorID" />
            </el-col>
            <el-col :span="4" style="margin-top: 5px">接单人</el-col>
            <el-col :span="8">
                <el-input v-model="solverId" />
            </el-col>
        </el-row>
        <div style="margin-top: 20px">
            Url
            <br />
            <el-input v-model="url" style="width: 100%; margin-top: 5px" :rows="2" type="textarea" autosize />
        </div>

        <el-button type="primary" class="submit-button" @click="createOrder">提交</el-button>
    </el-drawer>
</template>
<script lang="ts" name="CreateOrder" setup>
import { computed, ref } from 'vue'
import { addOrder } from '@/api/order'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    reflesh: {
        type: Function,
        required: true
    }
})
const emit = defineEmits(['update:show'])

const showDrawer = computed({
    get: () => props.show,
    set: (val: boolean) => {
        emit('update:show', val)
    }
})

const platform = ref('')
const platforms = ref([
    {
        value: 'PLATFORM_QINGMA',
        label: '青马'
    },
    {
        value: 'PLATFORM_ELSE',
        label: '其他'
    }
])

const accountID = ref()
const accountPassword = ref()
const amount = ref(200)
const accuracy = ref(0.8)
const money = ref(5.0)
const creatorID = ref()
const solverId = ref()
const url = ref()

const createOrder = async () => {
    const order = {
        platform: platform.value,
        amount: amount.value,
        account_id: accountID.value,
        account_password: accountPassword.value,
        accuracy: accuracy.value,
        money: money.value,
        creator_id: creatorID.value,
        solver_id: solverId.value,
        url: url.value
    }
    await addOrder(order)
    submit()
}

const submit = async () => {
    props.reflesh()
    showDrawer.value = false
}
</script>
<style scoped>
.submit-button {
    margin-top: 200px;
    margin-left: 500px;
}
</style>
