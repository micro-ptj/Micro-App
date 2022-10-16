<template>
	<view class="login">
		<view class="login-header">
			<view class="login-icon">
				<u-image width="40rpx" height="40rpx" :src="src"></u-image>
			</view>
			<view class="login-title">基于区块链的拍卖平台</view>
		</view>
		
		
		<u-form :model="form" ref="uForm" style="margin: 10rpx;">
			<u-form-item>
				<u-input v-model="form.username" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item>
				<u-input type="password" v-model="form.password" placeholder="请输入密码" />
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="toLogin" style="margin: 10rpx;">登录</u-button>
		<u-button type="primary" @click="toRegister" style="margin: 10rpx;">注册</u-button>
	</view>
</template>

<script lang="ts" setup>
import { config } from '@/config';
import { LoginParam } from '@/type/request';
import { reactive } from 'vue';
	const src = "http://cdn.ut.tj.cn/static/auction.png"
	const form = reactive<LoginParam>({
		username: "admin",
		password: "qwer1234"
	})

	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/user/register'
		});
	}
	const toLogin = () => {
		if (form.username == null || form.password.length <= 5) {
			console.log("请输入正确的账号与密码");
		} else {
			console.log(form);
			uni.request({
				url: config.base_url + "login",
				method: "POST",
				data: {
					"username": form.username,
					"password": form.password
				},
				header: {
					'Content-Type': 'application/json',
				},
				success: (res:any) => {
					if(res.data.code === 200){
						
						// uni.setStorage({
						// 	key: 'token',
						// 	data: res.data.data,
						// 	success: function () {
						// 		console.log('success');
						// 	}
						// });
						// console.log(res.data.data);
						console.log(res.data.data.tokenHead + " " + res.data.data.token);
						uni.setStorageSync('token', res.data.data.tokenHead + " " + res.data.data.token)
						setTimeout(() => {
							if(uni.getStorageSync('token') != null){
								uni.switchTab({
									url: '/pages/product/product'
								});
							}
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
	.login{
		margin-top: 200rpx;
	}
	.login-header{
		margin-top: 100rpx;
		display: table;
		margin: 0 auto;
	}
	.login-icon{
		display: inline-block;
		margin-right: 10rpx;
		vertical-align:middle;
	}
	.login-title {
		display: inline-block;
		font-size: 30rpx;
		vertical-align:middle;
	}
</style>
