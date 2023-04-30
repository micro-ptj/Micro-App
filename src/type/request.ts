export interface LoginParam {
    phone: string;
    password: string;
	code: string;
}

export interface RegisterParam {
    username: string;
    password: string;
	avatar: string;
}

export interface BidParam {
	amount: string;
	goodsId: string;
}

export interface IdentityParam {
	name: string;
	idCard: string;
	phone: string;
}

export interface QueryParams {
	pageNum: number,
	pageSize: number
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

export interface TransactionParam {
	sourceId: string;
	sourceType: string;
}
