<template>
	<view class="wrap">
		<u-waterfall v-model="productList">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="toProductInfo(item)">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.imageLink" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.name}}
					</view>
					
					<view class="demo-tag">
						<view class="demo-tag-text" v-if="item.conditions == 0">
							新品
						</view>
						<view class="demo-tag-text" v-else>
							二手
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 0">
							未开始
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 1">
							正在进行
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 2">
							已结束
						</view>
					</view>
			
					<view class="demo-price">
						<view class="demo-price-a">ETH {{item.startPrice}}</view>
						
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="toProductInfo(item)">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.imageLink" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.name}}
					</view>
					
					<view class="demo-tag">
						<view class="demo-tag-text" v-if="item.conditions == 0">
							新品
						</view>
						<view class="demo-tag-text" v-else>
							二手
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 0">
							未开始
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 1">
							正在进行
						</view>
						<view class="demo-tag-text" v-if="item.dataAuctionStates === 2">
							已结束
						</view>
					</view>
								
					<view class="demo-price">
						<view class="demo-price-a">ETH {{item.startPrice}}</view>
						
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script lang="ts" setup>
import { config } from "@/config";
import {useProductStore} from "@/store/modules/product";
import { Product } from "@/type/response";
import { onLoad, onReady, onShow } from "@dcloudio/uni-app";
import { onMounted, computed, ref, reactive, ComputedRef } from 'vue';

const useProductState = useProductStore()


onLoad(async() => {
		await useProductState.changeVal()
		await useProductState.setProductList()
		initData()
	})

// onShow(async() => {
// 	await useProductState.changeVal()
// 	await useProductState.setProductList()
// 	initData()
// })
	
const product: ComputedRef<Product[]> = computed(() => useProductState.getProductList)

interface ProductList {
    id: number;
    name: string;
    category: string;
    imageLink: string;
    description: string;
    auctionStartTime: string;
    auctionEndTime: string;
    startPrice: number;
    status: string;
    conditions: string;
	dataAuctionStates: number
}

const productList = reactive<ProductList[]>([])

const initData = async() => {
	for (var i = 0; i < product.value.length; i++) {
		console.log(product.value[i].id);
		var auctionState:number;
		var auctionStartTimeReplace = replaceDate(product.value[i].auctionStartTime)
		var auctionEndTimeReplace = replaceDate(product.value[i].auctionEndTime)
		var dateNow = new Date();//获取当前时间
		var dateDiff = dateNow.getTime() - auctionStartTimeReplace.getTime();//时间差的毫秒数
		if (dateDiff <= 0){
			//竞拍未开始
			auctionState = 0
		}else{
			var dateDiff01 = auctionEndTimeReplace.getTime() - dateNow.getTime();//时间差的毫秒数
			if(dateDiff01 >= 0){
				//正在进行
				auctionState = 1
			}else{
				//结束
				auctionState = 2
			}
		}
		productList.push({id: product.value[i].id, 
			name: product.value[i].name,
			category: product.value[i].category,
			imageLink: config.base_url + product.value[i].imageLink,
			description: product.value[i].description,
			auctionStartTime: product.value[i].auctionStartTime,
			auctionEndTime: product.value[i].auctionEndTime,
			startPrice: product.value[i].startPrice,
			status: product.value[i].status,
			conditions: product.value[i].conditions,
			dataAuctionStates: auctionState
		})
	}
	
	
	function replaceDate(d1:string) {//di作为一个变量传进来
	    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
	    var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
		return dateBegin
	}
	
}

const toProductInfo = (event: ProductList) => {
	uni.navigateTo({
		url: '/pages/product/productInfo?id=' + event.id + '&auctionStates=' + event.dataAuctionStates
	});
}	
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
		font-weight: 700;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}



	.demo-tag-text {
		// border: 1px solid #d13a1b;
		color: #d13a1b;
		margin-right: 10px;
		line-height: 1;
		// padding: 4rpx 14rpx;
		padding: 2rpx;
		display: flex;
		align-items: center;
		// border-radius: 5rpx;
		font-size: 10rpx;
	}

.demo-price{
	display: flex;
			margin-top: 5px;
}

	.demo-price-a {
		font-size: 20rpx;
		color: $u-type-error;
		margin-right: 10px;
		display: flex;
		align-items: center;
	}

.demo-price-b{
	font-size: 10rpx;
	display: flex;
	align-items: center;
	color: #cccccc;
}
</style>
