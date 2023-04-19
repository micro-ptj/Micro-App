export interface TokenHeader {
    Authorization: string
}


export interface UseInfo {
	userId: number;
	username: string;
	phone: number;
	name: string;
	sex: number;
	avatar: string;
	address: string;
	balance: number;
}


export interface Product {
    id: number;
    name: string;
    category: string;
    imageLink: string;
    description: string;
    auctionStartTime: string;
    auctionEndTime: string;
    startPrice: number;
    status: string;
    conditions: string;
}

export interface Order {
	id: number;
	name: string;
	image: string;
	category: number;
	amount: string;
	orderTime: string;
	status: number;
	trackingNum: string;
}

export interface Bid {
	id: number;
	name: string;
	image: string;
	category: number;
	amount: string;
	bidTime: string;
	status: number;
}
