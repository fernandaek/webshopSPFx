import { IUrl } from "./ClassProdukter";

export interface ISPListProduct {
  Id: number;
  Title: string;
  ECWS_x002e_Price: number;
  ECWS_x002e_Category: string;
  ECWS_x002e_ImageUrl: IUrl;
}

export interface ISPListProduct2 {
  Id: number;  
  Price: number;
  ImageUrl: {
    Description: string,
    Url: string
  };
}

export interface ISecondList {
  Id: number;
  Title: string;
  ECWS_x002e_User: string;
  ECWS_x002e_Date: Date;
}
