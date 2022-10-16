import {request} from '@/network/http'
import { BidParam, ProductParam } from "@/type/request";


// uni.getStorage({
// 	key: 'token',
// 	success: function (res: any) {
// 		uni.getStorageSync('token') = res.data.tokenHead + " " + res.data.token;
// 	}
// });



export const logout = () => {
	return request({
		url: "logout",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getUserInfo = () => {
	return request({
		url: "admin/userInfo",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getBalance = () => {
	return request({
		url: "admin/getBalance",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const addProduct = (product: ProductParam) => {
	return request({
		url: "contract/addProduct",
		method: "POST",
		data: product,
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const bid = (bids: BidParam) => {
	return request({
		url: "contract/bid",
		method: "POST",
		data: bids,
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		}
	})
}


export const getProduct = () => {
	return request({
		url: "product/getProduct",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const totalBids = (id:number) => {
	return request({
		url: "contract/totalBids/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getProductById = (id:string) => {
	return request({
		url: "contract/getProduct/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}