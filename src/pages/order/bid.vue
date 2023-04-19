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
					<u-row>{{item.amount}}</u-row>
					<u-row>{{item.bidTime}}</u-row>
				</u-col>
			</u-row>
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
	  secret: "",
	  weiValue: 0
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
	
</script>

<style scoped>
.bid-box{
	margin: 15rpx;
	padding: 20rpx;
	border-radius: 10rpx;
	/* box-shadow: 0 0 15px #fff; */
	background-color: #fff;
}
</style>
