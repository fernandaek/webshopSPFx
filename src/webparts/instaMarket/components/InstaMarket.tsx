import * as React from "react";
import styles from "./InstaMarket.module.scss";
import { IInstaMarketProps } from "./IInstaMarketProps";
import { escape } from "@microsoft/sp-lodash-subset";
import pnp, { Item } from "sp-pnp-js";
import { ClassProdukter } from "./ClassProdukter";
import { ISPListProduct } from "./IProdukter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

interface IInstaMarketState {
  items: ClassProdukter[];
  cart: number;
}

export default class InstaMarket extends React.Component<
  IInstaMarketProps,
  IInstaMarketState
> {
  constructor(props: IInstaMarketProps) {
    super(props);
    this.state = {
      items: [],
      cart: 0
      // [
      //   {
      //     ProductTitle: "Surface",
      //     ProductCategory: "Computer",
      //     ProductPrice: "12000",
      //     ProductImage: {
      //       Description: "Surface pro",
      //       Url:
      //         "https://images.unsplash.com/photo-1555340627-20a4c7029632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
      //     }
      //   }
      // ]
    };
    this._clickHandler = this._clickHandler.bind(this);
  }

  private _clickHandler(items: any[]) {
    this.setState({
      items: []
    });
    // console.log("CLICKED!!!!!!!!!");
  }

  private IncrementItem = () => {
    this.setState({ cart: this.state.cart + 1 });
  };

  public render(): React.ReactElement<IInstaMarketProps> {
    return (
      <div className={styles.instaMarket}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div
                className="sidebar"
                style={{ color: "black", float: "right" }}
              >
                <h3>CART</h3>
                <div className="cart">
                  {/* {this.state.cart.map(c => ( */}
                  <span className="empty">
                    {/* {c.ProductTitle} | Price: {c.ProductPrice} */}
                    <span>{this.state.cart}</span>
                  </span>
                </div>
              </div>
              {this.state.items.map((item: ClassProdukter) => {
                console.log(item);
                return (
                  <div>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={
                          item.ProductImage !== null
                            ? item.ProductImage.Url
                            : ""
                        }
                      />
                      <Card.Body
                        style={{ color: "black", textAlign: "center" }}
                      >
                        <Card.Title>{item.ProductTitle}</Card.Title>
                        <Card.Text>
                          {item.ProductCategory} - {item.ProductPrice} SEK
                        </Card.Text>
                        <Button
                          variant="primary"
                          id={item.Id}
                          onClick={this.IncrementItem.bind(
                            this,
                            item.Id,
                            item.ProductTitle,
                            item.ProductPrice,
                            item.ProductCategory
                          )}
                          // onClick={e => alert(e.target.id)}
                        >
                          Add to cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  public componentDidMount() {
    // debugger;
    this._getListCustomerData();
  }

  private _getListCustomerData(): void {
    pnp.sp.web.lists
      .getByTitle("Produkter")
      .items.get()
      .then(response => {
        let customerCollection = response.map(item => new ClassProdukter(item));
        this.setState({ items: customerCollection });
        console.log("Customer Collection: ", customerCollection);
        console.log("RESPONSE: ", response);
        console.log("Image: ", customerCollection.ProductImage);
      });
  }
}
