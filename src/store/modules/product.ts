import {defineStore} from "pinia";
import {StateType} from "@/store/type";
import {getProduct} from "@/network/api";
import type {Product} from "@/type/response";

export const useProductStore = defineStore({
    id: StateType.PRODUCT,
    state: () => ({
        product: <Product[]>[]
    }),
    getters: {
        getProductList(): Product[] {
            return this.product;
        }
    },
    actions: {
        async setProductList() {
            const productInfo:any = await getProduct()
            this.product = productInfo.data
        }
    }
})