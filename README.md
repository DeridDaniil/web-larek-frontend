# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

Данные проекта.

``` typescript
// Интерфейс индивидуальных данных товара
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

//Форма способа оплаты и адреса
export interface IFormPayment {
  address: string;
  payment: string;
}

//Форма контактных данных пользователя
export interface IFormContact {
  email: string;
  phone: string;
}

//Проверка валидации формы оплаты и адреса
export interface IFormPaymentValidate {
  checkValidation(data: Record<keyof IFormPayment, string>): boolean;
}

//Проверка валидации формы контактных данных
export interface IFormContactValidate {
  checkValidation(data: Record<keyof IFormContact, string>): boolean;
}

//Информация о заказе
export interface IFormOrder {
  items: string[];
  total: number;
}

// Интерфейс класса Component
export interface IComponent {
  setText(selector: string, text: string): void;
  setImage(selector: string, src: string): void;
  setClass(selector: string, className: string): void;
  render(): void;
}

// Интерфейс класса AppState
export interface IAppState {
  catalog: IProduct[];
  basket: TProductBasket[];
  formErrors: Record<keyof IFormPayment | keyof IFormContact, string>;
  order: IFormOrder;

  setCatalog(catalog: IProduct[]): void;
  setPreview(product: IProduct): void;
  checkBasket(productId: string): boolean;
  addItemToBasket(item: TProductBasket): void;
  checkValidation(form: IFormPayment | IFormContact): boolean;
  removeItemFromBasket(itemId: string): void;
  clearBasket(): void;
}

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
```

Описание проекта.

Класс Api ('/src/components/base/api.ts') - содержит в себе базовую логику отправки запросов.  
Методы класса:
- Метод get() - возвращает промис с объектом, которым ответил сервер.
- Метод post() - принимает объект с данными и отпровляет эти данных на сервер в формате JSON.

Класс EventEmitter ('./src/components/base/events.ts/') - брокер событий, классическая реализация, предоставляет подписываться на события и отправлять события.  
Методы класса:
- Метод on() - устанавливает обработчик события.
- Метод off() - снимает обработчик события.
- Метод emit() - инициализирует событие с данными.
- Метод onAll() - слушает все события.
- Метод ofAll() - сбрасывает все обработчики.
- Метод trigger() - делает коллбек триггер, генерирующий событие при вызове.

Класс Component абстрактный класс, реализован для управления разметкой и создания компонентов пользовательского интерфейса.  
Методы класса:
- setText() - изменение текста.
- setImage() - изменение изображения.
- setClass() - изменение стилей.
- render() - рендер разметки.

Класс Product отвечает за хранение и логику работы с данными товара. Конструктор принимает брокер событий.  
Свойства класса хранят данные:
- _id - уникальный номер товара.
- title - наименование товара.
- category - категория товара.
- image - изображение товара.
- price - цена товара.
- description - описание товара.

Класс AppState предназначен для работы с данными.  
Свойства класса: 
- catalog - каталог товаров.
- basket - корзина.
- formErrors - ошибки ввода формы.
- order - информация о заказе.
  
Методы класса:
- setCatalog() - получение списка товаров из сервера.
- setPreview() - открытие товара в модальном окне.
- checkBasket() - проверка наличия товара в корзине.
- addItemToBasket() - добавляет товар в корзину.
- checkValidation() - проверяет валидность в форме.
- removeItemFromBasket() - удаляет товар из корзины.
- clearBaske()t - очищает корзину.

Класс Page предназначен для управления основными элементами интерфейса страницы.  
Свойства класса:
- catalog - каталог товаров.
- counter - счетчик количества добавленных товаров в корзину.
- basket - корзина
  
Методы класса: 
- setCounter() - устанавливает значение счетчика.
- setCatalog() - обновляет каталог.

Класс Modal предназначен для реализации модальных окон.  
Свойства класса:
- наследует свойства класса Component
- closeButton - кнопка закрытия модального окна.
- content - контент, отображаемый внутри модального окна
  
Методы класса:
- наследует свойства класса Component
- setContent() - заполнение контента модального окна.
- openModal() - открытие модального окна.
- closeModal() - закрытие модального окна.

Класс Basket предназначен для управления функциональностью корзины.  
Свойства класса: 
- itemList - список добавленных товаров в корзину.
- totalPrice - общая стоимость корзины.
- orderButton - кнопка оформления заказа.
  
Методы класса:
- setItemsList() - обновляет список добавленных в корзину товаров.
- setTotalPrice() - обновляет общую стоимость корзины.

Класс Form предназначен для управления формой.  
Свойства класса:
- submitButton - кнопка отправки формы.
- error - сообщение об ошибке.
  
Методы класса: 
- setSubmit() - включает или выключает кнопку подтверждения формы.
- setError() - отображает ошибки валидации.
- render() - отрисовывает форму.

Класс PaymentForm предназначен для управления формы способа оплаты и адреса доставки.  
Свойства класса:
- наследует свойства класса Form
- online - кнопка оплаты онлайн.
- cash - кнопка оплаты при получении.
  
Методы класса:
- setPayment() - переключение кнопок способов оплаты.
- setAddress() - устанавливает адрес доставки.

Класс ContactForm предназначен для управления формы с номером телефона и электронной почтой.  
Свойства класса:
- наследует свойства класса Form
  
Методы класса: 
- setPhone() - устанавливает номер телефона.
- setEmail() - устанавливает адрес электронной почты.

Класс PaymentSuccess предназначен для показа модального окна с сообщение об удачном совершении операции оплаты.  
Свойства класса:
- totalPrice - общая стоимость корзины.
  
Методы класса: 
- setTotalPrice() - обновляет общую стоимость корзины.

Список событий:
- product:change - изменение массива товаров.
- basket:open - открытие модального окна корзины.
- basket:change - изменение товаров в корзине.
- basket:close - закрытие модального окна корзины.
- preview:change - изменение модального окна превью товаров.
- modal:open - открытие модального окна.
- modal:close - закрытие модального окна.
- product:add - добавление товара в корзины.
- product:delete - удаление товара из корзины.
- order:submit - сохранение данных о способе оплаты и адреса доставки.
- contacts:submit - событие отправки товара на оплату.
- order: complete - при открытии модального окна успешной оплаты.
- order:validation - валидация формы с вводом адреса доставки и способе оплаты.
- contacts:validation - валидация формы с номером телефона и алресом электронной почты.