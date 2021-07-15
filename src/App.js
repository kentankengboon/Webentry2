import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends React.Component {
	constructor(props){
		super(props);
    this.checkUser();

    this.ref = firebase.firestore().collection("req@gmail.com");
    this.unsubscribe = null;
    this.state ={products:[]};
  }

  checkUser () {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log("yes logged in : " + user.email )
        window.location.replace("/list")
      }
        else {
          //console.log("not logged in")
          window.location.replace("/login")
        }
    });
  }


  // below here like all no use liao. Because above will either direct user to list or to login. this page become dummy liao
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
          
          <div class="container">
            <div class="panel panel-heading">
              <h3 class="panel heading">Item info</h3>
            </div>
          </div>

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
