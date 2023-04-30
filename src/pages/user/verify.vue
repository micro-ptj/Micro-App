<template>
    <view>
        <u-form :model="form" label-position="top" border-bottom>
    		<u-form-item label="姓名"><u-input v-model="form.name" placeholder="请输入姓名"/></u-form-item>
    		<u-form-item label="电话号码"><u-input type="number" v-model="form.phone" placeholder="请输入电话号码"/></u-form-item>
    		<u-form-item label="身份证号码"><u-input v-model="form.idCard" placeholder="请输入身份证号码"/></u-form-item>
    	</u-form>
           <u-button type="error" shape="square" @click="toVerify">确定</u-button>
    </view>
	
</template>

<script lang="ts" setup>
import { IdentityParam } from '@/type/request';
import { reactive } from 'vue';
import { identityVerify } from '@/network/api';


const form = reactive<IdentityParam>({
    name: "",
    idCard: "",
    phone: ""
})

const toVerify = () => {
    identityVerify(form).then((res: any) => {
        setTimeout(() => {
            uni.reLaunch({
                url: '/pages/user/user'
            })
        }, 1000);
    })
}
</script>