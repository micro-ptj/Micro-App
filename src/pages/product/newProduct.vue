<template>
	<view class="content">
		<u-form :model="form" ref="uForm">
			<u-form-item label="名称">
				<u-input v-model="form.name" clearable="true"/>
			</u-form-item>
			<u-form-item label="分类">
				<u-input v-model="form.category" clearable="true"/>
			</u-form-item>
			<u-form-item label="描述">
				<u-input v-model="form.descLink" clearable="true"/>
			</u-form-item>
			<u-form-item label="价格">
				<u-input v-model="form.startPrice" type="number"/>
			</u-form-item>
			<u-form-item label="状态">
						<u-radio-group v-model="radio">
							<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
			<view>
				<u-picker v-model="startTimeShow" mode="time" :params="params" @confirm="setStartTime"></u-picker>
				<u-cell-item title="开始时间" :value="form.auctionStartTime" @click="startTimeShow = true"></u-cell-item>
			</view>
			<view>
				<u-picker v-model="endTimeShow" mode="time" :params="params" @confirm="setEndTime"></u-picker>
				<u-cell-item title="结束时间" :value="form.auctionEndTime" @click="endTimeShow = true"></u-cell-item>
			</view>
			<u-form-item label="图片">
				<u-upload :action="action" @on-success="onSuccessUpload" :max-size="5 * 1024 * 1024" max-count="1">
				</u-upload>
			</u-form-item>
		</u-form>
		<u-button type="default" @click="toProduct">提交</u-button>
	</view>
	
</template>

<script lang="ts" setup>
	import {config} from "@/config"
	import { addProduct } from "@/network/api";
	import {ProductParam} from "@/type/request";
	import {reactive, ref} from "vue";
	const params = {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true
					}
	const startTimeShow = ref(false)
	const endTimeShow = ref(false)
	const radioList = [
					{
						name: '新品',
						disabled: false
					},
					{
						name: '二手',
						disabled: false
					}
				]
	const radio = ref("")
	const form = reactive <ProductParam> ({
		name: "",
		category: "",
		imageLink: "",
		descLink: "",
		auctionStartTime: "",
		auctionEndTime: "",
		startPrice: 0,
		conditions: ""
	})
	const setStartTime = (res:any) => {
		form.auctionStartTime = res.year + "-" + res.month + "-" + res.day + " " + res.hour + ":" + res.minute + ":" + res.second
	}
	const setEndTime = (res:any) => {
		form.auctionEndTime = res.year + "-" + res.month + "-" + res.day + " " + res.hour + ":" + res.minute + ":" + res.second
	}
	const action = config.base_url + 'upload-platform'
	const onSuccessUpload = (data: any) => {
		console.log(data);
		form.imageLink = data.url
	}
	const toProduct = () => {
		console.log(form);
		if(radio.value === "新品"){
			form.conditions = "0"
		}else{
			form.conditions = "1"
		}
		addProduct(form).then(res => {
			console.log(res);
		})
	}
</script>

<style lang="scss">
	.content{
		margin: 20rpx;
	}
</style>