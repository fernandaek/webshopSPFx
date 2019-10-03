import * as React from "react";
import styles from "./InstaMarket.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { FontSizes } from "@uifabric/styling";

export interface ICartComponentProps {
  countingNumber: number;
  test2: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const divStyle = {
  backgroundImage: "Url('https://images.unsplash.com/photo-1515678916313-2263ebfad5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60')",
  paddingTop: 40,
  // paddingBottom: 0,
  color: "black",
  fontSize: 30,
};

export default class CartComponent extends React.Component<
  ICartComponentProps,
  {}
> {
  public render(): React.ReactElement<ICartComponentProps> {
    return (
      <div style={divStyle} className={styles.row}>
        <div style={{ width: "100%", float: "left", textAlign: "center" }}>
          <h2 style={{fontSize: 60}}>InstaMarket</h2>
        </div>
        <div
          style={{
            float: "left",
            paddingTop: 12,
            cursor: "pointer"
          }}
          onClick={this.props.test2}
        >
          <div style={{color: "red", fontWeight: "bold", backgroundColor: "black", borderRadius: 5, padding: 5, opacity: 0.8}}>
            <Icon iconName="ShoppingCart" className="ms-ShoppingCart" style={{color: "white", fontSize: 45}} />{" "}
            {this.props.countingNumber !== 0 ? "There is " + this.props.countingNumber + " items in your cart!" : "Empty basket!"}
          </div>
          {/* <div>Your Cart</div> */}
        </div>
        <br style={{ clear: "left" }} />
      </div>
    );
  }
}
