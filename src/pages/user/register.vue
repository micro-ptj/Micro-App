<template>
	<view class="login-title">基于区块链的拍卖平台</view>
	<Avatar/>
	<u-form :model="form" ref="uForm" style="margin: 10rpx;">
		<u-form-item>
			<u-input v-model="form.username" placeholder="请输入电话号码" />
		</u-form-item>
		<u-form-item>
			<u-input type="password" v-model="form.password" placeholder="请输入密码" />
		</u-form-item>
	<!-- 	<u-form-item>
			<u-input v-model="form.code" placeholder="请输入验证码" />
		</u-form-item> -->
	</u-form>
	<u-button type="primary" @click="toRegister" style="margin: 10rpx;">注册</u-button>
</template>

<script lang="ts" setup>
import { RegisterParam } from '@/type/request';
import Avatar from '@/pages/user/avatar';
import { reactive } from 'vue';
import { config } from '@/config';
	const form = reactive<RegisterParam>({
		username: "",
		password: "",
		avatar: ""
	})

	const toRegister = () => {
		if (form.username == null || form.password.length <= 5) {
			console.log("请输入用户名与密码");
		} else {
			uni.getStorage({
				key: 'avatar',
				success: function (res: any) {
					form.avatar = res.data
				}
			});
			console.log(form);
			uni.request({
				url: config.base_url + "register",
				method: "POST",
				data: {
					"username": form.username,
					"avatar": form.avatar,
					"password": form.password
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
