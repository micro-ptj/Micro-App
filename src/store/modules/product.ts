import {defineStore} from "pinia";
import {StateType} from "@/store/type";
import {getProduct} from "@/network/api";
import type {Product} from "@/type/response";
import { QueryParams } from "@/type/request";

export const useProductStore = defineStore({
    id: StateType.PRODUCT,
    state: () => ({
        product: <Product[]>[],
		queryParam: <QueryParams>{}
    }),
    getters: {
        getProductList(): Product[] {
            return this.product;
        }
    },
    actions: {
        async setProductList() {
            const productInfo:any = await getProduct(this.queryParam)
			console.log(productInfo);
            this.product = productInfo.rows
        },
		async changeVal() {
		    this.queryParam.pageNum = 1;
			this.queryParam.pageSize = 10;
		}
    }
})