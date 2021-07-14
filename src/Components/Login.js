//import { render } from '@testing-library/react';
import React from 'react';
import firebase from '../Config';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';
const auth = firebase.auth();
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: '', password: ''}
    }

    onChange = (e) => { 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    
    signUp = async(e) =>{
        //e.preventDefault();
        var gotError = 0;
        //const {email, password} = this.state;
        var password = document.getElementById("password");
        const {email} = this.state;
        const promise = auth.createUserWithEmailAndPassword(email, password.value);
        console.log("password: " + password.value)
        console.log(" email: " + email);
        await promise.catch(e => {alert(e.message);gotError=1});
        if (gotError == 0) {alert("You are signed up")}
    }

    signIn = async() => {
        var gotError = 0;
        var password = document.getElementById("password");
        const {email} = this.state;
        const promise = auth.signInWithEmailAndPassword(email, password.value);
        await promise.catch(e => {alert(e.message);gotError=1});
        if (gotError==0) {
            alert("You are signed in")
            window.location.replace("/list")
        }
    }
    
    signOut(){
        auth.signOut();
        alert("Signed Out");
    }

    render () {
        const {email, password} = this.state;
        return(
            <div>
                <div className="form-group"></div>
                &nbsp;&nbsp;<label for="email">Register</label>
                <textArea class="form-control" name="email" onChange={this.onChange} placeholder="enter email" cols="80" rows="1">{email}</textArea>
                &nbsp;&nbsp;<input type="password" placeholder="enter password" id="password"/>
                <div>&nbsp;&nbsp;</div>
                <div className="button>">
                    &nbsp;&nbsp;&nbsp;
                    <button class="Submit-Button" onClick={this.signUp}>Sign Up</button>
                    &nbsp;&nbsp;&nbsp;
                    <button class="Submit-Button" onClick={this.signIn}>Sign In</button>
                    &nbsp;&nbsp;&nbsp;
                    <button class="Submit-Button" onClick={this.signOut}>Sign Out</button>
                </div>
            </div>
            
        )
    }

    }

export default Login