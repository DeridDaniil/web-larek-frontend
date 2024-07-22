import { IContact } from "../types";
import { EventEmitter } from "./base/events";
import { Form } from "./common/form";

export class Contact extends Form<IContact> {
  constructor(container: HTMLFormElement, events: EventEmitter) {
    super(container, events);
  }

  set email(value: string) {
    const email = this.container.elements.namedItem('email') as HTMLInputElement;
    if (email) {
      email.value = value;
    }
  }

  set phone(value: string) {
    const phone = this.container.elements.namedItem('phone') as HTMLInputElement;
    if (phone) {
      phone.value = value;
    }
  }
}