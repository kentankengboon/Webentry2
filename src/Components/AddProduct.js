import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection("req@gmail.com");
        this.state = {
            whoupload: '',
            whatUse: '',
            whatModel: '',
            whatPN: '',
            whatQty: '',
            remark: '',
            since: '',
            whenAsk: '',
            image: null,
        }
    }

    onChange = (e) => { 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleChange = (e) => {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }
    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(image.name).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        ()=>{firebase.storage().ref().child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
    }

    onSubmit = (e) => {
        var thisId = "";

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var tttt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        today = yyyy + '-' + mm + '-' + dd + " " + tttt;
       
        
        e.preventDefault();
        const {whoupload, whatUse, whatModel, whatPN, whatQty, remark} = this.state;
        this.ref.add({whoupload, whatUse, whatModel, whatPN, whatQty, whatQty, whenAsk:today, remark, since:today, image: this.state.url, rating: 2})
            .then((docRef) =>{
                this.setState({
                    whoupload: '',
                    whatUse: '',
                    whatModel: '',
                    whatQty: '',
                    whenAsk: today,
                    remark: '',
                    since: today,
                    image: this.state.url,
                    rating: 2,
                });
                thisId = docRef.id;
                this.props.history.push("/list");

                firebase.firestore().collection("req@gmail.com").doc(thisId).collection("pictures").add({
                    image: this.state.url}). then((docRef2)=>{
                   this.setState({image: this.state.url });
                    this.props.history.push("/list")
                })
            })

            .catch ((error) => {console.error("Error adding document: ", error);})    
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
                        <button class ="Edit-Button" >Show items</button>
                        </Link>
                    </div>
                    &nbsp;
                    <div>
                        <div class="form-group"></div>
                        <label for="whoupload">Requestor</label>
                        <textArea class="form-control" name="whoupload" onChange={this.onChange} placeholder="Requestor" cols="80" rows="1">{whoupload}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatUse">Ship to</label>
                        <textArea class="form-control" name="whatUse" onChange={this.onChange} placeholder="Where" cols="80" rows="1">{whatUse}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatModel">Model</label>
                        <textArea class="form-control" name="whatModel" onChange={this.onChange} placeholder="Model No" cols="80" rows="1">{whatModel}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatPN">Part</label>
                        <textArea class="form-control" name="whatPN" onChange={this.onChange} placeholder="Part No" cols="80" rows="1">{whatPN}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatQty">Quantity</label>
                        <textArea class="form-control" name="whatQty" onChange={this.onChange} placeholder="Quantity" cols="80" rows="1">{whatQty}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="remark">Description</label>
                        <textArea class="form-control" name="remark" onChange={this.onChange} placeholder="Desciption" cols="80" rows="3">{remark}</textArea>
                    </div>
                    <div className="upload-data">
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="200" width="200"/>
                    </div>
                    <div className="button>">
                        <button class="Submit-Button" onClick={this.handleUpload}>1. Upload Image</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="Submit-Button" onClick={this.onSubmit}>2. Save All</button>
                    </div>
                    &nbsp;
                </card>
            </div>
        )
    }
}
export default AddProduct