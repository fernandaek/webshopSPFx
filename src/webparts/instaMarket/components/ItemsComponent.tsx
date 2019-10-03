import * as React from 'react';
import styles from './InstaMarket.module.scss';
import { ISPListProduct } from './IProdukter';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

export interface IItemsComponentProps {
    produktList: ISPListProduct[];    
    test;
}

export default class ItemsComponent extends React.Component<IItemsComponentProps, {}> {
    public render(): React.ReactElement<IItemsComponentProps> {
        let items = this.props.produktList.map((result) => {
            return <li className={styles.itemLiStyle} key={result.Id}>
                <Card style={{ width: "18rem" }}>
                    <Card.Img className={styles["card-img-top"]} variant="top"
                        src={result.ECWS_x002e_ImageUrl.Url} />
                    <Card.Body style={{textAlign: "center"}}>
                        <Card.Title>{result.ECWS_x002e_ImageUrl.Description}{<br></br>}</Card.Title>
                        <span className={styles.price}><strong>{result.ECWS_x002e_Price}{' SEK'}</strong></span>{<br></br>}    
                            {<Button variant="primary" style={{background: 'blue', marginTop: 3}} onClick={this.props.test.bind(this, result.Id, result.ECWS_x002e_ImageUrl.Url,
                                result.ECWS_x002e_ImageUrl.Description, result.ECWS_x002e_Price)}>Add to cart</Button>}
                    </Card.Body>
                </Card>
            </li>;
        });
        // console.log("This is from component: ", items);
        return (
            <div style={{background: 'white'}} className={styles.row}>
                <div style={{marginLeft: -42, display: 'contents'}}>
                    <ul style={{color: 'black', listStyle: 'none'}}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}
