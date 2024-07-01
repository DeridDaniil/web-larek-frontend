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

Класс Product отвечает за хранение и логику работы с данными товара. Конструктор принимает брокер событий.
Свойства класса хранят данные:
- _id - уникальный номер товара.
- title - наименование товара.
- category - категория товара.
- image - изображение товара.
- price - цена товара.
- description - описание товара.

Класс Page реализует отображение массива товаров и корзину с количеством товара.
Свойство класса:
  counter - счетчик товаров в корзине.
  catalog - массив товаров.

Класс Modal реализует модальные окна.
Свойства класса:
  modal - элемент модального окна
  events - брокер событий
  Методы класса:
  openModal() - открывает модальное окно.
  closeModal() - закрывает модальное окно.

Класс BusketForm реализует модальное окно с формой, которая содержит выбранные товары. При отправке формы запускается событие проверки данных.
Свойства класса:
  наследует свойства класса Modal.
  submitButton - кнопка отправки формы.
  _form - элемент формы.
  formName - значение атрибута name формы.
  productList - список выбранных товаров.
  totalPrice - общая цена товаров для оплаты.
Методы класса:
  наследует методы класса Modal.
  deleteProduct() - удаление товара из списка корзины.

Класс PaymentForm реализует модальное окно с формой, которая содержит выбор способа оплаты и поле ввода адреса доставки. При отправке формы запускается событие проверки данных. 
Свойства класса:
  наследует свойства класса Modal.
  submitButton - кнопка отправки формы.
  _form - элемент формы.
  formName - значение атрибута name формы.
  paymentButton - кнопка выбора способа оплаты.
  inputs - все поля ввода формы.
  errors - объект, который хранит в себе ошибки валидации для инпутов.
Методы класса:
  наследует методы класса Modal.
  setError() - принимает объект с данными об ошибках.
  showInputError() - отоброжает полученные ошибки.
  hideInputError() - скрывает ошибки.
  clearModal() - очищает поля ввода.

Класс ContactForm реализует модальное окно с формой, которая содержит поля ввода электронного адреса и номера телефона. При отправке формы запускается событие проверки данных и переходит на модальное окно с уведомлением об успешном оформлении заказа.
Свойства класса:
  наследует свойства класса Modal.
  submitButton - кнопка отправки формы.
  _form - элемент формы.
  formName - значение атрибута name формы.
  inputs - все поля ввода формы.
  errors - объект, который хранит в себе ошибки валидации для инпутов.
Методы класса:
  наследует методы класса Modal.
  setError() - принимает объект с данными об ошибках.
  showInputError() - отоброжает полученные ошибки.
  hideInputError() - скрывает ошибки.
  clearModal() - очищает поля ввода.

Класс OrderModal реализует модальное окно с формой, содержащей сообщение об успешном оформлении заказа, в которое передается полная стоимость корзины.
Свойства класса:
  наследует свойства класса Modal.
Методы класса:
  наследует методы класса Modal.

Взаимодействие между компонентами происходит за счет событий, генерируемых при помощи брокера событий и их обработчиков.
Список событий:
  products:changed - изменение массива товаров.
  products:selected - при клике на товар, открывается модальное окно с товаром. Дает возможность добавить товар в корзину.
  busket:open - открывает модальное окно корзины.
  busket:toggleItem - добавление товара в корзину.
  busket:deleteItem - удаление товара из корзины.
  busket:order - оформление заказа в корзине.
  payment:change - выбор способа оплаты.
  address:input - ввод адреса доставки.
  order:validation - событие, для валидации формы данных об оплате и адреса доставке.
  order:submit - подтверждение данных об оплате и адреса доставке.
  email:input - ввод электронной почты.
  phone:input - ввод номера телефона.
  contact:validation - событие, для валидации формы данных электронной почты и номера телефона.
  contact:submit - подтверждение данных электронной почты и номера телефона.
  order:complete - открытие окна успешной оплаты.
