import './scss/styles.scss';
import { ProductApi } from './components/ProductApi';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { Modal } from './components/common/modal';
import { TCatalogChangeEvent, AppState } from './components/AppState';
import { Contact } from './components/Contact';
import { Payment } from './components/Payment';
import { Page } from './components/Page';
import { Success } from './components/Success';
import { IProduct, IPayment, IContact, IOrder } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new ProductApi(CDN_URL, API_URL);

// Все шаблоны
const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketProductTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderContact = new Contact(cloneTemplate(contactTemplate), events);
const orderPayment = new Payment(cloneTemplate(paymentTemplate), events, {
  onClick: (event: Event) => events.emit('payment:toggle', event.target)
});

// Получения каталога
api.getCatalog()
    .then(appData.setCatalog.bind(appData))
    .catch((err) => {
      console.log(err);
    });

// Рендер каталога на страницу.
events.on<TCatalogChangeEvent>('product:change', () => {
  page.catalog = appData.catalog.map((item) => {
    const card = new Card(cloneTemplate(catalogTemplate), {
      onClick: () => events.emit('preview:select', item),
    });
    return card.render({
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });
});

// Добавляем взаимодействие с карточкой товара.
events.on('preview:select', (item: IProduct) => {
  appData.setPreview(item);
})

// Открытие модального окна карточки товара.
events.on('preview:change', (item: IProduct) => {
  const card = new Card(cloneTemplate(previewTemplate), {
    onClick: () => {
      events.emit('product:toggle', item);
      card.buttonText = appData.basket.indexOf(item) < 0 ? 'Купить' : 'Удалить из корзины';
    },
  });
  modal.render({
    content: card.render({
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      category: item.category,
      buttonText: appData.basket.indexOf(item) < 0 ? 'Купить' : 'Удалить из корзины'
    }),
  });
})

// Отслеживание кнопки добавления/удаления товара.
events.on('product:toggle', (item: IProduct) => {
  if (appData.basket.indexOf(item) < 0) {
    events.emit('card:add', item);
  } else {
    events.emit('card:delete', item);
  };
})

// Добавления товара в корзину.
events.on('card:add', (item: IProduct) => {
  appData.addBasketProduct(item);
})

// Удаления товара из корзины.
events.on('card:delete', (item: IProduct) => {
  appData.removeBasketProduct(item);
})

// Отслеживания товара в корзине, общей стоимости и активности кнопки.
events.on('basket:change', (items: IProduct[]) => {
  basket.list = items.map((item, index) => {
    const card = new Card(cloneTemplate(basketProductTemplate), {
      onClick: () => {
        events.emit('card:delete', item);
      },
    });
    return card.render({
      index: (index + 1).toString(),
      title: item.title,
      price: item.price,
    });
  });
  const total = items.reduce((total, item) => total + item.price, 0);
  basket.price = total;
  appData.order.total = total;
  basket.selected = total === 0;
})

// Изменение счетчика корзины
events.on('counter:change', () => {
  page.counter = appData.basket.length;
})

// Открытие модального окна корзины.
events.on('basket:open', () => {
  modal.render({
    content: basket.render({})
  })
})

// Открытие модального окна с данными об оплате.
events.on('payment:open', () => {
  modal.render({
    content: orderPayment.render({
      payment: '',
      address: '',
      valid: false,
      errors: [],
    })
  });
  appData.order.items = appData.basket.map((item) => item.id);
})

// Отслеживание изменений в форме с данными об оплате.
events.on('payment:toggle', (target: HTMLElement) => {
  if (!target.classList.contains('.button_alt-active')) {
    orderPayment.toggleButton(target);
    appData.order.payment = target.getAttribute('name');
    console.log(appData.order);
  }
})

// Отслеживание ошибок формы
events.on('formErrors:change', (errors: Partial<IOrder>) => {
  const { payment, address, email, phone } = errors;
  orderPayment.valid = !payment && !address;
  orderContact.valid = !email && !phone;
  orderPayment.errors = Object.values({ payment, address }).filter((i) => !!i).join(', ');
  orderContact.errors = Object.values({ phone, email }).filter((i) => !!i).join(', ');
})

// Ослеживание ошибок формы данных об оплате
events.on(/^order\..*:change/, (data: { field: keyof IPayment; value: string }) => {
  appData.setPayment(data.field, data.value);
})

// Отслеживание ошибок данных пользователя
events.on(/^contacts\..*:change/, (data: { field: keyof IContact; value: string }) => {
  appData.setContact(data.field, data.value);
})

// Валидация формы данных об оплате
events.on('order:validation', () => {
  orderPayment.valid = true;
})

// Валидация формы данных пользователя
events.on('contacts:validation', () => {
  orderContact.valid = true;
})

// Открытие модального окна с данными пользователя
events.on('order:submit', () => {
  modal.render({
    content: orderContact.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    }),
  });
})

// Открытие модального окна с уведомлением об успешной оплате.
events.on('contacts:submit', () => {
  api.postOrder(appData.order)
      .then((result) => {
        appData.clearBasket();
        appData.clearOrder();

        const success = new Success(cloneTemplate(successTemplate), {
          onClick: () => {
            modal.close();
          },
        });
        success.totalPrice = result.total.toString();
        modal.render({
          content: success.render({})
        });
      })
      .catch((err) => {
        console.error(err);
      })
});

// Блокировка прокрутки страницы, при открытии модального окна
events.on('modal:open', () => {
  page.isLocked = true;
})

// Отмена блокировки
events.on('modal:close', () => {
  page.isLocked = false;
})