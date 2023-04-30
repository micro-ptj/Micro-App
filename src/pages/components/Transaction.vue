<template>
	<view>
		<view v-for="(val, key, i) in info.data" style="word-break:break-all">
			<u-row style="margin-top: 10rpx;">
				<u-col span="5" style="text-transform: capitalize;">{{key}}:</u-col>
				<u-col span="7" style="color: #ccc;">{{val}}</u-col>
			</u-row>
		</view>
	</view>
</template>

<script setup lang="ts">
import { transaction } from '@/network/api';
import { TransactionParam } from '@/type/request';
import { onMounted, toRefs } from 'vue';
import {reactive, ref} from 'vue';
	const props = defineProps({
		type: String,
		value: String
	})
	const param = reactive<TransactionParam>({
		sourceId: "",
		sourceType: ""
	})
	const {type} = toRefs(props)
	const {value} = toRefs(props)
	onMounted(() => {
		param.sourceId = value;
		param.sourceType = type;
		transaction(param).then((res: any) => {
			info.data = res.data
		})
	})
	
	const info = reactive({
		data: {}
	})
</script>

<style>
</style>