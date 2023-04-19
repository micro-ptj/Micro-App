<script setup lang="ts">
import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js' //引入静默更新
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
    //#ifdef APP-PLUS
    // setTimeout(() => {
    // 	getUpdate()
    // }, 4000)
    //#endif  
});
onHide(() => {
  console.log("App Hide");
});

const getUpdate = () => {
		let data = {
			// 版本更新内容 支持<br>自动换行
			describe: '1. 修复已知问题<br>2. 优化用户体验',
			edition_url: 'http://cdn.ut.tj.cn/app/__UNI__D0D08F0.wgt', //apk、wgt包下载地址或者应用市场地址  安卓应用市场 market://details?id=xxxx 苹果store itms-apps://itunes.apple.com/cn/app/xxxxxx
			edition_force: 0, //是否强制更新 0代表否 1代表是
			package_type: 1, //0是整包升级（apk或者appstore或者安卓应用市场） 1是wgt升级
			edition_issue: 1, //是否发行  0否 1是 为了控制上架应用市场审核时不能弹出热更新框
			edition_number: 100, //版本号 最重要的manifest里的版本号 （检查更新主要以服务器返回的edition_number版本号是否大于当前app的版本号来实现是否更新）
			edition_name: '1.0.2', // 版本名称 manifest里的版本名称
			edition_silence: 0, // 是否静默更新 0代表否 1代表是
			flag: true
		}
		// uni.navigateTo({
		// 	url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
		// 		JSON.stringify(data)
		// });

		//res.data.xxx根据后台返回的数据决定（我这里后端返回的是data），所以是res.data.data 
		//判断后台返回版本号是否大于当前应用版本号 && 是否发行 （上架应用市场时一定不能弹出更新提示）
		if (data.flag) {
			//如果是wgt升级，并且是静默更新 （注意！！！ 如果是手动检查新版本，就不用判断静默更新，请直接跳转更新页，不然点击检查新版本后会没反应）
			if (data.package_type == 1 && data.edition_silence == 1) {
				//调用静默更新方法 传入下载地址
				silenceUpdate(data.edition_url)

			} else {
				//跳转更新页面 （注意！！！如果pages.json第一页的代码里有一打开就跳转其他页面的操作，下面这行代码最好写在setTimeout里面设置延时3到5秒再执行）
				uni.navigateTo({
					url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
						JSON.stringify(data)
				});
			}
		} else {

			// 如果是手动检查新版本 需开启以下注释
			uni.showModal({
			    title: '提示',
			    content: '已是最新版本',
			    showCancel: false
			}) 
		}
	}
</script>
<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
	@import "@/common/globalClass.css"
</style>
