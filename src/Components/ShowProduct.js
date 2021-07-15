import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ShowProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: [],
            key: ''
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id);
        ref.get().then((doc)=>{
            if (doc.exists){
                this.setState({
                    product: doc.data(),
                    key: doc.id,
                    isLoading: false
                })
            }else{console.log("No such document")}
        });
    }
    delete(id){
        var desertRef = firebase.storage().refFromURL(this.state.product.image)
        firebase.firestore().collection("req@gmail.com").doc(id).delete().then(()=>{
            console.log("Document deleted")
            this.props.history.push("/list")
        }).catch((error) =>{
            console.error(error);
        });
        desertRef.delete().then(function(){
            alert("Item deleted")
            console.log("File deleted")
        }).catch(function(error){
            console.log("error hile deleting file")
        });
    }
    render (){
        const cardStyles = {
            width: '40rem',
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
            borderLeft: '20px solid green',
            //borderRadius: '20px'
            }
        
        return(
            <div>
                <card style ={cardStyles}>
                    <div className = "Button">
                        <Link to ="/list"> 
                        <button class ="Edit-Button" >List items</button>
                        </Link>
                    </div>
                    &nbsp;
                    <div>
                        <img src = {this.state.product.image} height = "200" width = "200"/>
                    </div>
                    <div class= "panel panel-default">
                        <h3 class="panel-title">{this.state.product.whatPN}</h3>
                    </div>
                    <div class = "panel-body">
                        <dl>
                            <dd>Qty:  {this.state.product.whatQty}</dd>
                        </dl>
                        <dl>
                            <dt>Model</dt>
                            <dd>{this.state.product.whatModel}</dd>
                        </dl>
                        <dl>
                            <dt>Ship to</dt>
                            <dd>{this.state.product.whatUse}</dd>
                        </dl>
                        <dl>
                            <dt>Requested by</dt>
                            <dd>{this.state.product.whoupload}</dd>
                        </dl>
                        <dl>
                            <dt>Description</dt>
                            <dd>{this.state.product.remark}</dd>
                        </dl>
                        <Link to = {`/edit/${this.state.key}`} class = "btn btn-success">Edit</Link>
                        &nbsp;&nbsp;&nbsp;<button onClick={this.delete.bind(this, this.state.key )} class="btn btn-danger">Delete</button>
                        <dl></dl>
                    </div>
                </card>
            </div>
        )}
    }
    export default ShowProduct