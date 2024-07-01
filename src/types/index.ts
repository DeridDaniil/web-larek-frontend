import { IEvents } from "../components/base/events"

// Интерфейс индивидуальных данных товара
export interface IProduct {
  _id: number,
  title: string,
  category: string,
  image: string,
  price: number | null,
  description: string
}

// Интерфейс списка товаров
export interface IProductList {
  product: IProduct[],
  getProduct(_id: number): IProduct[];
}

// Интерфейс главной страницы веб-приложения
export interface IPage {
  counter: number,
  catalog: HTMLElement[]
}

// Интрефейс базовых методов модального окна
export interface IModal {
  modal: HTMLElement,
  events: IEvents,
  openModal(modal: HTMLElement):void
  closeModal(modal: HTMLElement):void
}

// Интейрфейс модального окна корзины
export interface IBusketForm extends IModal{
  submitButton: HTMLButtonElement,
  _form: HTMLFormElement,
  formName: string,
  productList: HTMLElement[],
  totalPrice: number | null
}

// Интерфейс формы с выбором оплаты и адреса
export interface IPaymentForm extends IModal {
  submitButton: HTMLButtonElement,
  _form: HTMLFormElement,
  formName: string,
  paymentbutton: HTMLButtonElement,
  inputs: HTMLInputElement,
  errors: Record<string, HTMLElement>
  setError(data: {field: string, value: string, validInformation: string}): void,
  showInputError(fiel: string, errorMessage: string):void, 
  hideInputError(fiel: string):void, 
  clearModal(modal: HTMLElement):void
}

// Интрейфейс формы почты и телефона
export interface IContactForm extends IModal {
  submitButton: HTMLButtonElement,
  _form: HTMLFormElement,
  formName: string,
  inputs: HTMLInputElement,
  errors: Record<string, HTMLElement>
  setError(data: {field: string, value: string, validInformation: string}): void,
  showInputError(fiel: string, errorMessage: string):void, 
  hideInputError(fiel: string):void, 
  clearModal(modal: HTMLElement):void
}