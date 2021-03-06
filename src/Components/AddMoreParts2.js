import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { toast } from 'toast-notification-alert'
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
let memberCount =0;
let categorySelected = "";
let urlCount = 0;
let url1a = "";
let url1b = "";
let url1c = "";
let url1d = "";
let validation = "";

// AppMoreParts2 created just to use this new page to erase existing input field data as I dont know how to actually do it
class AddMoreParts2 extends React.Component{
    constructor(props){
        super(props);
        //this.checkUser();
        urlCount = 0;
        this.ref = firebase.firestore().collection("req@gmail.com"); // todo: see if can add doc(stallIdNo) here to force a fixed docId
        this.state = {
            product: [],
            //memberCount: 0,
            whouploadId: '',
            whoupload: '',
            whatUse: 'Singapore',
            whatModel: '',
            whatPN: '',
            whatQty: '1',
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
            whatPN1: '', //<< added
            whatPN2: '',
            whatPN3: '',
            whatPN4: '',
            morePartQty: '',
        }

        // this.checkMember(); // shut it down, no use. only needed at AddProduct.js
        this.getMorePartsInfo();

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
        emailUser = this.props.location.state.emailId2
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

    //<< added
    async getMorePartsInfo (){
        console.log("more part whatPN1 have?   ")
        const morePartsCheck = firebase.firestore().collection("req@gmail.com").doc(this.props.location.state.docId);
        await morePartsCheck.get().then((doc)=>{
            if (doc.exists){
            this.setState({morePart: doc.data(),})
            console.log("more part whatPN1:   " + this.state.morePart.whatPN1)
            }
        });
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
            if (m===1) {memberId1 = this.state.product.member1}
            if (m===2) {memberId2 = this.state.product.member2}
            if (m===3) {memberId3 = this.state.product.member3}
            if (m===4) {memberId4 = this.state.product.member4}
            if (m===5) {memberId5 = this.state.product.member5}
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
    handleChange = async (e) => {
        urlCount ++;
        //console.log ("urlCount:  " + urlCount.toString());
        if (urlCount<=5){ // 5 pictures max
            if(await e.target.files[0]){this.setState({image: e.target.files[0]})}
            //console.log ("todayId:  " + todayId);
            const uploadTask = firebase.storage().ref(`${stallIdNo}/${emailUser}/${todayId}_${urlCount}`).put(this.state.image)
            uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
            (error) =>{console.log(error);},
            ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(todayId + '_' + urlCount).getDownloadURL().then(url1=>{ 
                if (urlCount ==1) {this.setState({url1})}
                if (urlCount ==2) {url1a = url1;this.setState({url1a})}
                if (urlCount ==3) {url1b = url1;this.setState({url1b})}
                if (urlCount ==4) {url1c = url1;this.setState({url1c})}
                if (urlCount ==5) {url1d = url1;this.setState({url1d})}

                //this.setState({url}); 
                //console.log("Url: " + url);
            })})
        }
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

    validateEntry = async(e) =>{
        const categorySelect = document.getElementById("categoryPicked");
        categorySelected = await categorySelect.options[categorySelect.selectedIndex].text;
        console.log("whatPN " + this.state.whatPN)
        console.log("category " + categorySelected)
        console.log("qty " + this.state.whatQty)
        console.log("Description " + this.state.remark)

        if (this.state.whatPN == "" ){validation = 'fail'}
        if (this.state.whatQty == "" ){validation = 'fail'}
        if (this.state.remark == "" ){validation = 'fail'}
        if (categorySelected == "Select category" ){validation = 'fail'}
        //console.log("validation here " + validation)
        return validation
    }

    onSubmit = async(e) => { //todo: must remmeber to do notification at "Done" in any of the pages
        validation = 'pass'
        const categorySelect = document.getElementById("categoryPicked");
        categorySelected = await categorySelect.options[categorySelect.selectedIndex].text;
        e.preventDefault();

        const {whatPN, whatQty, remark, tgtPrice, quotes, category} = this.state;
        if (this.state.whatPN != '' && await this.validateEntry() == 'pass'){
            if (this.state.url1 == null){ //the default dummy icon picture
                var url1 = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsImage.jfif?alt=media&token=025014d3-9701-42df-8348-65efb113bcae"
                //var url = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsIcon.png?alt=media&token=69ed115e-862b-452f-bf31-e56baabd20c3"
                this.state.url1 = url1;
            }
            const whatPNupper = this.state.whatPN.toUpperCase();
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("moreParts").doc(whatPNupper)
            .set({whatPN: whatPNupper, whatQty, remark, tgtPrice, quotes, category:categorySelected});
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("morePictures").doc(whatPNupper)
            .set({whatPN: whatPNupper, image: this.state.url1});
            //console.log("onsubmit here2 :" + this.state.url);

            // writing to base part (of the whole claim/job ID)
            if (urlCount >1){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1a}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1a });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >2){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1b}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1b });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >3){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1c}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1c });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >4){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1d}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1d });
                    //this.props.history.push("/list")
                })
            }




            if (this.state.morePart.whatPN1 == "") { //<< added
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                .update({whatPN1: whatPN.toUpperCase()});

                // todo: add morePartQty=1 here
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 1});
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_1").set({
                    whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                    jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                    whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                    whenAsk: this.state.morePart.whenAsk, since: "archived",
                    category:categorySelected, image: this.state.url1, jobIdNo: "archived"
                });
                //console.log("here:  ");

            }   else{
                    if (this.state.morePart.whatPN2 == null) { //<< added
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                    .update({whatPN2: whatPN.toUpperCase()});
                    // todo: add morePartQty=2 here
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 2});
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_2").set({
                        whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                        jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                        whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                        whenAsk: this.state.morePart.whenAsk, since: "archived",
                        category:categorySelected, image: this.state.url1, jobIdNo: "archived"
                    });
                    //console.log("here:  ");

                    }   else{
                        if (this.state.morePart.whatPN3 == null) { //<< added
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                        .update({whatPN3: whatPN.toUpperCase()});
                        // todo: add morePartQty=3 here
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 3});
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_3").set({
                            whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                            jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                            whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                            whenAsk: this.state.morePart.whenAsk, since: "archived",
                            category:categorySelected, image: this.state.url1, jobIdNo: "archived"
                        });
                        //console.log("here:  ");
                        }   else{
                            if (this.state.morePart.whatPN4 == null) { //<< added
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                            .update({whatPN4: whatPN.toUpperCase()});
                            // todo: add morePartQty=4 here
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 4});
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_4").set({
                                whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                                jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                                whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                                whenAsk: this.state.morePart.whenAsk, since: "archived",
                                category:categorySelected, image: this.state.url1, jobIdNo: "archived"
                            });
                            //console.log("here:  ");
                            }   
                        }
                    }
                }
            this.props.history.push("/list");
        } else{toast.show({title: 'Information Incomplete', position: 'topleft'}) }
        
    }

    somemore = async(e) => {
        validation = 'pass'
        const categorySelect = document.getElementById("categoryPicked");
            categorySelected = await categorySelect.options[categorySelect.selectedIndex].text;

        e.preventDefault();
        const {whatPN, whatQty, remark, tgtPrice, quotes, category} = this.state;
        if (await this.validateEntry() == 'pass'){
        if (this.state.whatPN != '' ){
            if (this.state.url1 == null){ //the default dummy icon picture
                var url1 = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsImage.jfif?alt=media&token=025014d3-9701-42df-8348-65efb113bcae"
                //var url1 = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsIcon.png?alt=media&token=69ed115e-862b-452f-bf31-e56baabd20c3"
                this.state.url1 = url1;
            }
            const whatPNupper = this.state.whatPN.toUpperCase();
            await firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("moreParts").doc(whatPNupper)
            .set({whatPN: whatPNupper, whatQty, remark, tgtPrice, quotes,category:categorySelected});
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("morePictures").doc(whatPNupper)
            .set({whatPN: whatPNupper, image: this.state.url1});

            if (urlCount >1){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1a}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1a });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >2){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1b}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1b });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >3){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1c}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1c });
                    //this.props.history.push("/list")
                })
            }
            if (urlCount >4){
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1d}). then((docRef2)=>{
                    this.setState({whatPN: whatPNupper, image: this.state.url1d });
                    //this.props.history.push("/list")
                })
            }
            this.props.history.push({pathname: '/moreparts', state: {docId: stallIdNo, emailId: emailUser}});
        }
        //e.target.name.reset();
        //this.e.target.reset();
        //this.props.onSearchTermChange(whatPN);
        //e.target.value = "";
        //e.target.name = "";
        //this.setState({whatPN: ''});
        if (this.state.whatPN != '' ){
            if (this.state.morePart.whatPN1 == null) { //<< added
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                .update({whatPN1: whatPN.toUpperCase()});
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 1});
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_1").set({
                    whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                    jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                    whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                    whenAsk: this.state.morePart.whenAsk, since: "archived",
                    category: categorySelected, image: this.state.url1, jobIdNo: "archived"
                });
            }   else{
                    if (this.state.morePart.whatPN2 == null) { //<< added
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                    .update({whatPN2: whatPN.toUpperCase()});
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 2});
                    firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_2").set({
                        whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                        jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                        whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                        whenAsk: this.state.morePart.whenAsk, since: "archived",
                        category: categorySelected, image: this.state.url1, jobIdNo: "archived"
                    });
                    }   else{
                        if (this.state.morePart.whatPN3 == null) { //<< added
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                        .update({whatPN3: whatPN.toUpperCase()});
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 3});
                        firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_3").set({
                            whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                            jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                            whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                            whenAsk: this.state.morePart.whenAsk, since: "archived",
                            category: categorySelected, image: this.state.url1, jobIdNo: "archived"
                        });
                        }   else{
                            if (this.state.morePart.whatPN4 == null) { //<< added
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo)
                            .update({whatPN4: whatPN.toUpperCase()});
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).update({morePartQty: 4});
                            firebase.firestore().collection("req@gmail.com").doc(stallIdNo+"_4").set({
                                whatPN: whatPN.toUpperCase(),  whatQty, remark, tgtPrice,
                                jobRefNo: this.state.morePart.jobRefNo,whatModel: this.state.morePart.whatModel, 
                                whatUse: this.state.morePart.whatUse,customer: this.state.morePart.customer, 
                                whenAsk: this.state.morePart.whenAsk, since: "archived",
                                category: categorySelected, image: this.state.url1, jobIdNo: "archived"
                            });
                            }   
                        }
                    }
                }
        }
    }else{toast.show({title: 'Information Incomplete', position: 'topleft'}) }

    }

    render (){

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

                    <br></br>

<p>
                    <select name="categoryOption" id="categoryPicked">
                        <option value="1">Select category</option>
                        <option value="2">Adapter</option>
                        <option value="3">Battery</option>
                        <option value="4">Cable</option>
                        <option value="5">Camera</option>
                        <option value="6">Casing</option>
                        <option value="7">Fan</option>
                        <option value="8">Keyboard</option>
                        <option value="9">LCD</option>
                        <option value="10">MB</option>
                        <option value="11">Memory</option>
                        <option value="12">Speaker</option>
                        <option value="13">SSD</option>
                        <option value="14">Others</option>
                    </select> 
 </p> 

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
                        <img src={this.state.url1} height="200" width="200"/>
                        <img src={this.state.url1a} height="150" width="150"/>
                        <img src={this.state.url1b} height="150" width="150"/>
                        <img src={this.state.url1c} height="150" width="150"/>
                        <img src={this.state.url1d} height="150" width="150"/>


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
export default AddMoreParts2
