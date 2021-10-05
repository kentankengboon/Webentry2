import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const auth = firebase.auth();
let customerSelected = "";

class ListProducts extends React.Component {
	constructor(props){
		super(props);
    
    this.checkUser();

    //this.ref = firebase.firestore().collection("req@gmail.com").orderBy("whatPN");
    this.ref = firebase.firestore().collection("req@gmail.com").where('since', '!=', "archived").orderBy('since', 'desc')
    this.unsubscribe = null;
    this.state ={products:[]};
    //this.customerSelected = "";
    this.onChange = this.onChange.bind(this);
  }

  checkUser () {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        //console.log("yes logged in : " + user.email)
      }
        else {
          //console.log("not logged in")
          window.location.replace("/login")
        }
    });
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    //customerSelected = "Harvey Norman"
    //if (customerSelected != ""){ 
    //  this.unsubscribe = this.ref.where('customer', '==', customerSelected).onSnapshot(this.onCollectionUpdate);
    //} else {this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);}
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      //const {whatPN, whatModel, whatQty, whoupload, customer, remark, image, stallId, jobRefNo} = doc.data();
      const {whatPN, whatModel, whatQty, whoupload, customer, remark, stallId, jobRefNo, poStatus, quotes, whenAsk, category} = doc.data();
      products.push({
        //key: doc.id, doc, whatPN, whatModel, whatQty, whoupload, customer, remark, image, stallId,, poStatusjobRefNo
        key: doc.id, doc, whatPN, whatModel, whatQty, whoupload, customer, remark, stallId, jobRefNo, poStatus, quotes, whenAsk, category
      });
    });
    //console.log(products);
    this.setState({products});
  }

  async onChange(){
    //console.log("hereeeeeee");
    var customerSelect = document.getElementById("customerPicked");
    customerSelected = customerSelect.options[customerSelect.selectedIndex].text;
    //console.log("customer selected:  " + customerSelected);

    //this.setState({customerSelected});
    
    const products=[];
    var snapshot="";
    if (customerSelected == "All"){snapshot = await firebase.firestore().collection("req@gmail.com").orderBy('whenAsk').get();
    }else{

      if(customerSelected == "Part No"){snapshot = await firebase.firestore().collection("req@gmail.com").orderBy('whatPN').get();} 
      else{
        if (customerSelected == "OrderId"){snapshot = await firebase.firestore().collection("req@gmail.com").orderBy('jobRefNo').get();}
        else{
          //if(customerSelected == "by Date"){snapshot = await firebase.firestore().collection("req@gmail.com").where('since', '!=', "archived").orderBy('since', 'desc').get();}
          if(customerSelected == "by Date"){snapshot = await firebase.firestore().collection("req@gmail.com").orderBy('whenAsk', 'desc').get();}
          else{snapshot = await firebase.firestore().collection("req@gmail.com").where('customer', '==', customerSelected).get();}
        }
      }
    }
    //if (snapshot.empty){console.log("can't find doc. Doc empty")}else{console.log(snapshot)}
    snapshot.forEach(doc => {
      //const {whatPN, whatModel, whatQty, whoupload, customer, remark, image, stallId, jobRefNo} = doc.data();
      const {whatPN, whatModel, whatQty, whoupload, customer, remark, stallId, jobRefNo, poStatus, quotes, whenAsk, category} = doc.data();
      products.push({
        //key: doc.id, doc, whatPN, whatModel, whatQty, whoupload, customer, remark, image, stallId, jobRefNo
        key: doc.id, doc, whatPN, whatModel, whatQty, whoupload, customer, remark, stallId, jobRefNo, poStatus, quotes, whenAsk, category
      });
    });
    //console.log(products);
    this.setState({products});
  }

  signOut(){
    auth.signOut();
    //alert("Signed Out");
    window.location.replace("/login")
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
          // <td>{product.stallId.substring(0, 17)}</td> // replaced by jobRefNo below
    return(
      <div>
        <Card style = {cardStyles}>
          <div className = "Button">
            <Link to ="/create"> 
              <button className ="Add-Button" >Add an item</button>
            </Link>

            &nbsp;&nbsp;&nbsp;
            <button className ="Submit-Button" onClick={this.signOut}>Sign Out</button>
              
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

          {/* 
          <div class="container">
            <div class="panel panel-heading">
              <h3 class="panel heading">Item info</h3>
            </div>
          </div>
          */}
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>PartNo.</th>
                  <th>Date</th>
                  <th>OrderId</th>
                  <th>poStatus</th>
                  <th>Model</th>
                  <th>Qty</th>
                  <th>Quotes</th>
                  <th>Requestor</th>
                  <th>For</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>

                {this.state.products.map (product =>
                  <tr key={product.key}>
                    <td>
                      <Link to = {`/show/${product.key}`}>{product.whatPN}</Link>
                    </td>                    
                    <td>{product.whenAsk.substr(0,10)}</td>
                    <td>{product.jobRefNo}</td>
                    <td>{product.poStatus}</td>
                    <td>{product.whatModel}</td>
                    <td>{product.whatQty}</td>
                    <td>{product.quotes}</td>
                    <td>{product.whoupload}</td>
                    <td>{product.customer}</td>
                    <td>{product.category}</td>
                    <td>{product.remark}</td>
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
export default ListProducts;
