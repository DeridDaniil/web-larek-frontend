export interface IProduct {
  id: string,
  category: string,
  title: string,
  image: string,
  price: number | null;
  description: string,
  buttonText: string;
  index: string;
}

export type TBasketProduct = Pick<IProduct, 'title' | 'price'>;

export interface IPayment {
  address: string;
  payment: string;
}

export interface IContact {
  email: string;
  phone: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrder extends IPayment, IContact {
  items: string[],
  total: number;
}

export interface IOrderResult {
  id: string,
  items: string[],
  total: number;
}