import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const auth = firebase.auth();
let customerSelected = "";

class PoListing extends React.Component {
	constructor(props){
		super(props);
        this.ref = firebase.firestore().collection("req@gmail.com").doc("UnIssuedPO").collection("UnIssuedPO")
        this.unsubscribe = null;
        this.state ={products:[]};
    }

    componentDidMount(){this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);}
      
    onCollectionUpdate = (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          const {date, jobRefNo, partNo, partNo1, partNo2, partNo3, partNo4, qty0, qtyMore1, qtyMore2, qtyMore3, qtyMore4, price0, price1, price2, price3, price4, remark0, remark1, remark2, remark3, remark4, poNumber} = doc.data();
          products.push({
            key: doc.id, doc, date, jobRefNo, partNo, partNo1, partNo2, partNo3, partNo4 , qty0, qtyMore1, qtyMore2, qtyMore3, qtyMore4, price0, price1, price2, price3, price4, remark0, remark1, remark2, remark3, remark4, poNumber});
        });
        this.setState({products});
        //console.log("here::::" + this.state.product.jobRefNo);
      }

    render () {
        const cardStyles = {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'white',
        margin: 'auto',
        display: 'block',
        marginTop: '60px',
        opacity: 1,
        paddingTop: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderStyle: 'outset',
        //borderLeft: '50px solid black',
        borderRadius: '20px'
        }  

        return(
            <div>
                <Card style ={cardStyles}>
                    <div className = "Button">
                        <Link to ="/list"> 
                        <button className ="Edit-Button" >List items</button>
                        </Link>

                        &nbsp;&nbsp;&nbsp;
                        <select name="customerOption" id="customerPicked" onChange={this.onChange}>
                        <option value="1">by Date</option>
                        <option value="2">OrderId</option>
                        <option value="3">Part No</option>
                        <option value="4">Courts</option>
                        <option value="5">Harvey Norman</option>
                        <option value="6">Asus</option>
                        <option value="7">B2C</option>
                        <option value="8">All</option>
                        </select>

                    </div>

                    <div className="panel-body">
                        <table className="table table-stripe">
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>ClaimNo</th>
                            <th>PO No</th>

                            <th>Part 1</th>
                            <th>Desc 1</th>
                            <th>Qty 1</th>
                            <th>Price 1</th>

                            <th>Part 2</th>
                            <th>Desc 2</th>
                            <th>Qty 2</th>
                            <th>Price 2</th>

                            <th>Part 3</th>
                            <th>Desc 3</th>
                            <th>Qty 3</th>
                            <th>Price 3</th>

                            <th>Part 4</th>
                            <th>Desc 4</th>
                            <th>Qty 4</th>
                            <th>Price 4</th>

                            <th>Part 5</th>
                            <th>Desc 5</th>
                            <th>Qty 5</th>
                            <th>Price 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map (product =>
                            <tr key={product.key}>                  
                                <td>{product.date}</td>
                                <td>{product.jobRefNo}</td>
                                <td>{product.poNumber}</td>

                                <td>{product.partNo}</td>
                                <td>{product.remark0}</td>
                                <td>{product.qty0}</td>
                                <td>{product.price0}</td>

                                <td>{product.partNo1}</td>
                                <td>{product.remark1}</td>
                                <td>{product.qtyMore1}</td>
                                <td>{product.price1}</td>

                                <td>{product.partNo2}</td>
                                <td>{product.remark2}</td>
                                <td>{product.qtyMore2}</td>
                                <td>{product.price2}</td>

                                <td>{product.partNo3}</td>
                                <td>{product.remark3}</td>
                                <td>{product.qtyMore3}</td>
                                <td>{product.price3}</td>

                                <td>{product.partNo4}</td>
                                <td>{product.remark4}</td>
                                <td>{product.qtyMore4}</td>
                                <td>{product.price4}</td>
                            </tr>
                            )}

                        </tbody>

                        </table>


                    </div>


                </Card>
            </div>
        )
    }
}
export default PoListing;
