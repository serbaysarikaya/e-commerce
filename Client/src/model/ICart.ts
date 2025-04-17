export interface ICartItem {
    productId:number,
    name:string,
    price:number, 
    quantity:number,
    imageUrl:string
}

export interface ICart {
    cartId: number,
    customerId: number,
    cartItems:ICartItem[];
}

