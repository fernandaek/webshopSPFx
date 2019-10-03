import { ISPListProduct, ISPListProduct2 } from "./IProdukter";

export interface IInstaMarketProps {
  description: string;
  produktList: ISPListProduct[];
  userId: number;

  handleSPDataUpdate(userId: number, products: ISPListProduct2[]);
  orderAndProductHandler(orderId: number, products: ISPListProduct2[]);
}
