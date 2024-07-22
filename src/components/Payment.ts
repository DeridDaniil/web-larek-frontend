import { IPayment } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/form";

export interface IPaymentActions {
  onClick: (event: MouseEvent) => void;
}

export class Payment extends Form<IPayment> {
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents, action?: IPaymentActions) {
    super(container, events);

    this._card = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this._cash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

    this._card.classList.add('button_alt-active');

    if (action?.onClick) {
      this._card.addEventListener('click', action.onClick);
      this._cash.addEventListener('click', action.onClick);
    }
  }

  toggleButton(target: HTMLElement) {
    if (target === this._card) {
      this._card.classList.add('button_alt-active');
      this._cash.classList.remove('button_alt-active');
    }
    if (target === this._cash) {
      this._cash.classList.add('button_alt-active');
      this._card.classList.remove('button_alt-active');
    }
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}