import * as React from 'react';
import cookies from 'react-cookies';
import { END_POINT, COOKIE_OPTIONS } from './App';
import { Button, Classes} from '@blueprintjs/core';

interface PostContentProps{
    match: { params: { PostID: string; } };
}
export class PostView extends React.Component<PostContentProps,any>{
    constructor(props:PostContentProps){
        super(props)
        this.state={
            content:'',
            title:'',
            error:'',
            loggedin:cookies.load("loggedin")
        }
        this.DeletePost = this.DeletePost.bind(this)
        this.GetContentById()
    }
    async DeletePost(){
        let formData = new FormData(),response:Response;
        formData.append('PostID', this.props.match.params.PostID);
        response = await fetch(END_POINT + "/v1/delete",{
            body:formData,    
            method:'post',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization':'Basic '+btoa(cookies.load('name',COOKIE_OPTIONS)+':'+cookies.load('password',COOKIE_OPTIONS))
            }
        })
        if(response.ok){
            location.href="/"
        }else{
            console.log("Delete failed")
            this.setState({error:"Server couldn't delete that post now "})
        }
    }
    async GetContentById(){
        let response:Response;
        console.log("Post id is %s ",this.props.match.params.PostID)
        response = await fetch(END_POINT+"/v1/getpostbyid/" + this.props.match.params.PostID,{
                                method:'get',
        });

        if(response.ok){
            let postdata = await response.json();
            this.setState({title:postdata.Title,content:postdata.Content});

        }else{
            console.log("Failed with to fetch")
            this.setState({error:"Failed to fetch resource from server"})
            return 
        }
}
    public render(){
        return(
            <div id="contentview">
                {this.state.error === '' ? (
                    <div>
                        <div id="title">
                            {this.state.title}
                        </div>
                        <div id="content">
                            {this.state.content}
                        </div>
                        {this.state.loggedin ?(
                            <Button 
                                className={Classes.INTENT_DANGER} 
                                text="Delete" 
                                onClick={this.DeletePost}
                            />
                            ):(
                                <div/>
                        )}

                    </div>
                ):(
                    <div id="error">
                        {this.state.error}
                    </div>
                )}
            </div>
        )
    }

}