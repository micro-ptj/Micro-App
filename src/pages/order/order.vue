<template>
	<view>
		<view v-if="emptyShow">
			<u-empty
				mode="list"
				icon="https://cdn.uviewui.com/uview/demo/empty/list.png"
			>
			</u-empty>
		</view>
	
		<view class="order-box" v-for="(item, index) in bidList">
			<view @click="showContent(item.id)">
				<u-row>
					<u-col span="6" style="font-size: medium;font-weight: 550;">{{item.name}}</u-col>
					<u-col span="3" offset="3">
						<DictTag type="micro_order_status" :value="item.status"/>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="2">
						<u-image border-radius="10rpx" width="110rpx" height="110rpx" :src="setImgUrl(item.image)"></u-image>
					</u-col>
					<u-col span="9">
						<u-row style="color: #ccc;">{{item.amount}}</u-row>
						<u-row style="color: #ccc;">{{item.orderTime}}</u-row>
						<u-row>
								<view v-if="item.status == 0"><u-button type="error" size="mini" plain @click="pickupShow(item.id)">提货</u-button></view>
						</u-row>
					</u-col>
					
				</u-row>
			
			</view>
		</view>
		
		<u-popup v-model="show" mode="bottom" width="100%" height="300px">
			<view style="margin: 20rpx;">
				<u-section title="地址" sub-title="默认"></u-section>
			</view>
			<view class="address-box">
				<view>
					<u-icon label="姓名:" size="30" name="account-fill"/>{{data.address.name}}
				</view>
				<view>
					<u-icon label="电话:" size="30" name="phone-fill"/>{{data.address.phone}}
				</view>
				<view>
					<u-icon label="地址:" size="30" name="map-fill"/>{{data.address.address}}
				</view>
			</view>
			<u-button style="position: fixed; bottom: 0; width: 100%;" @click="pickup" type="error">确定</u-button>
		</u-popup>
	</view>
</template>

<script lang="ts" setup>
import { config } from '@/config';
import { addressDefault, getOrder, getPickup } from '@/network/api';
import { QueryParams } from '@/type/request';
import { Order } from '@/type/response';
import { onMounted, reactive, ref } from 'vue';
onMounted(() => {
	getOrderList()
})
const show = ref<boolean>(false)
const emptyShow = ref<boolean>(false)
const queryParam = reactive<QueryParams>({
	pageNum: 1,
	pageSize: 15
})
const data = reactive({
	address: {}
})
const pickupParam = reactive({
	orderId: "",
	addressId:""
})
const bidList = ref<Order[]>()
const getOrderList = () => {
	getOrder(queryParam).then((res: any) => {
		if(res.rows.length != 0){
			emptyShow.value = false
			bidList.value = res.rows
		}
	})
}
const getAddressInfo = () => {
	addressDefault().then((res: any) => {
		data.address = res.data
		pickupParam.addressId = data.address.id
	})
}
const pickupShow = (e:string) => {
	show.value = true
	getAddressInfo()
	pickupParam.orderId = e
}
const pickup =() => {
	console.log(pickupParam);
	getPickup(pickupParam).then(res => {
		show.value = false
		getOrderList()
	})
}
const setImgUrl = (e: string) => {
	return config.base_url + e 
}
const showContent = (e :number) => {
	uni.navigateTo({
		url: '/pages/order/contentInfo?id=' + e + '&type=micro_order'
	})
}
</script>

<style scoped>
.order-box{
	margin: 15rpx;
	padding: 20rpx;
	border-radius: 10rpx;
	/* box-shadow: 0 0 15px #fff; */
	background-color: #fff;
}
.address-box{
	margin-top: 15rpx;
	padding: 10rpx;
	background-color: #fff;
	
}
.address-box > view{
		padding: 10rpx;
	}
</style>
