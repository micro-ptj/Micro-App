<template>
	<view class="login-title">基于区块链的拍卖平台</view>
	<Avatar/>
	<u-form :model="form" ref="uForm" style="margin: 10rpx;">
		<u-form-item>
			<u-input v-model="form.phone" type="number" placeholder="请输入电话号码" />
		</u-form-item>
		<u-form-item>
			<u-input type="password" v-model="form.password" placeholder="请输入密码" />
		</u-form-item>
	<u-form-item >
		<u-input v-model="form.code" type="number" placeholder="请输入验证码" maxlength="4" class="form-input"/>
	    <u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
	</u-form-item>
	</u-form>
	<u-button type="primary" @click="toRegister" style="margin: 10rpx;">注册</u-button>
</template>

<script lang="ts" setup>
import { RegisterParam } from '@/type/request';
import Avatar from '@/pages/user/avatar';
import { reactive, ref } from 'vue';
import { config } from '@/config';
	const form = reactive<RegisterParam>({
		phone: "",
		password: "",
		avatar: "",
		code: ""
	})
	const codeTips = ref("获取验证码")
    const getCode =() => {
		if (form.phone != null){
			uni.request({
				url: config.base_url + "/app/code",
				method: "GET",
				data: {
					"phone": form.phone,
					"type": "login"
				},
				header: {
					'Content-Type': 'application/json',
				},
				success: (res:any) => {
					if(res.data.code === 200){
						console.log("获取成功")
						codeTips.value = "重新获取";
					}else{
						console.log(res.data.msg);
					}
				},
			})
		}
    }
	const toRegister = () => {
		if (form.phone == null || form.password.length <= 5) {
			console.log("请输入正确的用户名与密码");
		} else {
			uni.getStorage({
				key: 'avatar',
				success: function (res: any) {
					form.avatar = res.data
				}
			});
			console.log(form);
			uni.request({
				url: config.base_url + "/app/register",
				method: "POST",
				data: {
					"phone": form.phone,
					"avatar": form.avatar,
					"password": form.password,
					"code": form.code
				},
				header: {
					'Content-Type': 'application/json',
				},
				success: (res:any) => {
					if(res.data.code === 200){
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}, 1000)
					}else{
						console.log(res.data.msg);
					}
				},
			})
			

		}
	}
</script>

<style scoped>
	.login-title {
		font-size: 30rpx;
		text-align: center;
		margin-top: 50px;
	}
</style>
