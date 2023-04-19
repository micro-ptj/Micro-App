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
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { config } from '@/config';
import { getOrder } from '@/network/api';
import { QueryParams } from '@/type/request';
import { Order } from '@/type/response';
import { onMounted, reactive, ref } from 'vue';
onMounted(() => {
	getOrderList()
})
const emptyShow = ref<boolean>(false)
const queryParam = reactive<QueryParams>({
	pageNum: 1,
	pageSize: 15
})
const bidList = ref<Order[]>()
const getOrderList = () => {
	getOrder(queryParam).then((res: any) => {
		if(res.rows.length != 0){
			emptyShow.value = false
			bidList.value = res.rows
		}
		console.log(res);
	})
}
const setImgUrl = (e: string) => {
	return config.base_url + e 
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
</style>
