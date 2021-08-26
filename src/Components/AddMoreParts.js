import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//import AddProduct from './AddProduct';
let emailUser = "";
//let todayFormatted = "";
let stallIdNo = "";
let todayStamp = "";
let todayId = "";
//let customerSelected = "";
let m = 0;
let memberId1 = "";
let memberId2 = "";
let memberId3 = "";
let memberId4 = "";
let memberId5 = "";
//let memberCount =0;


class AddMoreParts extends React.Component{
    constructor(props){
        super(props);
        //this.checkUser();

        this.ref = firebase.firestore().collection("req@gmail.com"); // todo: see if can add doc(stallIdNo) here to force a fixed docId
        this.state = {
            product: [],
            //memberCount: 0,
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
            quotes: '',
            poUploaded: '',
            poStatus: '',
            image: null,
        }

        this.checkMember();

        todayStamp = new Date();
        var dd = String(todayStamp.getDate()).padStart(2, '0');
        var mm = String(todayStamp.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = todayStamp.getFullYear();
        var hh = "" + todayStamp.getHours(); if (hh.length === 1){hh="0" + todayStamp.getHours();}
        var mn = "" + todayStamp.getMinutes(); if (mn.length === 1){mn="0" + todayStamp.getMinutes();}
        var ss = "" + todayStamp.getSeconds(); if (ss.length === 1){ss="0" + todayStamp.getSeconds();}
        var tttttt = "" + hh + mn + ss;
        todayId = yyyy + mm + dd + tttttt;
        //todayFormatted = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn
    }


    async componentDidMount(){
        //console.log("testing data passed: " + this.props.location.state.docId)
        stallIdNo = this.props.location.state.docId
        emailUser = this.props.location.state.emailId
        /*
        const refGet = firebase.firestore().collection("req@gmail.com").doc(this.props.location.state.docId);
        await refGet.get().then((doc)=>{
            if (doc.exists){
                this.setState({
                    product: doc.data(),
                    key: doc.id,
                    isLoading: false
                })
                stallIdNo = this.state.product.stallId;
                console.log("stallIdNo:  " + stallIdNo)
            }else{console.log("No such document at comp did mount")}
        });
      */  
    }

    async checkMember ()  {
        const refMember = firebase.firestore().collection("groups").doc("req@gmail.com");
        await refMember.get().then((doc)=>{
            if (doc.exists){
                //const document = doc.data();
                this.setState({
                    product: doc.data(),
                    //memberCount: document.memberCount,
                    //whouploadId: document.whouploadId,
                    //key: doc.id,
                    //isLoading: false
                })
            }else{console.log("No such document")}
        });
        for(m=1; m < this.state.product.memberCount + 1; m++){
            //console.log ("memberCount: " + this.state.product.memberCount)
            if (m===1) {memberId1 = this.state.product.member1; console.log("member1 " + memberId1)}
            if (m===2) {memberId2 = this.state.product.member2; console.log("member2 " + memberId2)}
            if (m===3) {memberId3 = this.state.product.member3; console.log("member3 " + memberId3)}
            if (m===4) {memberId4 = this.state.product.member4; console.log("member4 " + memberId4)}
            if (m===5) {memberId5 = this.state.product.member5; console.log("member5 " + memberId5)}
            //whichMember = "member" + String(m);  
            //console.log("member " + m + " =" + this.state.product.$whichMember)
        }
        //this.setState({});
    }

    checkUser () {
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
              //console.log("yes logged in : " + user.email + "  "); // + user.name);
              emailUser = user.email;
              //stallIdNo = user.email+todayStamp
              stallIdNo = todayId+user.email
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
    handleChange = async (e) => { // need to write to firestore the url. but write to where? must be unique to each part and must be assessible after for disply with the respective part
        if(await e.target.files[0]){this.setState({image: e.target.files[0]})}
        const uploadTask = firebase.storage().ref(`${stallIdNo}/${emailUser}/${todayId}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
        (error) =>{console.log(error);},
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(todayId).getDownloadURL().then(url=>{this.setState({url})})})
        
        //const uploadTask1 = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_1`).put(this.state.image)
        //uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1 ok')},
        //(error) =>{console.log(error);},
        //()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})  

    }

    // no need this function. can delete
    handleUpload = () => { //used whouploadid (email) + since date as storage folder name
        //const {image} = this.state;
        //const uploadTask = firebase.storage().ref(image.name + "_0").put(this.state.image)
        const uploadTask = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_0`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        
        // here add another pic here to Storage collection with a diff name adding a _1 behind
        //const uploadTask1 = firebase.storage().ref(image.name + "_1").put(this.state.image)
        const uploadTask1 = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_1`).put(this.state.image)
        uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})  
    }

    onSubmit = async(e) => {
        e.preventDefault();
        //const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, customer, tgtPrice, stallId, quotes, poUploaded, poStatus} = this.state;
        const {whatPN, whatQty, remark, tgtPrice} = this.state;
        if (this.state.whatPN != ''){

            if (this.state.url == null){ //the default dummy icon picture
                var url = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsIcon.png?alt=media&token=69ed115e-862b-452f-bf31-e56baabd20c3"
                this.state.url = url;
            }
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("moreParts")
            .add({whatPN, whatQty, remark, tgtPrice});
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("morePictures")
            .add({whatPN, image: this.state.url});
            //console.log("onsubmit here :" + this.state.url);
        }
        this.props.history.push("/list");
    }

    somemore = async(e) => {
        e.preventDefault();
        const {whatPN, whatQty, remark, tgtPrice} = this.state;
        if (this.state.whatPN != ''){
            await firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("moreParts")
            .add({whatPN, whatQty, remark, tgtPrice});
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("morePictures")
            .add({whatPN, image: this.state.url});
            this.props.history.push({pathname: '/moreparts2', state: {docId: stallIdNo, emailId2: emailUser}});
        }
        //e.target.name.reset();
        //this.e.target.reset();
        //this.props.onSearchTermChange(whatPN);
        //e.target.value = "";
        //e.target.name = "";
        //this.setState({whatPN: ''});
    }

    render (){
        //const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, since, whenAsk, customer, tgtPrice} = this.state;
        const {whatPN, whatQty, remark, tgtPrice} = this.state;
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
                        <Link to ="/create"> 
                        <button className ="Edit-Button" >Back</button>
                        </Link>
                    </div>
                    &nbsp;


                    <div>
                        <div className="form-group"></div>
                        <label>Enter part info below:</label>
                    </div>

                   
                    
                    <div>
                        <div className="form-group"></div>
                        <label></label>
                        <textarea className="form-control" name="whatPN" value={whatPN} onChange={this.onChange} placeholder="Part No" cols="80" rows="1">{whatPN}</textarea>
                    </div>
                    <div>
                        <div className="form-group"></div>
                        <label></label>
                        <textarea className="form-control" name="whatQty" value={whatQty} onChange={this.onChange} placeholder="Quantity" cols="80" rows="1">{whatQty}</textarea>
                    </div>
                    
                    <div>
                        <div className="form-group"></div>
                        <label></label>
                        <textarea className="form-control" name="tgtPrice" value={tgtPrice} onChange={this.onChange} placeholder="Tgt Price" cols="80" rows="1">{tgtPrice}</textarea>
                    </div>

                    <div>
                        <div className="form-group"></div>
                        <label></label>
                        <textarea className="form-control" name="remark" value={remark} onChange={this.onChange} placeholder="Desciption" cols="80" rows="3">{remark}</textarea>
                    </div>
                    <div className="upload-data">
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="200" width="200"/>
                    </div>
                    <div className="button>">
                        <button className="Submit-Button" onClick={this.onSubmit}>Done</button> &nbsp;&nbsp;&nbsp;
                        <button className="Submit-Button" onClick={this.somemore}>Somemore</button>
                    </div>
                    &nbsp;
                </Card>
            </div>
        )
    }
}
export default AddMoreParts
