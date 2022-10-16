export interface TokenHeader {
    Authorization: string
}


export interface UseInfo {
    id: number;
    username: string;
	avatar: string;
    address: string;
    privateKey: string;
    publicKey: string;
    createTime: string;
    updateTime: string;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    imageLink: string;
    descLink: string;
    auctionStartTime: string;
    auctionEndTime: string;
    startPrice: number;
    status: string;
    conditions: string;
}

