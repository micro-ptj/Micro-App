<template>
	<view>
		<view class="goods-box">
			<u-row>
				<u-col span="3">
					<u-image border-radius="10rpx" width="150rpx" height="150rpx" :src="setImgUrl(info.data.image)"></u-image>
				</u-col>
				<u-col span="9">
					<u-row style="color: #000;font-size: medium;font-weight: 600;">{{info.data.goodsName}}(<DictTag type="micro_googs_category" :value="info.data.category"></DictTag>)</u-row>
				
					<u-row>单价：{{info.data.startPrice}}</u-row>
				</u-col>
			</u-row>
		</view>
		<view class="order-box">
			<u-row>
				<u-col span="3">
					<view v-if="type == 'micro_order'">
						<view>订单状态</view>
					</view>
					<view v-if="type == 'micro_bid'">
						<view>竞拍状态</view>
					</view>
				</u-col>
				<u-col span="9">
					<view v-if="type == 'micro_order'">
						<view><DictTag type="micro_order_status" :value="info.data.status"/></view>
					</view>
					<view v-if="type == 'micro_bid'">
						<view><DictTag type="micro_bid_status" :value="info.data.status"/></view>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="3">
					<view>出价：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.amount}}</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="3">
					<view>创建时间：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.time}}</view>
				</u-col>
			</u-row>
		</view>
		
		<view class="address-box" v-if="type == 'micro_order' && info.data.status != '0'">
			<u-row>
				<u-col span="3">
					<view>姓名：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.name}}</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="3">
					<view>电话：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.phone}}</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="3">
					<view>地址：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.address}}</view>
				</u-col>
			</u-row>
		</view>
		<view class="express-box" v-if="info.data.trackingNum != null">
			<u-row>
				<u-col span="3">
					<view>快递单号：</view>
				</u-col>
				<u-col span="9">
					<view>{{info.data.trackingNum}}</view>
				</u-col>
			</u-row>
		</view>
		
		<view class="transaction-box">
			<Transaction :value="id" :type="type"/>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { config } from '@/config';
import { bidInfo, orderInfo } from '@/network/api';
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
	const type = ref<string>()
	const id = ref<string>()
	const info = reactive({
		data: {}
	})
	
	onLoad((e) => {
		type.value = e.type
		id.value = e.id as string
		if(e.type == 'micro_bid'){
			bidInfo(id.value).then((res: any) => {
				info.data = res.data
			})
		}
		if(e.type == 'micro_order'){
			orderInfo(id.value).then((res: any) => {
				info.data = res.data
			})
		}
	})
	
	const setImgUrl = (e: string) => {
		return config.base_url + e 
	}
</script>

<style scoped lang="scss">
.goods-box, .order-box, .express-box, .address-box, .transaction-box{
	background-color: #fff;
	margin-top: 15rpx;
	padding: 20rpx;
}
</style>
