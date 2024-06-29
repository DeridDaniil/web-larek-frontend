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


// Интерфейс индивидуальных данных товара
export interface IProduct {
  _id: number, - id товара
  title: string, - заголовок товара
  category: string, - категория товара
  image: string, - изображение товара
  price: number, - цена товара
  description: string, - описание товара
}

// Интерфейс списка товаров
export interface IProductList {
  product: IProduct[], - данные товара
  getProduct(_id: number): IProduct[]; - метод получение всех товаров
}

// Интрефейс базовых методов модального окна
export interface IModal { 
  openModal(): void, - метод открытие модального окна
  closeModal(): void - метод закрытие модального окна
}

// Интерфейс модального окна товара
export interface IModalProduct extends IModal {
  product: IProduct[], - данные товара
  orderProduct(_id: number): IProduct[], - метод добавление товара в корзину
}

// Интерфейс формы с выбором оплаты и адреса
export interface IPaymentForm extends IModal{
  payment: string, - выбор оплаты пользователем
  address: string - адрес доставки пользвателя
}

// Интрейфейс формы почты и телефона
export interface IInputsForm extends IModal {
  email: string - электронный адрес пользователя
  phoneNumber: number, - номер телефона пользователя
}

// Интейрфейс модального окна корзины
export interface IBusketModal extends IModal{
  productList: IProductList[], - получение списка товаров
  totalPrice: number | null, - общая цена товаров
  deleteProduct(_id: number): IProduct[]; - метод удаления товара из корзины
  orderProducts(): void, - метод покупки товаров из корзины
}