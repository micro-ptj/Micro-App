<template>
	<view>
		<view class="address-box" v-for="(item, index) in data.list" :key="index">
			<view>
				<u-icon label="姓名:" size="30" name="account-fill"/>{{item.name}}
			</view>
			<view>
				<u-icon label="电话:" size="30" name="phone-fill"/>{{item.phone}}
			</view>
			<view>
				<u-icon label="地址:" size="30" name="map-fill"/>{{item.address}}
			</view>
			<u-line color="red" />
			<view class="bottom-box">
				<view>
					<u-icon v-if="item.isDefault == 1" label="默认地址" size="30" name="checkmark-circle-fill" color="red"></u-icon>
					<u-icon v-if="item.isDefault == 0" label="默认地址" size="30" name="checkmark-circle-fill" color="#ccc"></u-icon>
				</view>
				<view>
					<u-icon label="删除" size="30" name="trash-fill" color="#ccc"></u-icon>
				</view>
			</view>
			
		</view>
		<u-button type="error" class="address-btn" @click="insertHandler">新增地址</u-button>
		
		<u-popup v-model="show" mode="bottom" width="100%" height="350px">
			<u-form :model="form">
						<u-form-item label="姓名" prop="name">
							<u-input v-model="form.name" />
						</u-form-item>
						<u-form-item label="电话" prop="phone">
							<u-input v-model="form.phone" />
						</u-form-item>
						<u-form-item label="地址" prop="address">
							<u-input v-model="form.address" />
						</u-form-item>
						<u-form-item label="默认地址" prop="isDefault">
							<u-radio-group v-model="form.isDefault">
								<u-radio name="1" shape="circle">是</u-radio>
								<u-radio name="0" shape="circle">否</u-radio>
							</u-radio-group>
						</u-form-item>
					</u-form>
			<u-button style="position: fixed; bottom: 0; width: 100%;" @click="submit" type="error">确定</u-button>
		</u-popup> 
	</view>
</template>

<script lang="ts" setup>
import { addressInsert, addressList } from '@/network/api';
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

const data = reactive({
	list: []
})
const form = reactive({
	name:"",
	phone: "",
	address: "",
	isDefault: ""
})
onLoad(() => {
	getAddressList()
})

const getAddressList  = () => {
	addressList().then((res: any) => {
		console.log(res);
		data.list = res.rows
	})
}

const show = ref<boolean>(false)
const insertHandler = () => {
	show.value = true
}

const submit = () => {
	console.log(form);
	addressInsert(form).then(res => {
		console.log(res);
		getAddressList()
		show.value = false
	})
}
</script>

<style scoped>
.address-box{
	margin-top: 15rpx;
	padding: 10rpx;
	background-color: #fff;
	
}
.address-box > view{
		padding: 10rpx;
	}
.bottom-box{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.address-btn{
	position: fixed;
	/*下面的属性根据实际需求更改*/
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
