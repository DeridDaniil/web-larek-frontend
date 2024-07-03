import { IFormContact, IFormOrder, IFormPayment, IProduct, TProductBasket } from "./Data";

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