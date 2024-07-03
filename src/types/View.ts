import { IProduct } from "./Data";
import { IComponent } from "./Base";

// Интерфейс класса Page
export interface IPage {
  _catalog: HTMLElement;
  _counter: HTMLElement;
  _basket: HTMLElement;

  setCounter(value: number): void;
  setCatalog(items: IProduct[]): void;
}

// Интерфейс класса Modal
export interface IModal extends IComponent {
  _closeButton: HTMLElement;
  _content: HTMLElement;

  setContent(content: HTMLElement): void;
  openModal(): void;
  closeModal(): void;
}

// Интерфейс класса Basket
export interface IBasket {
  _itemsList: HTMLElement;
  _totalPrice: HTMLElement;
  _button: HTMLElement;

  setItemsList(items: HTMLElement[]): void;
  setTotalPrice(total: number): void;
}

// Интерфейс класса Form
export interface IForm {
  _submit: HTMLElement;
  _error: HTMLElement;

  setSubmit(isEnabled: boolean): void;
  setError(errorMessage: string): void;
  render(): void;
}

// Интерфейс класса PaymentForm
export interface IPaymentForm extends IForm {
  _online: HTMLElement;
  _cash: HTMLElement;

  setPayment(method: 'online' | 'cash'): void;
  setAddress(address: string): void;
}

// Интерфейс класса ContactForm
export interface IContactForm extends IForm {
  setPhone(phoneNumber: string): void;
  setEmail(email: string): void;
}

// Интерфейс класса PaymentSuccess
export interface IPaymentSuccess {
  _totalPrice: HTMLElement;

  setTotalPrice(total: number): void;
}