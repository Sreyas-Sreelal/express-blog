import * as React from 'react';
import {  Colors, Classes, Button } from '@blueprintjs/core';
// import {  InputGroup } from '@blueprintjs/core'
import {END_POINT} from './App';

interface LoginProps{
    OnLoggedIn:Function
}
export class Login extends React.Component<LoginProps,any>{
    constructor(props:any){
        super(props)
        this.state={
            Name:'',
            Password:'',
            AuthError:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.SendPost = this.SendPost.bind(this);
    }
    async SendPost(){
        let formData = new FormData(),response:Response;
        formData.append('Name', this.state.Name);
        formData.append('Password', this.state.Password);
        response = await fetch(END_POINT + "/v1/login",{
            body: formData,
            method: "post"
        })
        if(response.ok){
            console.log("Logged in")
            this.setState({autherror:''})
            this.props.OnLoggedIn(this.state.Name,this.state.Password)
        }else{
            console.log("Authentication failed")
            this.setState({autherror:'Invalid creditinals'})
        }
        
    }

    handleInputChange(event:any) {
        const target = event.target;
        const value  = target.value;
        const name   = target.name;
    
        this.setState({
          [name]: value
        });
    }

    public render(){ 
        return( 
            <div id="login-data">
               <h4 className={Classes.LARGE} style={{ color:Colors.GRAY1}}><br/>Login <br/> </h4>
                <input 
                    className="pt-input"  
                    type="text" 
                    placeholder="Username" 
                    dir="auto" 
                    name="Name"
                    value={this.state.Name}
                    onChange={this.handleInputChange}
                /><br/><br/>
                <input 
                    className="pt-input"  
                    type="password" 
                    placeholder="Password" 
                    dir="auto"
                    name="Password"
                    value={this.state.Password}
                    onChange={this.handleInputChange} 
                /><br/><br/>
               <Button 
                    className={Classes.INTENT_SUCCESS} 
                    text="Login" 
                    onClick={this.SendPost}
               />
               <div id="autherror">{this.state.autherror}</div>
               <footer>
                    <p className="footerNote">
                        2018 &copy;Express Blog <span>All Rights Reserved</span>
                    </p>
                </footer>
            </div>

        )
    }
}