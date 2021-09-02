import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
let imageUrlPrevious = '';

class EditProduct extends React.Component{
    
    constructor(props){
        super(props);
        //this.ref = firebase.firestore().collection("req@gmail.com");
        this.state = {
            product: [],
            key: '',
            //imageUrlPrevious: ''
        }
        
    }
    componentDidMount(){
        const ref = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id);
        ref.get().then((doc)=>{
            if (doc.exists){
                const document = doc.data();
                this.setState({
                    product: doc.data(),
                    customer: document.customer,
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
                    stallId: document.stallId,
                    tgtPrice: document.tgtPrice,
                    quotes: document.quotes,
                    poUploaded: document.poUploaded,
                    poStatus: document.poStatus,
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
    //ref(`${emailUser}/${stallIdNo}/${stallIdNo}_0`).put(this.state.image)
    //()=>{firebase.storage().ref(`${emailUser}/${stallIdNo}`).child(stallIdNo + "_0").getDownloadURL().then(url=>{this.setState({url})})})
    handleChange = async (e) => { 
        if(await e.target.files[0]) {
            
            this.setState({image: e.target.files[0]})
            // I think here must know how to put the image into sub folder email/stallId. this.state.product.stallId?
            //console.log("stallId....." + this.state.product.stallId);
            const uploadTask = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}/${e.target.files[0].name}_0`).put(e.target.files[0])
            uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
            (error) =>{console.log(error);},
            ()=>{firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}`).child(`${e.target.files[0].name}_0`).getDownloadURL().then(url=>{
                this.setState({url}); 
        
                console.log("Url: " + url); 
                //console.log("previous:  " + imageUrlPrevious);
                //if(imageUrlPrevious != ''){          
                //    var desertRef = firebase.storage().refFromURL(imageUrlPrevious)
                //    desertRef.delete().then(function(){
                //        console.log("File deleted")
                //        imageUrlPrevious = url;
                //    }).catch(function(error){
                //        console.log("error hile deleting file")
                //    });
                //} else{imageUrlPrevious = url;}
            })})
            
        }
        console.log(e.target.files[0].name);
    }
    
    // no need this function. can delete and migth not work liao
    handleUpload = () => {
        const {image} = this.state;
        
        const uploadTask = firebase.storage().ref(image.name).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        ()=>{firebase.storage().ref().child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
    }

    onSubmit = (e) => {
        //var thisId = "";
        if (this.state.url == null) {this.state.url = this.state.product.image;}
        e.preventDefault();
        const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, whenAsk, remark, since, image, rating, customer, stallId, tgtPrice, quotes, poUploaded, poStatus} = this.state;
        const updateRef = firebase.firestore().collection('req@gmail.com').doc(this.state.key);
        updateRef.set({whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, whenAsk, remark, since, image: this.state.url, rating, customer, stallId, tgtPrice, quotes, poUploaded, poStatus})
            .then((docRef) =>{
                this.setState({ //below doesnt seems to matter
                    key: '',
                    //whouploadId: '',
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
        const {whoupload, whatUse, whatModel, whatPN, whatQty, remark, since, whenAsk, customer, stallId, tgtPrice} = this.state;
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
                <Card style ={cardStyles}>
                    <div className = "Button">
                        <Link to ="/list"> 
                        <button className ="Edit-Button" >List items</button>
                        </Link>
                    </div>
                    &nbsp;

                    <div>
                        <img src = {this.state.product.image} height = "200" width = "200"/>
                        
                    </div>
                    <div className= "panel panel-default">
                        <h3 className="panel-title">{this.state.product.whatPN}</h3>
                    </div>


                    <div>
                        <div className="form-group">
                        <label>Customer</label>
                        <textarea className="form-control" name="customer" onChange={this.onChange} placeholder={this.state.product.customer} cols="80" rows="1">{customer}</textarea>
                        </div>
                    </div>                    
                    <div>
                        <div className="form-group">
                        <label>Model No</label>
                        <textarea className="form-control" name="whatModel" onChange={this.onChange} placeholder={this.state.product.whatModel} cols="80" rows="1">{whatModel}</textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                        <label>Qty</label>
                        <textarea className="form-control" name="whatQty" onChange={this.onChange} placeholder={this.state.product.whatQty} cols="80" rows="1">{whatQty}</textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                        <label>Tgt Price</label>
                        <textarea className="form-control" name="tgtPrice" onChange={this.onChange} placeholder={this.state.product.tgtPrice} cols="80" rows="1">{tgtPrice}</textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                        <label>Ship to</label>
                        <textarea className="form-control" name="whatUse" onChange={this.onChange} placeholder={this.state.product.whatUse} cols="80" rows="1">{whatUse}</textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                        <label>Descriptions</label>
                        <textarea className="form-control" name="remark" onChange={this.onChange} placeholder={this.state.product.remark} cols="80" rows="3">{remark}</textarea>
                        </div>
                    </div>
                    <br></br>
                    
                    <div className="upload-data">
                        <dt>Replace picture</dt>
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="100" width="100"/>
                    </div>
                    
                    <div className="button>">
                        <button className="Submit-Button" onClick={this.onSubmit}>Save All</button>
                    </div>
                    &nbsp;
                </Card>
            </div>
        )
    }
}

export default EditProduct