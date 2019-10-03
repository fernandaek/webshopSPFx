import { IInstaMarketProps } from "./IInstaMarketProps";
import { ISPListProduct, ISPListProduct2, ISecondList } from "./IProdukter";

import { sp } from "sp-pnp-js";
import { Guid } from "guid-typescript";


export interface IGetDataService {
    getData(): Promise<ISPListProduct[]>;
    //for mock data
    handleMyList2(id: number): Promise<ISecondList[]>;
    getOrderList(): Promise<ISecondList[]>;
    //for SP data
    handleOrderList(userId: number, product: ISPListProduct2[]);
    handleOrderAndProduct(orderId: number, products: ISPListProduct2[]);
}

export class MockDataService implements IGetDataService {

    constructor() {
        this.handleMyList2 = this.handleMyList2.bind(this);
    }

    private myList: ISPListProduct[] = [
        {
            Id: 1, Title: 'Macbook', ECWS_x002e_Price: 10, ECWS_x002e_Category: 'product',
            ECWS_x002e_ImageUrl: { Url: 'https://www.flickr.com/photos/tsf42m/148569018/', Description: 'Computer' }
        },
        {
            Id: 2, Title: 'ASUS', ECWS_x002e_Price: 20, ECWS_x002e_Category: 'Tillbehör',
            ECWS_x002e_ImageUrl: { Url: 'https://www.flickr.com/photos/tsf42m/148569018/', Description: 'Computer' }
        },
        {
            Id: 3, Title: 'Dell', ECWS_x002e_Price: 15, ECWS_x002e_Category: 'product',
            ECWS_x002e_ImageUrl: { Url: 'https://www.flickr.com/photos/tsf42m/148569018/', Description: 'Computer' }
        }
    ];

    private myList2: ISecondList[] = [];

    handleMyList2(id: number): Promise<ISecondList[]> {
        console.log("Data source with id from myList2: ", id);
        let selectedItem;
        this.myList.map((element) => {
            if (element.Id === id) {
                selectedItem = element.Id;
                id = id - 1;
                this.myList2.push({ Id: this.myList[id].Id, Title: this.myList[id].Title, ECWS_x002e_User: 'user01', ECWS_x002e_Date: new Date() });
            }
        });

        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2);
        });
    }

    getOrderList(): Promise<ISecondList[]> {
        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2);
        });
    }

    getData(): (Promise<ISPListProduct[]>) {
        return new Promise<ISPListProduct[]>((resolve) => {
            resolve(this.myList);
        });
    }

    handleOrderAndProduct() {
        throw new Error("Error");
    }

    handleOrderList(): Promise<ISecondList[]> {
        throw new Error("Error");
    }
}

export class PnPDataService implements IGetDataService {
    constructor() {
        this.handleOrderList = this.handleOrderList.bind(this);
        // this.handleOrderAndProduct = this.handleOrderAndProduct.bind(this);
    }

    handleOrderList(userId: number, products: ISPListProduct2[]) {

        let guidNo = Guid.create().toString();

        sp.web.lists.getByTitle('Ordrar').items.add({
            Title: 'Order_' + guidNo,
            ECWS_x002e_UserId: userId,
            ECWS_x002e_Date: new Date()
        }).then((orderId) => {
            console.log("This is Id for Ordrar list: ", orderId.data.Id);

            // Orderrader
            this.handleOrderAndProduct(orderId.data.Id, products);
        });
    }

    handleOrderAndProduct(orderId: number, products: ISPListProduct2[]) {

        for (let i = 0; i < products.length; i++) {

            let guidNo = Guid.create().toString();

            sp.web.lists.getByTitle('Orderrader').items.add({
                Title: guidNo,
                ECWS_x002e_OrderId: orderId,
                ECWS_x002e_ProductId: products[i].Id
            }).then((oId) => {
                console.log("This is Id for Ordrar and product list: ", oId.data.Id);
                console.log("list: ", oId);

            });

        }
    }

    async getData(): Promise<ISPListProduct[]> {
        const result = await sp.web.lists.getByTitle('Produkter').items.get();
        return result;
    }

    getOrderList(): Promise<ISecondList[]> {
        throw new Error("Error");
    }

    handleMyList2(id: number): Promise<ISecondList[]> {
        throw new Error("Error");
    }
}