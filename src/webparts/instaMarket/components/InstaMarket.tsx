import * as React from "react";
import styles from "./InstaMarket.module.scss";
import { IInstaMarketProps } from "./IInstaMarketProps";
import { escape } from "@microsoft/sp-lodash-subset";
import pnp, { Item } from "sp-pnp-js";
import { ClassProdukter } from "./ClassProdukter";
import { ISPListProduct, ISPListProduct2, ISecondList } from "./IProdukter";
import ItemsComponent from './ItemsComponent';
import CartComponent from './CartComponent';
import { ShoppingList } from './ShoppingList';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";


export interface IInstaMarketState {
  // items: ClassProdukter[];
  // cart: number;
  countingNumber: number;
  listTwo: ISPListProduct2[];
  showList: boolean;
}

export default class InstaMarket extends React.Component<
  IInstaMarketProps,
  IInstaMarketState
> {
  constructor(props: IInstaMarketProps) {
    super(props);
    this.state = {
      countingNumber: 0,
      listTwo: [],
      showList: false,

    };
  }
  private IncrementItem (id: number, imgUrl: string, imgDesc: string, pris: number) {
    const total = this.state.countingNumber;
    this.setState({ countingNumber: total + 1, listTwo: [...this.state.listTwo, {
      Id: id, ImageUrl: {
        Url: imgUrl,
        Description: imgDesc
      },
      Price: pris
    }
  ]
 });
}
  private DecrementItem (index: number) {
    const total = this.state.countingNumber;
    let array = [...this.state.listTwo];
    array.splice(index, 1);

    this.setState({
      countingNumber: total - 1,
      listTwo: array
    });
  }

  private _onClickToOrderList() {
    this.props.handleSPDataUpdate(this.props.userId, this.state.listTwo);
    this.setState({
      showList: !this.state.showList
    });
  }

  private _showCartList() {
    if (this.state.listTwo.length > 0) {
      this.setState({
        showList: !this.state.showList
      });
    }
  }

  public render(): React.ReactElement<IInstaMarketProps> {
    console.log("listTwo: ", this.state.listTwo);
    console.log("produktList: ", this.props.produktList);
    return (
      <div className={styles.instaMarket}>
        <div className={styles.container}>
            <CartComponent countingNumber={this.state.countingNumber} test2={this._showCartList.bind(this)}></CartComponent>
            {
            (this.state.listTwo.length != 0 && this.state.showList) ?
              <ShoppingList shoppingItems={this.state.listTwo}
                callRemoveFunction={this.DecrementItem.bind(this)}
                hideShowList={this._showCartList.bind(this)}
                toOrderListFunction={this._onClickToOrderList.bind(this)}></ShoppingList>
              : null
            }
               
              <ItemsComponent produktList={this.props.produktList} test={this.IncrementItem.bind(this)} ></ItemsComponent>
          
            </div>
          </div>
    );
  }
}

