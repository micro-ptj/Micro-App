<template>
	<view>
		<u-cell-group>
			<u-cell-item title="姓名" :arrow="false" :value="user.name != null && user.name != '' ? user.name : '未知'"></u-cell-item>
			<u-cell-item title="电话号码" :arrow="false" value="15391493308"></u-cell-item>
			<u-cell-item title="性别" :arrow="false" :value="user.sex == 2 ? '未知' : user.sex == 0 ? '男' : '女'"></u-cell-item>
			<u-cell-item title="用户名" :arrow="false" :value="user.username"></u-cell-item>
			<u-cell-item title="版本号" :arrow="false" :value="version"></u-cell-item>
<!--			<u-cell-item title="修改密码"></u-cell-item>-->
			<u-cell-item title="检查更新"></u-cell-item>
		</u-cell-group>
		<view class="btn-box">
			<u-button type="primary" shape="square" @click="toLogout">退出登录</u-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { config } from '@/config';
import { gethVersion, logout } from '@/network/api';
import { onMounted, ref, computed } from 'vue';
import { useUserStore } from "@/store/modules/user";
import { onLoad } from '@dcloudio/uni-app';
const useUserState = useUserStore()
const user = computed(() => useUserState.getUserInfo)


onLoad(async () => {
	// await useUserState.setBalance()
	await useUserState.setUserInfo()
})

	const version = ref(config.version)
	const toLogout = () => {
		logout().then(res => {
			console.log(res);
			uni.removeStorageSync('token');
			uni.redirectTo({
				url: '/pages/login/login'
			});
		})
	}
	onMounted(() => {
		getGethVersions()
	})
	const getGethVersions = () => {
		gethVersion().then((res: any) => {
			console.log(res);
		})
	}
</script>

<style scope>
.btn-box{
	margin-top: 10rpx;
}
</style>
