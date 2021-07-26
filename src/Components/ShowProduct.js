import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//let todayStamp = new Date();

class ShowProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: [],
            pictures: [],
            message: [],
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
          //console.log("pictuer map?:   " + pictures);
          //this.state.pictures.map (picture => console.log(picture.image))

        
        const refMsg = firebase.firestore().collection("req@gmail.com").doc(this.props.match.params.id).collection("messages").doc("messages");
        refMsg.get().then((docMsg) => {
            if (docMsg.exists){
                this.setState({
                    message: docMsg.data(),
                    key: docMsg.id,
                    isLoading: false
                })
            }else{console.log("No such message")}
          });
          

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

    handleChanges = async (e) => {
        
        if(await e.target.files[0]){this.setState({image: e.target.files[0]})}
        var todayStamp = new Date();
        console.log("herrrr at today")
        console.log("new time :   " + todayStamp)
        const uploadTask = firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}/${this.state.product.stallId + todayStamp}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
        (error) =>{console.log(error);},
        async ()=>{await firebase.storage().ref(`${this.state.product.stallId}/${this.state.product.whouploadId}`).child(this.state.product.stallId + todayStamp).getDownloadURL().then(url=>{
            
            this.setState({url});
            //console.log("here first:   " + url);
        
        /////////// todo: to continue to update firebase data. see if below works
        //    console.log("Url: " + url);
        })
    
        //console.log("key:   " + this.state.key)
        //console.log("url:  " + this.state.url)
        firebase.firestore().collection("req@gmail.com").doc(this.state.key).collection("pictures").add({
           image: this.state.url}). then((docRef2)=>{
           this.setState({image: this.state.url});          
           //this.props.history.push("/list")
        })

        const pictures=[];
        var snapshotPic = await firebase.firestore().collection("req@gmail.com").doc(this.state.key).collection("pictures").get();
        snapshotPic.forEach(docPic => {
            const {image} = docPic.data();
            pictures.push({
              key: docPic.id, docPic, image
            });
          });
          this.setState({pictures});

    })
        //const uploadTask1 = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_1`).put(this.state.image)
        //uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1 ok')},
        //(error) =>{console.log(error);},
    
        //()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})  
 
        //console.log(e.target.files[0]);
        
       
        

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
            {this.state.pictures.map (picture =>
                <td><img src={picture.image}width="180px" height="180" alt=""></img></td>
            )}

            <div className="upload-data">
                &nbsp;&nbsp;
                <input type="file" onChange={this.handleChanges}/>    
            </div>
            
            
            <div class = "msg">
                <dt>Messages</dt>
                <div id="just-line-break">{this.state.message.messages}</div>
            </div>
  </div>
</div>

          
        )}
}
    export default ShowProduct