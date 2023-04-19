<template>
	<view class="content">

		<view class="login">
			<view class="title_1">区 块 链 ！</view>
			<view class="title_2">Welcome To Micro</view>
			<u-form :model="form" class="form" ref="uForm">
				<u-form-item left-icon="account">
					<u-input v-model="form.phone" type="number" placeholder="请输入号码" maxlength="11" placeholderStyle="color: #787878" class="form-input"/>
				</u-form-item>
				<u-form-item left-icon="lock">
					<u-input v-model="form.password" type="password" placeholder="请输入密码" placeholderStyle="color: #787878" class="form-input"/>
				</u-form-item>
			</u-form>

			<u-button @click="toLogin" shape="circle" class="submit" type="primary">登录</u-button>
            <u-row style="margin-top:50rpx">
				<u-col :span="4">
				<view>新用户注册</view>
				</u-col>
				<u-col :span="4" offset="4">
				<view @click="toLoginCode">验证码登录</view>
				</u-col>
			</u-row>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { config } from '@/config';
	import { LoginParam } from '@/type/request';
	import { reactive } from 'vue';
	const form = reactive<LoginParam>({
		phone: 15391493308,
		password: "qwer1234",
		code: null
	})
	const toLogin = () => {
		if (form.phone == null || form.password.length <= 5) {
			console.log("请输入正确的账号与密码");
		} else {
			console.log(form);
			uni.request({
				url: config.base_url + "/app/login",
				method: "POST",
				data: {
					"phone": form.phone,
					"password": form.password
				},
				header: {
					'Content-Type': 'application/json',
				},
				success: (res:any) => {
					if(res.data.code === 200){
						console.log(res.data.data.token);
						uni.setStorageSync('token', res.data.data.token)
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
const toLoginCode = () => {
	uni.navigateTo({
		url: '/pages/login/loginv1'
	})
}
	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/user/register'
		});
	}
</script>

<style scoped>
	.content{
		height: calc(100vh);
		background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
	}
	.login{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 80%;
		height: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		border-radius: 20rpx;
		padding: 20rpx;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.title_1{
		margin-bottom: 30rpx;
		font-size: medium;
		font-weight: 500;
		color: #5b5b5b;
	}
	.title_2{
		margin-bottom: 40rpx;
		font-size: x-large;
		font-weight: 600;
	}
	.submit{
		margin-top: 20rpx;
		width: 90%;
	}
    .register-box{
        margin: 20rpx;
    }
</style>
