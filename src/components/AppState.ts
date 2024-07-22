import { FormErrors, IProduct, IPayment, IContact, IOrder } from "../types";
import { EventEmitter, IEvents } from "./base/events";
import { Model } from "./base/model";

export interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  payment: IPayment | null;
  contact: IContact | null;
  order: IOrder | null;
  preview: string | null;
  events: EventEmitter;
}

export type TCatalogChangeEvent = {
  catalog: IProduct[];
}

export class AppState extends Model<IAppState> {
  catalog: IProduct[];
  basket: IProduct[] = [];
  order: IOrder = {
    payment: '',
    address: '',
    email: '',
    phone: '',
    items: [],
    total: 0
  };
  preview: string | null;
  events: IEvents;
  formErrors: FormErrors = {};

  setCatalog(items: IProduct[]) {
    this.catalog = items;
    this.emitChanges('product:change', { catalog: this.catalog });
  }

  setPreview(item: IProduct) {
    this.preview = item.id;
    this.emitChanges('preview:change', item);
  }

  addBasketProduct(item: IProduct) {
    if (this.basket.indexOf(item) < 0) {
      this.basket.push(item);
      this.updateBasket();
    }
  }

  removeBasketProduct(item: IProduct) {
    this.basket = this.basket.filter((i) => i != item);
    this.updateBasket();
  }

  clearBasket() {
    this.basket = [];
    this.updateBasket();
  }

  updateBasket() {
    this.emitChanges('basket:change', this.basket);
    this.emitChanges('counter:change', this.basket);
  }

  setPayment(field: keyof IPayment, value: string) {
    this.order[field] = value;

    if (this.PaymentValidate()) {
      this.events.emit('order:validation', this.order);
    }
  }

  setContact(field: keyof IContact, value: string) {
    this.order[field] = value;

    if (this.ContactValidate()) {
      this.events.emit('contacts:validation', this.order);
    }
  }

  clearOrder() {
    this.order = {
      payment: '',
      address: '',
      email: '',
      phone: '',
      items: [],
      total: 0
    };
  }

  PaymentValidate() {
    const errors: typeof this.formErrors = {};

    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }

    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес доставки';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  ContactValidate() {
    const errors: typeof this.formErrors = {};

    if (!this.order.email) {
      errors.email = 'Необходимо указать адрес электронной почты';
    }

    if (!this.order.phone) {
      errors.phone = 'Необходимо указать номер телефона';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}