
export interface IOrder {
  id: number,
  orderDate: Date,
  firstName: string,
  lastName: string,
  phone: string,
  city: string,
  addressLine: string,
  customerId: string,
  orderStatus: number,
  orderItems: IOrderItem[],
  subTotal: number,
  deliveryFree: number,
}

export interface IOrderItem {
  id: number,
  productId: number,
  productName: string,
  productImage: string,
  price: number,
  quantity: number,
}
