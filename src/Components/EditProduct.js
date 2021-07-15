import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class EditProduct extends React.Component{
    constructor(props){
        super(props);
        //this.ref = firebase.firestore().collection("req@gmail.com");
        this.state = {
            product: [],
            key: ''
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id);
        ref.get().then((doc)=>{
            if (doc.exists){
                const document = doc.data();
                this.setState({
                    product: doc.data(),
                    whouploadId: document.whouploadId,
                    whoupload: document.whoupload,
                    whatUse: document.whatUse,
                    whatModel: document.whatModel,
                    whatPN: document.whatPN,
                    whatQty: document.whatQty,
                    whenAsk: document.whenAsk,
                    remark: document.remark,
                    since: document.since,
                    imageOld: document.image,
                    rating: document.rating,
                    key: doc.id,
                    isLoading: false
                })
            }else{console.log("No such document")}
        });
    }

    onChange = (e) => { 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleChange = (e) => {
        if(e.target.files[0]) {
            this.setState({image: e.target.files[0]})
        }
        console.log(e.target.files[0]);
        
        //handleUpload();
        //const {image} = this.state;
        //const uploadTask = firebase.storage().ref(image.name).put(this.state.image)
        //uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        //(error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
    }
    
    handleUpload = () => {
        const {image} = this.state;
        
        const uploadTask = firebase.storage().ref(image.name).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        ()=>{firebase.storage().ref().child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
    
        
    
    
    }




    onSubmit = (e) => {
        //var thisId = "";
        e.preventDefault();
        const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, whenAsk, remark, since, image, rating} = this.state;
        const updateRef = firebase.firestore().collection('req@gmail.com').doc(this.state.key);
        updateRef.set({whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, whenAsk, remark, since, image: this.state.url, rating})
            .then((docRef) =>{
                this.setState({ //below doesnt seems to matter
                    key: '',
                    whouploadId: '',
                    whoupload: '',
                    whatUse: '',
                    whatModel: '',
                    //whatPN: '',
                    whatQty: '',
                    //whenAsk: today,
                    remark: '',
                    //since: today,
                    image: this.state.url,
                    //rating: 2,
                });
                //thisId = docRef.id;
                this.props.history.push("/show/" + this.props.match.params.id);
            })
            .catch ((error) => {console.error("Error editing document: ", error);})
            
            const {imageOld} = this.state;
            var desertRef = firebase.storage().refFromURL(imageOld)
            desertRef.delete().then(function(){
                //alert("Item deleted")
                console.log("File deleted")
            }).catch(function(error){
                console.log("error hile deleting file")
            });
    }

    render (){
        const {whoupload, whatUse, whatModel, whatPN, whatQty, remark, since, whenAsk} = this.state;
        const cardStyles = {
            width: '40rem',
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


                    <div>
                        <div class="form-group"></div>
                        <label for="whoupload">Edit part info below:</label>
                        <textArea class="form-control" name="whoupload" onChange={this.onChange} placeholder={this.state.product.whoupload} cols="80" rows="1">{whoupload}</textArea>
                    </div>                    
                    <div>
                        <div class="form-group"></div>
                        <label for="whatModel"></label>
                        <textArea class="form-control" name="whatModel" onChange={this.onChange} placeholder={this.state.product.whatModel} cols="80" rows="1">{whatModel}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatQty"></label>
                        <textArea class="form-control" name="whatQty" onChange={this.onChange} placeholder={this.state.product.whatQty} cols="80" rows="1">{whatQty}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatUse"></label>
                        <textArea class="form-control" name="whatUse" onChange={this.onChange} placeholder={this.state.product.whatUse} cols="80" rows="1">{whatUse}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="remark"></label>
                        <textArea class="form-control" name="remark" onChange={this.onChange} placeholder={this.state.product.remark} cols="80" rows="3">{remark}</textArea>
                    </div>
                    <br></br>
                    <div className="button>">
                        <button class="Submit-Button" onClick={this.onSubmit}>Save All</button>
                    </div>
                    &nbsp;




                    <div className="upload-data">
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="150" width="150"/>
                    </div>
                    <div className="button>">
                        <button class="Submit-Button" onClick={this.handleUpload}>1. Upload Image</button>
                    </div>
                    &nbsp;



                </card>
            </div>
        )
    }
}





export default EditProduct