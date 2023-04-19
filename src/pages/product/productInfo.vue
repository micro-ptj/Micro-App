<template>
	<view class="productInfo">
		<u-image width="100%" height="300rpx" :src="productInfo.imageLink"></u-image>
		<view style="font-size: medium; font-weight: 550;">{{productInfo.name}}</view>
		<view >起拍价：{{productInfo.startPrice}}</view>
		<view>
			 <view v-html="productInfo.description"></view>
		</view>
		
		<view class="bidBtn-box">
			<u-row>
				<u-col :span="5">
					<u-row>
						<view style="text-align: center; font-weight: 600;">距竞拍结束</view>
					</u-row>
					<u-row>
						<u-count-down :timestamp="timestamp.diff" style="font-size: medium; font-weight: 600;"></u-count-down>
					</u-row>
				</u-col>
				<u-col :span="7">
					<u-button type="error" @click="bidShow = true" :disabled="routerOption.auctionStates != 1">竞拍</u-button>
				</u-col>
			</u-row>
		</view>
		
		<u-popup v-model="bidShow" mode="bottom" width="100%" height="500rpx">
			<view class="price-box">起拍价：{{productInfo.startPrice}}</view>
			<u-col offset="4" :span="4">
				<u-form :model="bids" class="form-box">
					<u-form-item :border-bottom="false"><u-input :border="true" v-model="bids.amount" type="number" style="text-align: center;"/></u-form-item>
				</u-form>
			</u-col>
			
			<u-button class="bidbtn-box" type="error" @click="onBids">确定</u-button>
		</u-popup>
	</view>
</template>


<script lang="ts" setup>
import { config } from "@/config";
import { bid, getProductById } from '@/network/api';
import { BidParam } from '@/type/request';
import { Product } from '@/type/response';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

var bidShow = ref<boolean>(false)

const timestamp = reactive({
	diff: 0
})

const bids = reactive<BidParam>({
  amount: "",
  goodsId: "",
})

const productInfo = reactive<Product>({
	id: 0,
	name: "",
	category: "",
	imageLink: "",
	description: "",
	auctionStartTime: "",
	auctionEndTime: "",
	startPrice: 0,
	status: "",
	conditions: ""
})

const onBids = () => {
	bids.goodsId = routerOption.id
	console.log(bids);
	bid(bids).then((res:any) => {
		console.log(res);
		if(res.code == 200){
			uni.showToast({
			    title: '出价成功',
			    duration: 1000
			});
			bidShow.value = false;
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/order/index'
				})
			}, 1000);
			
		}
		
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
			productInfo.description = product.description
			productInfo.startPrice = product.startPrice
			productInfo.imageLink = config.base_url + product.imageLink
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
	.bidBtn-box{
		position: fixed;
		/*下面的属性根据实际需求更改*/
		left: 0;
		right: 0;
		bottom: 0;
	}
	.price-box{
		text-align: center;
		font-size: large;
		font-weight: 600;
		padding: 20rpx;
	}
	.bidbtn-box{
		position: fixed;
		/*下面的属性根据实际需求更改*/
		left: 0;
		right: 0;
		bottom: 0;
	}
	.form-box{
		margin-top: 20rpx;
		padding: 3rpx;
		
	}
</style>
