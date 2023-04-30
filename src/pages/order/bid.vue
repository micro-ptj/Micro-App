<template>
	<view>
		<view v-if="emptyShow">
			<u-empty
				mode="list"
				icon="https://cdn.uviewui.com/uview/demo/empty/list.png"
			>
			</u-empty>
		</view>
		
		<view class="bid-box" v-for="(item, index) in bidList">
			<view @click="showContent(item.id)"> 
				<u-row>
					<u-col span="6" style="font-size: medium;font-weight: 600;">{{item.name}}</u-col>
					<u-col span="3" offset="3">
						<DictTag type="micro_bid_status" :value="item.status"/>
					</u-col>
					
				</u-row>
				<u-row>
					<u-col span="2">
						<u-image border-radius="10rpx" width="110rpx" height="110rpx" :src="setImgUrl(item.image)"></u-image>
					</u-col>
					<u-col span="9">
						<u-row style="color: #ccc;">{{item.amount}}</u-row>
						<u-row style="color: #ccc;">{{item.bidTime}}</u-row>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { BidParam, QueryParams } from '@/type/request';
import { onMounted, reactive, ref } from 'vue';
import { getBid } from '@/network/api';
import { Bid } from '@/type/response';
import { config } from '@/config';
	const emptyShow = ref<boolean>(false)
	onMounted(() => {
		getBidsList()
	})
	const bids = reactive<BidParam>({
	  amount: "",
	  goodsId: "",
	})
	const bidList = ref<Bid[]>()
	const queryParam = reactive<QueryParams>({
		pageNum: 1,
		pageSize: 10
	})
	const getBidsList = () => {
		getBid(queryParam).then((res: any) => {
			console.log(res);
			if (res.rows.length != 0){
				emptyShow.value = false
				bidList.value = res.rows
			}
		})
	}
	
	const setImgUrl = (e: string) => {
		return config.base_url + e 
	}
	const showContent = (e :number) => {
		uni.navigateTo({
			url: '/pages/order/contentInfo?id=' + e + '&type=micro_bid'
		})
	}
</script>

<style scoped>
.bid-box{
	margin: 15rpx;
	padding: 20rpx;
	border-radius: 10rpx;
	background-color: #fff;
}
</style>
