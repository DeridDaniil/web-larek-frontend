import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export const CategoryClasses: { [key: string]: string} = {
  'софт-скил': 'card__category_soft',
  'другое': 'card__category_other',
  'дополнительное': 'card__category_additional',
  'кнопка': 'card__category_button',
  'хард-скил': 'card__category_hard'
};

export class Card<T> extends Component<IProduct> {
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _description: HTMLElement;
  protected _buttonText: string;
  protected _index: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._image = container.querySelector('.card__image');
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._description = container.querySelector('.card__text');
    this._index = container.querySelector('.basket__item-index');
    this._button = container.querySelector('.card__button');

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  
  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title() {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set price(value: number | null) {
    if (value === null) {
      this.setText(this._price, 'Бесценно');
      this.setDisabled(this._button, true);
    } else {
      this.setText(this._price, `${value} синапсов`);
    }
  }
  
  set description(value: string) {
    this.setText(this._description, value);
  }

  set index(value: string) {
    this._index.textContent = value;
  }

  get index(): string {
    return this._index.textContent || '';
  }

  set category(value: string) {
    this.setText(this._category, value);
    this._category.classList.remove('card__category_other');
    this._category.classList.add(CategoryClasses[value]);
  }

  get category(): string {
    return this._category.textContent || '';
  }

  set buttonText(value: string) {
    if (this._button) {
      this._button.textContent = value;
    }
  }

  buttonDisabled(state: boolean) {
    if (this._button) {
      if (state) {
        this._button.setAttribute('disabled', 'disabled');
      } else {
        this._button.removeAttribute('disabled');
      }
    }
  }
}