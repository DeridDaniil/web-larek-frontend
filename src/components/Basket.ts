import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { EventEmitter } from "./base/events";

interface IBasket {
  list: string[];
  price: number | null;
}

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._price = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('payment:open');
      });
    }

    this.list = [];
    this._button.disabled = true;
  }

  set list(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста',
      }))
    }
  }

  set selected(isDisabled: boolean) {
    this._button.disabled = isDisabled;
  }

  set price(total: number) {
    this.setText(this._price, `${total}` + ' синапсов');
  }
}