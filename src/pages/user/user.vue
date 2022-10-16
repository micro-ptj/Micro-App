<template>
  <view class="content">
	  <view class="content-user">
		  <view class="content-user-avatar">
			  <u-avatar :src="user.avatar" mode="square"></u-avatar>
		 </view>
			  <view class="content-user-username">{{user.username}}</view>
		 
		  
		  <view>{{user.address}}</view>
		  <view>ETH：{{money}}</view>
		  
	  </view>
	 
	  <u-cell-item icon="shopping-cart-fill" title="我的竞拍"></u-cell-item>
	  <u-cell-item icon="bookmark-fill" title="发布" @click="toProdoctRelease"></u-cell-item>
	  <u-cell-item icon="setting-fill" title="退出" @click="toLogout"></u-cell-item>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {useUserStore} from "@/store/modules/user";
import { logout } from '@/network/api';
import { onLoad } from '@dcloudio/uni-app';

const useUserState = useUserStore()
const user = computed(() => useUserState.getUserInfo)
const money = computed(() => useUserState.getMoney)


onLoad(async() => {
	await useUserState.setUserInfo()
	await useUserState.setBalance()
})

const src = ref('http://cdn.ut.tj.cn/test/bg.jpg')

const toLogout = () => {
	logout().then(res => {
		console.log(res);
		uni.removeStorage({
			key: 'token',
			success: function () {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		});
	})
}

const toProdoctRelease = () => {
	uni.navigateTo({
		url: '/pages/product/newProduct'
	});
}

</script>

<style lang="scss" scoped>
	.content-user{
		padding: 40rpx;
		background-color: #ccc;
	}
	.content-user-avatar, .content-user-username{
		display: inline-block;
		vertical-align:middle;
		margin-right: 30rpx;
	}
</style>
