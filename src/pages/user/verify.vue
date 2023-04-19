<template>
    <view>
        <u-form :model="form" label-position="top" border-bottom>
    		<u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
    		<u-form-item label="电话号码"><u-input v-model="form.phone" /></u-form-item>
    		<u-form-item label="身份证号码"><u-input v-model="form.idCard"/></u-form-item>
    	</u-form>
           <u-button type="error" shape="square" @click="toVerify">确定</u-button>
    </view>
	
</template>

<script lang="ts" setup>
import { IdentityParam } from '@/type/request';
import { reactive } from 'vue';
import { identityVerify } from '@/network/api';


const form = reactive<IdentityParam>({
    name: "浦同矫",
    idCard: "530381200012211732",
    phone: "15391493308"
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