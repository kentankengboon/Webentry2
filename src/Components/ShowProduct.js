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
            pictures: [],
            key: ''
        }
    }
    async componentDidMount(){
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

        const pictures=[];
        var snapshotPic = await firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id).collection("pictures").get();
        snapshotPic.forEach(docPic => {
            const {image} = docPic.data();
            pictures.push({
              key: docPic.id, docPic, image
            });
          });
          this.setState({pictures});
          console.log("pictuer map?:   " + pictures);
          this.state.pictures.map (picture => console.log(picture.image))

    }
    delete(id){ // can we delete the whole folder iunder email+since folder?

        firebase.firestore().collection("req@gmail.com").doc(id).delete().then(()=>{
            console.log("Document deleted")
            this.props.history.push("/list")
        }).catch((error) =>{
            console.error(error);
        });


        //console.log(this.state.product.whoupload);
        //console.log(this.state.product.since);
        console.log(this.state.product.image);
        
        //delete all storage image file under the folder
        var storageRef = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}`); /// todo: must delete under stallId NOT since
        storageRef.listAll().then((listResults) => {
           const promises = listResults.items.map((item) => {
                return item.delete();
            })
        });

        //var desertRef = firebase.storage().refFromURL(this.state.product.image)
        //desertRef.delete().then(function(){
            //alert("Item deleted")
            //console.log("File deleted")
        //}).catch(function(error){
            //console.log("error hile deleting file")
        //});



    }
    render (){
        const cardStyles = {
            width: '40rem',
            height: 'auto',
            backgroundColor: 'white',
            margin: '0px',
            display: 'block',
            marginTop: '10px',
            marginRight: '0',
            opacity: 1,
            paddingTop: '10px',
            paddingLeft: '0px',
            paddingRight: '0px',
            borderStyle: 'outset',
            borderLeft: '20px solid green',
    
            //borderRadius: '20px'
            }
        return(
            <div>
                
  <div class="column">
    <div class="card">
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
                            <dt>Customer</dt>
                            <dd>{this.state.product.customer}</dd>
                        </dl>
                        <dl>
                            <dt>Tgt price</dt>
                            <dd>{this.state.product.tgtPrice}</dd>
                        </dl>
                        <dl>
                            <dt>Description</dt>
                            <dd>{this.state.product.remark}</dd>
                        </dl>
                        <Link to = {`/edit/${this.state.key}`} class = "btn btn-success">Edit</Link>
                        &nbsp;&nbsp;&nbsp;<button onClick={this.delete.bind(this, this.state.key,this.state.whouploadId, this.state.stallId )} class="btn btn-danger">Delete</button>
                        <dl></dl>
                    </div>
        </card>
    </div>
  </div>
  
  <div class="column">
    
        <card style ={cardStyles}>
    
            
              

                {this.state.pictures.map (picture =>
              
                    <td><img src={picture.image}width="180px" height="180" alt=""></img></td>
             
                  )}


        


        </card>
    
  </div>
  
</div>

          
        )}
    }
    export default ShowProduct