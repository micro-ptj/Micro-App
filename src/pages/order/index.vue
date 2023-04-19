<template>
	<view>
		<u-tabs-swiper :current="current" name="cate_name" @change="tabsChange" :list="list" :is-scroll="false"></u-tabs-swiper>
	</view>
	<view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
							@scrolltolower="lower" @scroll="scroll">
							<component :is="tab" />
						</scroll-view>
		
	</view>
</template>
<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue';
import order from './order.vue';
import bid from './bid.vue';
import { onShow } from '@dcloudio/uni-app';
	
	onShow(() => {
		current.value = 0
		tab.value = bid
	})
	
	const scrollTop = ref(0)
	const old = reactive({
					scrollTop: 0
				}) 
	const upper = (e:any) =>{
		console.log(e)
	}
	const lower = (e:any) =>{
		console.log(e)
	}
	const scroll = (e:any) =>{
		console.log(e)
		old.scrollTop = e.detail.scrollTop
	}		
	const tab = shallowRef(bid)
	const current = ref<number>(0)
	const list = reactive([{
					cate_name: '已出价'
				}, {
					cate_name: '订单'
				}])
	const tabsChange = (index : number) => {
		current.value = index
		if(index == 0){
			tab.value = bid
		}else if(index == 1){
			tab.value = order
		}
	}
</script>

<style scoped>
	.scroll-Y {
			height: calc(84vh);
		}
</style>