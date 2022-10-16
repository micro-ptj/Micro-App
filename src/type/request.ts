export interface LoginParam {
    username: string;
    password: string;
}

export interface RegisterParam {
    username: string;
    password: string;
	avatar: string;
}

export interface BidParam {
	amount: string;
	productId: string;
	secret: string;
	weiValue: number;
}

export interface ProductParam {
	name: string;
	imageLink: string;
	category: string;
	descLink: string;
	startPrice: number;
	auctionEndTime: string;
	auctionStartTime: string;
	conditions: string;
}