import * as React from 'react';
import {Button,Classes, Label} from '@blueprintjs/core';
import cookie from 'react-cookies';

const COOKIE_OPTIONS: {
  path?: string;
  expires?: Date;
  maxAge?: number; 
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
} = {
  path: 'localhost',
  domain :'localhost'
};

export class PostForm extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            Title:'',
            Content:'',
            PostError:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.AddNewPost = this.AddNewPost.bind(this);
    }

    handleInputChange(event:any) {
        const target = event.target;
        const value  = target.value;
        const name   = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    async AddNewPost(){
        if (this.state.Content === '' || this.state.Title === ''){
            this.setState({PostError:'Fill all fields'})
            return
        }
        let formData = new FormData(),response:Response;// date=new Date();
      //   let today = date.getDate() + '/' + date.getMonth()+1  + '/' + date.getFullYear() ;
        formData.append('Title', this.state.Title);
        formData.append('Content', this.state.Content); 
        // formData.append('Date',today)
        console.log("title : ",this.state.Title,"\n Content :",this.state.Content,"\nDate: ")

        console.log("Posting.....")
        response = await fetch('http://localhost:8000/v1/insert',{
            body:formData,    
            method:'post',
            credentials: 'include',
            mode: 'cors',
            headers: [
                ['Authorization','Basic '+btoa(cookie.load('name',COOKIE_OPTIONS)+':'+cookie.load('password',COOKIE_OPTIONS))],
                ['Content-Type', 'multipart/form-data'],
            ]     
        })
        console.log(response)
        if(response.status=== 200){
            this.setState({PostError:'Success'})
        }else{
            console.log("code : ",response.status)
            cookie.remove("name", COOKIE_OPTIONS);
            cookie.remove("password", COOKIE_OPTIONS);
            cookie.remove("loggedin", COOKIE_OPTIONS);
            // location.href="/login"
            this.setState({PostError:'Success'})
        }
    }
    public render(){
        return(
            <div id="postform">
            <Label text="Title" className={Classes.TEXT_MUTED}/>
            <input 
                id="titleinput"
                placeholder="Enter title" 
                name="Title"    
                value={this.state.Title}
                onChange={this.handleInputChange} 
            /><br/><br/>
            <Label text="Content" className={Classes.TEXT_MUTED}/>
            <input 
                id="contentinput"
                placeholder="Enter Content" 
                name="Content" 
                value={this.state.Content}
                onChange={this.handleInputChange} 
            /><br/><br/>
            <Button 
                className={Classes.INTENT_PRIMARY} 
                text="Post" 
                onClick={this.AddNewPost}
            /><br/>
            <div id="autherror">
                {this.state.PostError}
            </div>
            </div>
        )
    }
}