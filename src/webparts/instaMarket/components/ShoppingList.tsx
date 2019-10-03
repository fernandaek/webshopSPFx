import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import styles from "./InstaMarket.module.scss";
import { ISPListProduct2 } from "./IProdukter";

export type CallRemoveFunction = (index: number) => void;
export type CallHideFunction = () => void;
export type CallToOrderFunction = () => void;

export interface IShoppingListProps {
  shoppingItems: ISPListProduct2[];
  callRemoveFunction: CallRemoveFunction;
  hideShowList: CallHideFunction;
  toOrderListFunction: CallToOrderFunction;
}

export class ShoppingList extends React.Component<IShoppingListProps, {}> {
  public render(): React.ReactElement<IShoppingListProps> {
    return (
      <div style={{ position: "relative", float: "right", marginTop: 10 }}>
        <div className={styles.shoppingContainer}>
          {this.props.shoppingItems.map((shopItem: any, index: number) => (
            <div key={index} style={{ width: 325 }}>
              <div style={{ float: "left", width: "30%" }}>
                <img
                  width={"75px"}
                  height={"75px"}
                  src={shopItem.ImageUrl.Url}
                />
              </div>
              <div style={{ float: "left", width: "60%" }}>
                <div>{shopItem.ImageUrl.Description}</div>
                <div style={{ paddingTop: 8 }}>
                  <strong>
                    {shopItem.Price}
                    {" Kr"}
                  </strong>{" "}
                </div>
              </div>
              <div
                className={styles.deleteIcon}
                style={{ float: "left", width: "10%", paddingTop: 27 }}
              >
                <Icon
                  onClick={this._callRemoveFunction.bind(this, index)}
                  iconName="ChromeClose"
                  id="icon"
                  className="ms-ChromeClose"
                />
              </div>
              <br style={{ clear: "left" }} />
              <hr />
            </div>
          ))}
          <br></br>
          <div style={{ float: "right" }}>
            <DefaultButton
              style={{ backgroundColor: "orange" }}
              onClick={this._callHideFunction}
            >
              Close
            </DefaultButton>{" "}
            <DefaultButton
              style={{ backgroundColor: "green" }}
              onClick={this._callToOrderFunction}
            >
              Go to payment
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private _callRemoveFunction = (index: number): void => {
    this.props.callRemoveFunction(index);
  };

  private _callHideFunction = (): void => {
    this.props.hideShowList();
  };

  private _callToOrderFunction = (): void => {
    this.props.toOrderListFunction();
  };
}
