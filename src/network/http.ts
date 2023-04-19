import { config } from "@/config"


export const request = (prams: UniApp.RequestOptions) => { 
	
	//prams是调用的接口API的参数
	return new Promise((resolve, reject) => {
		
		let url = config.base_url + prams.url; //请求的网络地址和局地的api地址组合
		uni.request({
			url: url,
			data: prams.data,
			method: prams.method,
			header: prams.header,
			success: (res:any) => {
				if(res.data.code == 401){
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
			}
		});
	})
}