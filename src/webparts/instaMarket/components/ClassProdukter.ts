import { ISPListProduct } from "./IProdukter";

export class ClassProdukter{
    public ProductTitle: string;
    public ProductPrice: string;
    public ProductCategory: string;
    public ProductImage: { Description:string, Url: string };
    

    constructor(item: ISPListProduct) {
        console.log("Creating new item: ", item.Title);
        this.ProductTitle = item.Title;
        this.ProductPrice = item.ECWS_x002e_Price;
        this.ProductCategory = item.ECWS_x002e_Category;
        this.ProductImage = item.ECWS_x002e_ImageUrl;
    }
}