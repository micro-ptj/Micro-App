<template>
	<view>
		<view v-for="item in dictsList">
			<view v-if="item.dictValue == value">
				<u-tag :text="item.dictLabel" size="mini" :type="item.listClass" square="circle"/>
			</view>
			
		</view>
	</view>
</template>

<script setup lang="ts">
import { getDicts } from '@/network/api';
import { onMounted, toRefs } from 'vue';
import {reactive, ref} from 'vue';
	const props = defineProps({
		type: String,
		value: Number
	})
	const {type} = toRefs(props)
	const {value} = toRefs(props)
	onMounted(() => {
		getDictTag()
	})
	interface DictsList {
		createBy: string;
		createTime: string;
		updateBy?: any;
		updateTime?: any;
		remark: string;
		dictCode: number;
		dictSort: number;
		dictLabel: string;
		dictValue: string;
		dictType: string;
		cssClass: string;
		listClass: string;
		isDefault: string;
		status: string;
		default: boolean;
	}
	const dictsList = ref<DictsList[]>()
	const getDictTag = () => {
		getDicts(type?.value as string).then((res: any) => {
			dictsList.value = res.data;
		})
	}
</script>

<style>
</style>