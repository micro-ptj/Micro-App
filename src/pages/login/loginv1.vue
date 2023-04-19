<template>
	<view class="content">

		<view class="login">
			<view class="title_1">区 块 链 ！</view>
			<view class="title_2">Welcome To Micro</view>
			<u-form :model="form" class="form" ref="uForm">
				<u-form-item left-icon="account">
					<u-input v-model="form.phone" type="number" placeholder="请输入号码" maxlength="11" placeholderStyle="color: #787878" class="form-input"/>
				</u-form-item>
				<u-form-item left-icon="chat">
					<u-input v-model="form.code" type="number" placeholder="请输入验证码" placeholderStyle="color: #787878" maxlength="4" class="form-input"/>
                    <u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
				</u-form-item>
			</u-form>
			
			<u-button @click="toLogin" shape="circle" class="submit" type="primary">登录</u-button>
            <u-row style="margin-top:50rpx">
				<u-col :span="4">
				<view>新用户注册</view>
				</u-col>
				<u-col :span="4" offset="4">
				<view @click="toLoginPhone">密码登录</view>
				</u-col>
			</u-row>

		</view>
	</view>

</template>

<script lang="ts" setup>
	import { config } from '@/config';
	import { LoginParam } from '@/type/request';
	import { reactive, ref } from 'vue';

	const form = reactive<LoginParam>({
		phone: 15391493308,
		password: null,
        code: null
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
	const toLogin = () => {
		if (form.phone == null) {
			console.log("请输入正确的手机号");
		} else {
			console.log(form);
			uni.request({
				url: config.base_url + "/app/login",
				method: "POST",
				data: {
					"phone": form.phone,
					"code": form.code
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

	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/user/register'
		});
	}
const toLoginPhone =() => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
}
</script>

<style scoped>
	.content{
		height: calc(100vh);
		background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
