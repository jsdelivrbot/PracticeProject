import React, {Component} from 'react';
import FileItemInfo from './FileItemInfo';
import FileItemResult from './FileItemResult';

const clearFix = {
    clear: 'both',
    content: '""',
    overFlow: 'hidden'
}

export default class FileItem extends Component {
    render() {
        return (
            <div>
                <FileItemInfo></FileItemInfo>
                <FileItemResult></FileItemResult>
                <div style={clearFix}></div>
            </div>
        );
    }
}
