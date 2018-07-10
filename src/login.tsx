import * as React from 'react';
import {  Colors, Classes, Button } from '@blueprintjs/core';
// import {  InputGroup } from '@blueprintjs/core'

export class Login extends React.Component<any,any>{
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
    SendPost(){
        let formData = new FormData();
        formData.append('Name', this.state.Name);
        formData.append('Password', this.state.Password);

        fetch("http://localhost:5000/login",{
            body: formData,
            method: "post"
        }).then((response) => {
            if(response.ok){
               console.log("Logged in")
               this.setState({autherror:''})
            }else{
                console.log("Authentication failed")
                this.setState({autherror:'Invalid creditinals'})
            }
        }).catch(error => {
            console.log("Authentication failed")
            this.setState({autherror:'Invalid creditinals'})
        })
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