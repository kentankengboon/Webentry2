import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const auth = firebase.auth();

class App extends React.Component {
	constructor(props){
		super(props);
    this.ref = firebase.firestore().collection("req@gmail.com");
    this.unsubscribe = null;
    this.state ={products:[]};
    console.log("here1");
    var user = firebase.auth().currentUser;
    //if(user) {console.log("yes logged in")}
    //else {
      console.log("no not logged in");
      window.location.replace("/login")
      //}
  }



  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      const {whatPN, remark, image} = doc.data();
      products.push({
        key: doc.Id, doc, whatPN, remark, image
      });
    });
    
    this.setState({products});
  }

  signOut(){
    auth.signOut();
    alert("Signed Out");
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
    opacity: 0.8,
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderStyle: 'outset',
    //borderLeft: '50px solid black',
    borderRadius: '20px'
    }

    return(
      <div>
        <card style = {cardStyles}>
          <div className = "Button">
            <Link to ="/create"> 
              <button class ="Add-Button" >Add an item</button>
            </Link>
          </div>
          <div className="button>">
                    &nbsp;&nbsp;&nbsp;
                    <button class="Submit-Button" onClick={this.signOut}>Sign Out</button>
                </div>

          {/* 
          <div class="container">
            <div class="panel panel-heading">
              <h3 class="panel heading">Item info</h3>
            </div>
          </div>
          */}
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>PartNo</th>
                  <th>Remark</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>

                {this.state.products.map (product =>
                  <tr>
                    <td>
                      <Link to = {`/show/${product.key}`}>{product.whatPN}</Link>
                    </td>
                    <td>{product.remark}</td>
                    <td><img src={product.image}width="100px" height="100" alt=""></img></td>
                  </tr>
                  )}

              </tbody>

            </table>


          </div>
          

        </card>
      </div>
    )
  }
}
export default App;
