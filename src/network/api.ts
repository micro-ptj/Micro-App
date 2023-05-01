import {request} from '@/network/http'
import { BidParam, ProductParam, IdentityParam, TransactionParam } from "@/type/request";


export const logout = () => {
	return request({
		url: "/app/logout",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const verify = () => {
	return request({
		url: "/app/verify",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getUserInfo = () => {
	return request({
		url: "/app/userInfo",
		method: "GET",
		header: {
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getBalance = () => {
	return request({
		url: "/geth/balance",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const addProduct = (product: ProductParam) => {
	return request({
		url: "/contract/addProduct",
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
		url: "/app/bid/bids",
		method: "POST",
		data: bids,
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const revealBids = (bids: BidParam) => {
	return request({
		url: "/contract/revealBid",
		method: "POST",
		data: bids,
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		}
	})
}


export const getProduct = (query:any) => {
	return request({
		url: "/app/goods/list",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}


export const gethVersion = () => {
	return request({
		url: "/geth/gethVersion",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const totalBids = (id:number) => {
	return request({
		url: "/contract/totalBids/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const getProductById = (id:string) => {
	return request({
		url: "/app/goods/byId/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const receipt = (query:any) => {
	return request({
		url: "/geth/receipt",
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

/*---------------------------------bid---------------------------------*/
export const getBid = (query:any) => {
	return request({
		url: "/app/bid/list",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

/*---------------------------------order---------------------------------*/
export const getOrder = (query:any) => {
	return request({
		url: "/app/order/list",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

export const getPickup = (query:any) => {
	return request({
		url: "/app/order/pickup",
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

/*---------------------------------dict---------------------------------*/
export function getDicts(dictType: string) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'GET',
	header: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': uni.getStorageSync('token')
	},
  })
}

/*---------------------------------code---------------------------------*/
export function identityVerify(query: IdentityParam) {
	return request({
		url: '/app/identityVerify',
		method: 'POST',
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

/*---------------------------------code---------------------------------*/
export function transaction(query: TransactionParam) {
	return request({
		url: '/app/transaction/info',
		method: 'POST',
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		},
		data: query
	})
}

/*---------------------------------bidInfo---------------------------------*/
export const bidInfo = (id:string) => {
	return request({
		url: "/app/bid/info/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

/*---------------------------------orderInfo---------------------------------*/
export const orderInfo = (id:string) => {
	return request({
		url: "/app/order/info/" + id,
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

/*---------------------------------address---------------------------------*/
export const addressList = () => {
	return request({
		url: "/app/address/list",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const addressDefault = () => {
	return request({
		url: "/app/address/default",
		method: "GET",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token')
		}
	})
}

export const addressInsert = (data: any) => {
	return request({
		url: "/app/address/insert",
		method: "POST",
		header: {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token')
		},
		data: data
	})
}