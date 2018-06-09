import React, {Component} from 'react';
import FileItemInfoName from './FileItemInfoName';
import FileItemInfoAnalysis from './FileItemInfoAnalysis';

const fileItemInfoStyle = {
    float: 'left',
    width: '30%'
}

export default class FileItemInfo extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            fileName: "file nothing",
            fileData: "",
            fileAnalysis: "nothing"
        }
        this.setFileName = this.setFileName.bind(this);
        this.makeFormData = this.makeFormData.bind(this);
        this.request = this.request.bind(this);
        this.response = this.response.bind(this);
    }
    render() {
        return (
            <div style={fileItemInfoStyle}>
                <div>
                    <input type="file" onChange={this.setFileName}/>
                    <input type="button" value="분석" onClick={this.request}/>
                </div>
                <FileItemInfoName fileName={this.state.fileName}></FileItemInfoName>
                <FileItemInfoAnalysis fileAnalysis={this.state.fileAnalysis}></FileItemInfoAnalysis>
            </div>
        );
    }
    setFileName(event) {
        this.setState({
            fileName : event.target.value.split('\\').pop(),
            fileData : event.target.files[0]
        });
    }
    request() {
        const formData = this.makeFormData();
        fetch('/test1', {
            method : 'post',
            body : formData
        })
        .then(res => res.json())
        .then(this.response)
        .catch(err => console.dir(err));
    }
    response(res) {
        const {result} = res;
        switch(result) {
            case "NO_FILE": 
                console.error("파일이 제대로 등록되지 않았습니다. 다시 파일을 등록해 주시기 바랍니다.");
                break;
            case "FILE_RECEIVED":
                console.log("파일이 제대로 등록되었습니다.");
                this.setState({
                    fileAnalysis: "분석중"
                });
                break;
        }
    }
    makeFormData() {
        const formData = new FormData();
        formData.append('fileName', this.state.fileName);
        formData.append('fileData', this.state.fileData);
        return formData;
    }
}


