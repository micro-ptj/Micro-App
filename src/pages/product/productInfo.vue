<template>
	<view class="productInfo">
		<u-image width="100%" height="300rpx" :src="productInfo.imageLink"></u-image>
		<view>【名称】{{productInfo.name}}</view>
		<view>【描述】{{productInfo.descLink}}</view>
		<view>
			<view style="display: inline-block;">【倒计时】</view>
			<u-count-down :timestamp="timestamp.diff" style="display: inline-block;"></u-count-down>
		</view>
		<view>【起拍价格】{{productInfo.startPrice}}</view>
		<u-button type="error" @click="bidShow = true" :disabled="routerOption.auctionStates != 1">竞拍</u-button>
		<u-popup v-model="bidShow" mode="bottom" border-radius="14" width="100%" height="700rpx">
			<u-form :model="bids" label-position="top">
				<u-form-item label="出价"><u-input v-model="bids.amount" type="number" /></u-form-item>
				<u-form-item label="加密字符"><u-input v-model="bids.secret" /></u-form-item>
				<u-form-item label="保证金"><u-input v-model="bids.weiValue" /></u-form-item>
			</u-form>
			<u-button type="success" @click="onBids">提交</u-button>
		</u-popup>
	</view>
</template>


<script lang="ts" setup>
import { bid, getProductById } from '@/network/api';
import { BidParam } from '@/type/request';
import { Product } from '@/type/response';
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

var bidShow = ref<boolean>(false)

const timestamp = reactive({
	diff: 0
})

const bids = reactive<BidParam>({
  amount: "",
  productId: "",
  secret: "",
  weiValue: 0
})

const productInfo = reactive<Product>({
	id: 0,
	name: "",
	category: "",
	imageLink: "",
	descLink: "",
	auctionStartTime: "",
	auctionEndTime: "",
	startPrice: 0,
	status: "",
	conditions: ""
})

const onBids = () => {
	bids.productId = routerOption.id
	console.log(bids);
	bid(bids).then(res => {
		console.log(res);
		bidShow.value = false;
	})
}

const routerOption = reactive({
	id: "",
	auctionStates: ""
})
onLoad((option) => {
	console.log(option);
	routerOption.id = option.id as string
	routerOption.auctionStates = option.auctionStates as string
	
	if (routerOption.id != "") {
		getProductById(routerOption.id).then((res:any) => {
			console.log(res.data);
			const product:Product = res.data
			productInfo.id = product.id
			productInfo.name = product.name
			productInfo.descLink = product.descLink
			productInfo.startPrice = product.startPrice
			productInfo.imageLink = product.imageLink
			productInfo.auctionEndTime = product.auctionEndTime
			productInfo.auctionStartTime = product.auctionStartTime
			timeFn(product.auctionEndTime)
		})
	}
})

function timeFn(d1:string) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
	
    var dateEnd = new Date();//获取当前时间
    var dateDiff = dateBegin.getTime() - dateEnd.getTime();//时间差的毫秒数
	if(dateDiff <= 0){
		console.log("结束");
	}else{
		timestamp.diff = dateDiff;
		console.log(dateDiff);
		var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
		var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000))//计算出小时数
		//计算相差分钟数
		var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
		//计算相差秒数
		var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000)
		console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
		    ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
	}
	
}

</script>


<style lang="scss" scoped>
	.productInfo{
		margin: 10rpx;
	}
</style>
