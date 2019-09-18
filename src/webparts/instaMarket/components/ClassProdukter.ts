import { ISPListProduct } from "./IProdukter";

export interface IUrl {
  Description: string;
  Url: string;
}

export class ClassProdukter {
  public ProductTitle: string;
  public ProductPrice: string;
  public ProductCategory: string;
  public ProductImage: IUrl;

  constructor(item: ISPListProduct) {
    console.log("Creating new item: ", item.Title);
    this.ProductTitle = item.Title;
    this.ProductPrice = item.ECWS_x002e_Price;
    this.ProductCategory = item.ECWS_x002e_Category;
    console.log(item.ECWS_x002e_ImageUrl);
    this.ProductImage = item.ECWS_x002e_ImageUrl;
    // console.log(JSON.parse(item.ECWS_x002e_ImageUrl));
    // this.ProductImage = JSON.parse(item.ECWS_x002e_ImageUrl);
  }
}
