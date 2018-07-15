import * as React from 'react';
import cookies from 'react-cookies';
import { END_POINT } from './App';

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
        this.GetContentById()
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
                        <h1>
                            {this.state.title}
                        </h1>
                        <p>
                            {this.state.content}
                        </p>
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