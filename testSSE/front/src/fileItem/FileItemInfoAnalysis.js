import React, {Component} from 'react';

export default class FileItemInfoAnalysis extends Component{
    render() {
        return (
            <div>분석 상태 : {this.props.fileAnalysis}</div>
        );
    }
}