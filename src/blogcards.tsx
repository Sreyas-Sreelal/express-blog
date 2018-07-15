import * as React from 'react';
import {Card,Elevation,} from '@blueprintjs/core';

interface BlogProps{
    id:string,
    title:string,
    content:string,
    name:string
};

export class BlogCard extends React.Component<BlogProps> {
    constructor(props:BlogProps){
        super(props);
    }
    public render() {
        return (
            <div id="postbox">
                <a href={"/viewpost/" + this.props.id}>
                    <Card interactive={true} elevation={Elevation.TWO}>
                        <h5>{this.props.title}</h5>
                        <p id="content">{    
                            (this.props.content.length>50)?
                            (this.props.content.slice(0,50) + "...")
                            :(this.props.content)
                        }</p>
                        <p id="bywho">{"By " + this.props.name}</p>
                    </Card>
                </a>
            </div>
        )
    }
}