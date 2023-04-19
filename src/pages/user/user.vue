<template>
	<view class="content">
		<view class="content-user">
			<view class="content-user-avatar">
				<u-avatar :src="conversionUrl(user.avatar)" mode="square"></u-avatar>
			</view>
			<view class="content-user-info">
				<view class="user-top">{{user.username}}</view>
				<view class="user-top">{{user.name != null && user.name != '' ? '已实名' : '未实名'}}</view>
			</view>
		</view>

		<view class="user-card">
			<view class="user-card-address">{{user.address}}</view>
			<view class="user-card-balance">ETH：{{user.balance}}</view>
		</view>

		<u-cell-group>
			<u-cell-item icon="shopping-cart-fill" title="我的订单" @click="toOrder"></u-cell-item>
			<!-- <u-cell-item icon="bookmark-fill" title="发布" @click="toProdoctRelease"></u-cell-item> -->
			<u-cell-item icon="bookmark-fill" title="实名认证" @click="toVerify"></u-cell-item>
			<u-cell-item icon="setting-fill" title="应用设置" @click="toSetting"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script setup lang="ts">
	import {
		computed,
		ref
	} from 'vue';
	import {
		useUserStore
	} from "@/store/modules/user";
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import { config } from '@/config';

	const useUserState = useUserStore()
	const user = computed(() => useUserState.getUserInfo)
	// const money = computed(() => useUserState.getMoney)


	onLoad(async () => {
		// await useUserState.setBalance()
		await useUserState.setUserInfo()
	})

	const toSetting = () => {
		uni.navigateTo({
			url: '/pages/setting/setting'
		});
	}
	const toVerify = () => {
		uni.navigateTo({
			url: '/pages/user/verify'
		});
	}
	const toOrder = () => {
		uni.switchTab({
			url: '/pages/order/index'
		});
	}
	const toProdoctRelease = () => {
		uni.navigateTo({
			url: '/pages/product/newProduct'
		});
	}
	const conversionUrl = (str: string) => {
		return config.base_url + str
	}

</script>

<style lang="scss" scoped>
	.content-user {
		border-radius: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-left: 40rpx;
		padding-top: 20rpx;
		padding-bottom: 80rpx;

		background-color: #ccc;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.content-user-avatar,
	.content-user-info {
		margin-right: 30rpx;
	}

	.user-top {
		margin: 10rpx;
		font-size: x-medium;
		font-weight: 600;
	}

	.user-card {
		margin-left: 60rpx;
		margin-right: 60rpx;
		background-color: #757575;
		color: #fff;
		border-radius: 30rpx;
		box-shadow: 0rpx 0rpx 40rpx #000;
		transform: translateY(-30%);

		view {
			width: 100%;
			display: inline-block;
			white-space: pre-wrap;
			word-wrap: break-word;
			height: auto;

			font-size: medium;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 20rpx;
		}
	}
	// .bottom-card{
	// 	// transform: translateY(-10%);
	// }
</style>
