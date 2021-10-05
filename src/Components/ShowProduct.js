import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//let todayStamp = new Date();
let poExisted = "";

let m = 0;
let memberId1 = "";
let memberId2 = "";
let memberId3 = "";
let memberId4 = "";
let memberId5 = "";
let memberId6 = "";
let memberId7 = "";
let memberId8 = "";
let memberId9 = "";
let memberId10 = "";
let memberId11 = "";
let memberId12 = "";
let memberId13 = "";
let memberId14 = "";
let memberId15 = "";


class ShowProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: [],
            pictures: [],
            message: [],
            key: '',
            //keyMsg: ''
        }
        this.checkMember();
    }
    async componentDidMount(){
        const ref = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id);
        await ref.get().then((doc)=>{
            if (doc.exists){
                this.setState({
                    product: doc.data(),
                    key: doc.id,
                    isLoading: false
                })
            }else{console.log("No such document")}
        });
        
//console.log("customer_a:   " + this.state.product.customer)     
        const pictures=[];
        var snapshotPic = await firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id).collection("pictures").get();
        snapshotPic.forEach(docPic => {
            const {image} = docPic.data();
            pictures.push({
              key: docPic.id, docPic, image
            });
          });
          this.setState({pictures});
          //console.log("pictuer map?:   " + pictures);
          //this.state.pictures.map (picture => console.log(picture.image))
        
//console.log("customer1a:   " + this.state.product.customer)        
        const refMsg = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id).collection("messages").doc("messages");
        refMsg.get().then((docMsg) => {
            if (docMsg.exists){
                this.setState({
                    message: docMsg.data(),
                    //keyMsg: docMsg.id,
                    isLoading: false
                })
            }else{
                //console.log("No such message")
            }
          });
          
//console.log("customer2a:   " + this.state.product.customer)

        if (this.state.product.stage >= 3){
            await firebase.storage().ref(`${this.state.product.stallId}`).child("PO.pdf")
            .getDownloadURL().then(urlPO=>{
                if (urlPO != null){this.setState({urlPO})}
                //console.log("URL-PO existed:   " + urlPO);
            })
            .catch((err) => {
                // show Default userPic    
                console.log("err >> ", err);
            });
        }

        if (this.state.urlPO != null){poExisted = "PO existed. Click Open to view"}else{poExisted ="Pending PO upload"}
        //console.log("when start: " + poExisted);
        this.setState({poExisted});
    }


    async checkMember ()  {
        const refMember = firebase.firestore().collection("groups").doc("req@gmail.com");
        await refMember.get().then((doc)=>{
            if (doc.exists){
                const document = doc.data();
                this.setState({
                    product: doc.data(),
                })
            }else{console.log("No such document")}
        });
        for(m=1; m < this.state.product.memberCount + 1; m++){
            if (m===1) {memberId1 = this.state.product.member1}
            if (m===2) {memberId2 = this.state.product.member2}
            if (m===3) {memberId3 = this.state.product.member3}
            if (m===4) {memberId4 = this.state.product.member4}
            if (m===5) {memberId5 = this.state.product.member5}
            if (m===6) {memberId6 = this.state.product.member6}
            if (m===7) {memberId7 = this.state.product.member7}
            if (m===8) {memberId8 = this.state.product.member8}
            if (m===9) {memberId9 = this.state.product.member9}
            if (m===10) {memberId10 = this.state.product.member10}
            if (m===11) {memberId11 = this.state.product.member11}
            if (m===12) {memberId12 = this.state.product.member12}
            if (m===13) {memberId13 = this.state.product.member13}
            if (m===14) {memberId14 = this.state.product.member14}
            if (m===15) {memberId15 = this.state.product.member15}
        }
        //this.setState({});
    }

    
    async delete(id){ // can we delete the whole folder iunder email+since folder?

        firebase.firestore().collection("req@gmail.com").doc(id).delete().then(()=>{
            //console.log("Document deleted")
            this.props.history.push("/list")
        }).catch((error) =>{
            console.error(error);
        });

        const refDelete1 = firebase.firestore().collection("req@gmail.com").doc(id).collection("moreParts");
        var snapshotMore1 = await firebase.firestore().collection("req@gmail.com").doc(id).collection("moreParts").get();
        snapshotMore1.forEach(docMore => {
            refDelete1.doc(docMore.id).delete();
        });

        const refDelete2 = firebase.firestore().collection("req@gmail.com").doc(id).collection("mailBox");
        var snapshotMore2 = await firebase.firestore().collection("req@gmail.com").doc(id).collection("mailBox").get();
        snapshotMore2.forEach(docMore => {
            refDelete2.doc(docMore.id).delete();
        });
        
        const refDelete3 = firebase.firestore().collection("req@gmail.com").doc(id).collection("pictures");
        var snapshotMore3 = await firebase.firestore().collection("req@gmail.com").doc(id).collection("pictures").get();
        snapshotMore3.forEach(docMore => {
            refDelete3.doc(docMore.id).delete();
        });

        const refDelete4 = firebase.firestore().collection("req@gmail.com").doc(id).collection("messages");
        var snapshotMore4 = await firebase.firestore().collection("req@gmail.com").doc(id).collection("messages").get();
        snapshotMore4.forEach(docMore => {
            refDelete4.doc(docMore.id).delete();
        });

        const refDelete5 = firebase.firestore().collection("req@gmail.com").doc(id).collection("morePictures");
        var snapshotMore5 = await firebase.firestore().collection("req@gmail.com").doc(id).collection("morePictures").get();
        snapshotMore5.forEach(docMore => {
            //console.log("delete here:   " + docMore.id)
            refDelete5.doc(docMore.id).delete();
        });

        //todo:
        //must delete all storage image file under the folder first.
        //but will have problem here
        //how to delete all pictures under all other member email ID folder?
        var storageRef1 = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}`); /// todo: must delete under stallId NOT since
        storageRef1.listAll().then((listResults) => {
           const promises = listResults.items.map((item) => {
                return item.delete();
            })
        });

        var storageRef2 = firebase.storage().ref(`${this.state.product.stallId}`); /// todo: must delete under stallId NOT since
        storageRef2.listAll().then((listResults) => {
           const promises = listResults.items.map((item) => {
                return item.delete();
            })
        });
    }

    handleChanges = async (e) => {
        if(await e.target.files[0]){this.setState({image: e.target.files[0]})}
        var todayStamp = new Date();
        //console.log("today stamp:   " + todayStamp)
        //console.log("StallId: " + this.state.product.stallId)
        const uploadTask = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}/${this.state.product.stallId + todayStamp}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
        (error) =>{console.log(error);},
        async ()=>{ await firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}`).child(this.state.product.stallId + todayStamp)
            .getDownloadURL().then(url=>{
                this.setState({url});
                //console.log("here first:   " + url);
            })
    
            //console.log("key:   " + this.state.key)
            //console.log("url:  " + this.state.url)
            firebase.firestore().collection("req@gmail.com").doc(this.state.key).collection("pictures").add({
            image: this.state.url}).then((docRef2)=>{
            this.setState({image: this.state.url});
            })

            const pictures=[];
            var snapshotPic = await firebase.firestore().collection("req@gmail.com").doc(this.state.key).collection("pictures").get();
            snapshotPic.forEach(docPic => {
                const {image} =docPic.data();
                pictures.push({
                key: docPic.id, docPic, image
                });
            });
            this.setState({pictures});
        })
    }

    uploadPO = async (e) => {
        if(await e.target.files[0]){this.setState({filePO: e.target.files[0]})
        //const uploadTask2 = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}/PO`).put(this.state.filePO)
        const uploadTask2 = firebase.storage().ref(`${this.state.product.stallId}/PO.pdf`).put(this.state.filePO)
        uploadTask2.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
        (error) =>{console.log(error);},
        async ()=>{ await firebase.storage().ref(`${this.state.product.stallId}`).child("PO.pdf")
            .getDownloadURL().then(urlPO=>{
                this.setState({urlPO});
                //console.log("URL PO:   " + urlPO);
                poExisted = "PO existed. Click Open to view"
                this.setState({poExisted});
            })

            // this below write the PO URL to firestore
            firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({
            poUploaded: this.state.urlPO}) 

            //once PO re uploaded, it doesnt care if previuosly approved or what stage, it will re-state PO pending approval and just write/re-write stage to 3
            firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({poStatus: "pending approval"})
            firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({stage: 3})
            //console.log("customer3:   " + this.state.product.customer)     
            firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({condCode: [this.state.product.customer+"ARN", "3ARN"]});
        })

        }
        
        // added 18 Aug 21 1513 for notification of PO uploaded
        firebase.firestore().collection("NotificationTrigger").add({
            food: this.state.product.whatPN,
            groupId:  "req@gmail.com",
            image: this.state.product.image,
            index: -3,
            place: this.state.product.whatUse,
            qty: this.state.product.whatQty,
            remark: this.state.product.remark,
            stall: this.state.product.whatModel,
            stallId: this.state.product.stallId,
            jobRefNo: this.state.product.jobRefNo
        })

        ////////////// todo: here set gotMail of this PO'ed item to 1 so that it trigger red message alert at Food.dart.
        ///////////// but must set for all members of the group wo. Can use ForEach to do that?
        ///////////// go see how add new did that. when add new, gotMail was set to -1
        ///////////// gotMail = -1 means new item at food.dart
        const stallIdNo = this.state.key;
            if (memberId1 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId1).set({gotMail: -1});
            if (memberId2 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId2).set({gotMail: -1});
            if (memberId3 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId3).set({gotMail: -1});
            if (memberId4 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId4).set({gotMail: -1});
            if (memberId5 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId5).set({gotMail: -1});
            if (memberId6 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId6).set({gotMail: -1});
            if (memberId7 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId7).set({gotMail: -1});
            if (memberId8 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId8).set({gotMail: -1});
            if (memberId9 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId9).set({gotMail: -1});
            if (memberId10 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId10).set({gotMail: -1});
            if (memberId11 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId11).set({gotMail: -1});
            if (memberId12 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId12).set({gotMail: -1});
            if (memberId13 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId13).set({gotMail: -1});
            if (memberId14 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId14).set({gotMail: -1});
            if (memberId15 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId15).set({gotMail: -1});
    }
    poGo(){
        firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({poStatus: "pending approval"})
        firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({stage: 3})
        firebase.firestore().collection("req@gmail.com").doc(this.state.key).update({condCode: [this.state.product.customer+"ARN", "3ARN"]});
        this.props.history.push("/list");
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
            paddingLeft: '20px',
            paddingRight: '0px',
            borderStyle: 'outset',
            borderLeft: '20px solid green',
            //borderRadius: '20px'
        }

        return(
            <div>
                <div className="column">
                    <div className="card">
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
                            <div className = "panel-body">
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
                                <Link to = {`/edit/${this.state.key}`} className = "btn btn-success">Edit</Link>
                                &nbsp;&nbsp;&nbsp;<button onClick={this.delete.bind(this, this.state.key,this.state.whouploadId, this.state.stallId )} className="btn btn-danger">Delete</button>
                                <dl></dl>
                            </div>
                        </Card>
                    </div>
                </div>
  
                <div className="column">
                    <dt>&nbsp;&nbsp;&nbsp;Add more pictures here</dt>
                    
                    {this.state.pictures.map (picture =>
                        <img key={picture.key} src={picture.image}width="180px" height="180" alt=""></img>
                    )}

                    <div className="upload-data">
                        &nbsp;&nbsp;
                        <input type="file" onChange={this.handleChanges}/>    
                    </div>
                    <br></br>
                    <div>
                        <dt>&nbsp;&nbsp;&nbsp;Messages</dt>
                        
                        <div id="scrollId">
                        <div className = "msg">
                        <div id="just-line-break">{this.state.message.messages}</div>
                        </div>
                        </div>
                    </div>

                    <dt>&nbsp;&nbsp;&nbsp;{this.state.poExisted}

                        &nbsp;&nbsp;&nbsp;
                        <button className ="Submit-Button" onClick={this.poGo.bind(this, this.state.key)}>PO Go</button>

                    </dt>

                    <br></br>
                    <div className="upload-data">
                        &nbsp;&nbsp;
                        <input type="file" onChange={this.uploadPO}/>
                        <div>
                            <embed src={this.state.urlPO} width="800" height="500" type="application/pdf"></embed>
                        </div>
                    </div>
                </div>
            </div>
        )}
    }
    export default ShowProduct