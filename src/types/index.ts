// Интерфейс индивидуальных данных товара
export interface IProduct {
  _id: number,
  title: string,
  category: string,
  image: string,
  price: number,
  description: string,
}

// Интерфейс списка товаров
export interface IProductList {
  product: IProduct[],
  getProduct(_id: number): IProduct[];
}

// Интрефейс базовых методов модального окна
export interface IModal { 
  openModal(): void,
  closeModal(): void
}

// Интерфейс модального окна товара
export interface IModalProduct extends IModal {
  product: IProduct[],
  orderProduct(_id: number): IProduct[],
}

// Интерфейс формы с выбором оплаты и адреса
export interface IPaymentForm extends IModal{
  payment: string,
  address: string
}

// Интрейфейс формы почты и телефона
export interface IInputsForm extends IModal {
  email: string
  phoneNumber: number,
}

// Интейрфейс модального окна корзины
export interface IBusketModal extends IModal{
  productList: IProductList[],
  totalPrice: number | null,
  deleteProduct(_id: number): IProduct[];
  orderProducts(): void,
}