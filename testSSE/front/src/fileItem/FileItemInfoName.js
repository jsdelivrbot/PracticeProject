import React, {Component} from 'react';

export default class FileItemInfoName extends Component{
    render() {
        return (
            <div>파일 path : {this.props.fileName}</div>
        );
    }
}

