import * as React from 'react';
import {Card,Elevation,} from '@blueprintjs/core';

interface BlogProps{
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
                <Card interactive={true} elevation={Elevation.TWO}>
                    <h5>{this.props.title}</h5>
                    <p>{this.props.content}</p>

                    <p>{"By " + this.props.name}</p>
                </Card>
            </div>
        )
    }
}