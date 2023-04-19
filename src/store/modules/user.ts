import {defineStore} from "pinia";
import {StateType} from "@/store/type";
import {getBalance, getUserInfo} from "@/network/api";
import type {UseInfo} from "@/type/response";

export const useUserStore = defineStore({
    id: StateType.USER,
    state: () => ({
        user: <UseInfo>{},
		money: ''
    }),
    getters: {
        getUserInfo(): UseInfo {
            return this.user;
        },
		getMoney(): string {
			return this.money
		}
    },
    actions: {
        async setUserInfo() {
            const userInfo:any = await getUserInfo()
            this.user = userInfo.data
        },
		async setBalance() {
			const userBalance:any = await getBalance()
			console.log(userBalance);
			this.money = userBalance.data
		}
    }
})