// Интерфейс данных товара
export interface IProduct {
  _id: number,
  title: string,
  category: string,
  image: string,
  price: number | null,
  description: string
}

// Тип данных товара в корзине
export type TProductBasket = Pick<IProduct,  'title' | 'price'>;

// Интерфейс списка товаров
export interface IProductList {
  product: IProduct[],
  getProduct(_id: number): IProduct[];
}

//Интерфейс формы способа оплаты и адреса
export interface IFormPayment {
  payment: string;
  address: string;
}

//Интерфейс формы контактных данных пользователя
export interface IFormContact {
  email: string;
  phone: string;
}

//Интерфейс проверки валидации формы оплаты и адреса
export interface IFormPaymentValidate {
  checkValidation(data: Record<keyof IFormPayment, string>): boolean;
}

//Интерфейс проверки валидации формы контактных данных
export interface IFormContactValidate {
  checkValidation(data: Record<keyof IFormContact, string>): boolean;
}

//Интерфейс информации о заказе
export interface IFormOrder {
  items: string[];
  total: number;
}