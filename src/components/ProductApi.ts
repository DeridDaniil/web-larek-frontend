import { IProduct, IOrder, IOrderResult } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface IProductApi {
  getCatalog: () => Promise<IProduct[]>;
  postOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class ProductApi extends Api implements IProductApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCatalog(): Promise<IProduct[]> {
    return this.get(`/product`).then((data: ApiListResponse<IProduct>) => 
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post(`/order`, order).then((data: IOrderResult) => data);
  }
}