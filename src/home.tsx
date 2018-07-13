import * as React from 'react';
// import {  Colors, Classes, Button } from '@blueprintjs/core';
// import {  InputGroup } from '@blueprintjs/core'
import {BlogCard} from './blogcards';
export class Home extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            blogdata:[]
        }
        this.GetBlogPosts()
    }
    
    async GetBlogPosts(){
            let response:Response;
            response = await fetch('http://localhost:8000/v1/getposts',{
                    method: 'get',
            })
            
            if(response.ok){
                let rawdata = await response.json()
                this.setState({blogdata:rawdata})
            }else{
                console.log("No posts")
                this.setState({blogdata:null})
            }
        
    }

    public render(){ 
        if(this.state.blogdata !== null){
            return( 
                <div id="blogcontent">
                {
                    this.state.blogdata.map(function(rows:any,i:number){
                        console.log("SD")
                        console.log(rows.Content)
                        return(<BlogCard key={i} title={rows.Title} content={rows.Content} name={rows.Name}/>)
                    })
                }
                </div>
            )
        }else{
            return(
                <div id="noposts">
                    No posts yet :(
                </div>
            )
        }
    }
}