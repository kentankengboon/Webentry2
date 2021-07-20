import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
let emailUser = "";
let today = "";
let stallIdNo = "";
let todayStamp = new Date();
let customerSelected = "";

class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.checkUser();

        this.ref = firebase.firestore().collection("req@gmail.com");
        this.state = {
            whouploadId: '',
            whoupload: '',
            whatUse: '',
            whatModel: '',
            whatPN: '',
            whatQty: '',
            remark: '',
            since: '',
            whenAsk: '',
            tgtPrice: '',
            customer: '',
            stallId: '',
            image: null,
        }

        
        var dd = String(todayStamp.getDate()).padStart(2, '0');
        var mm = String(todayStamp.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = todayStamp.getFullYear();
        var tttt = todayStamp.getHours() + ":" + todayStamp.getMinutes() + ":" + todayStamp.getSeconds();
        today = yyyy + '-' + mm + '-' + dd + " " + tttt;
    }

    checkUser () {
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
              console.log("yes logged in : " + user.email + "  " + user.name);
              emailUser = user.email;
              stallIdNo = user.email+todayStamp
            }else {
              //console.log("not logged in")
              window.location.replace("/login")
            }
        });
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
    handleUpload = () => { //used whouploadid (email) + since date as storage folder name
        const {image} = this.state;
        //const uploadTask = firebase.storage().ref(image.name + "_0").put(this.state.image)
        const uploadTask = firebase.storage().ref(`${emailUser}/${stallIdNo}/${stallIdNo}_0`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        ()=>{firebase.storage().ref(`${emailUser}/${stallIdNo}`).child(stallIdNo + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        
        // here add another pic here to Storage collection with a diff name adding a _1 behind
        //const uploadTask1 = firebase.storage().ref(image.name + "_1").put(this.state.image)
        const uploadTask1 = firebase.storage().ref(`${emailUser}/${stallIdNo}/${stallIdNo}_1`).put(this.state.image)
        uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})
        ()=>{firebase.storage().ref(`${emailUser}/${stallIdNo}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})  
    }

    onSubmit = (e) => {
        var thisId = "";

        //var today = new Date();
        //var dd = String(today.getDate()).padStart(2, '0');
        //var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //var yyyy = today.getFullYear();
        //var tttt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //today = yyyy + '-' + mm + '-' + dd + " " + tttt;
       
        var customerSelect = document.getElementById("customerPicked");
        customerSelected = customerSelect.options[customerSelect.selectedIndex].text;

        e.preventDefault();
        const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, customer, tgtPrice, stallId} = this.state;
        this.ref.add({whouploadId: emailUser, whoupload:emailUser, whatUse, whatModel, whatPN, whatQty, whenAsk:today, remark, since:today, image: this.state.url, rating: 2, customer:customerSelected, tgtPrice, stallId: stallIdNo})
            .then((docRef) =>{
                this.setState({ //below doesnt seems to matter
                    whouploadId: emailUser,
                    whoupload: emailUser,
                    whatUse: '',
                    whatModel: '',
                    whatQty: '',
                    whenAsk: today,
                    remark: '',
                    since: today,
                    image: this.state.url,
                    rating: 2,
                    customer: customerSelected,
                    tgtPrice: tgtPrice,
                    stallId: stallIdNo
                });
                thisId = docRef.id;
                this.props.history.push("/list");

                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(thisId).collection("pictures").add({
                    image: this.state.url1}). then((docRef2)=>{
                   this.setState({image: this.state.url1 });
                    this.props.history.push("/list")
                })
                
            })

            .catch ((error) => {console.error("Error adding document: ", error);})    
    }

    render (){
        const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, since, whenAsk, customer, tgtPrice} = this.state;
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
                        <div class="form-group"></div>
                        <label for="customer">Enter part info below:</label>
                    </div>

                    <select name="customerOption" id="customerPicked">
                        <option value="1">Select customer</option>
                        <option value="2">Courts</option>
                        <option value="3">Harvey Norman</option>
                        <option value="4">Asus</option>
                        <option value="4">B2C</option>
                    </select>

                    <div>
                        <div class="form-group"></div>
                        <label for="whatModel"></label>
                        <textArea class="form-control" name="whatModel" onChange={this.onChange} placeholder="Model No" cols="80" rows="1">{whatModel}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatPN"></label>
                        <textArea class="form-control" name="whatPN" onChange={this.onChange} placeholder="Part No" cols="80" rows="1">{whatPN}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatQty"></label>
                        <textArea class="form-control" name="whatQty" onChange={this.onChange} placeholder="Quantity" cols="80" rows="1">{whatQty}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatUse"></label>
                        <textArea class="form-control" name="whatUse" onChange={this.onChange} placeholder="Ship to" cols="80" rows="1">{whatUse}</textArea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="tgtPrice"></label>
                        <textArea class="form-control" name="tgtPrice" onChange={this.onChange} placeholder="Tgt Price" cols="80" rows="1">{tgtPrice}</textArea>
                    </div>

                    <div>
                        <div class="form-group"></div>
                        <label for="remark"></label>
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