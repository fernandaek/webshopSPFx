import * as React from "react";
import styles from "./InstaMarket.module.scss";
import { IInstaMarketProps } from "./IInstaMarketProps";
import { escape } from "@microsoft/sp-lodash-subset";
import pnp from "sp-pnp-js";
import { ClassProdukter } from "./ClassProdukter";
import { ISPListProduct } from "./IProdukter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

interface IInstaMarketState {
  items: ClassProdukter[];
}

export default class InstaMarket extends React.Component<
  IInstaMarketProps,
  IInstaMarketState
> {
  constructor(props: IInstaMarketProps) {
    super(props);
    this.state = {
      items: []
    };
  }
  public render(): React.ReactElement<IInstaMarketProps> {
    return (
      <div className={styles.instaMarket}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              {this.state.items.map((item: ClassProdukter) => {
                console.log(item);
                return (
                  <div>
                    {/* <span>{item.ProductTitle}</span>
                      <span>{item.ProductPrice}</span>
                      <span>{item.ProductCategory}</span> */}
                    {/* <img src={item.ProductImage.Url}/> */}
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
                        <Button variant="primary">Add to the cart</Button>
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
