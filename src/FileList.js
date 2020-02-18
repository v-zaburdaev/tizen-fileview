import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileItem from "./FileItem";
import {KEYS} from "./keys";


export default class FileList extends Component {
    static propTypes = {
        value: PropTypes.array.isRequired,
        onDirectoryChange: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        this.state={
            selected:0
        }
    }

    componentWillReceiveProps(newprops){
        this.setState({selected: 0});
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeys);
    }

    handleKeys = (e)=>{
        if (!e) return;
        const code = e.keyCode;
        if (code === KEYS.ArrowDown || code === KEYS.ArrowRight) {
            let selected=this.state.selected+1;
            if(selected>=this.props.value.length) selected=this.props.value.length-1;
            this.setState({selected: selected});
            
          }
          if (code === KEYS.ArrowUp || code === KEYS.ArrowLeft) {
            let selected=this.state.selected-1;
            if(selected<0) selected=0;
            this.setState({selected: selected});
            
          }
          if(code === KEYS.Enter){
            e.stopPropagation();
            e.preventDefault();
            let current = this.props.value[this.state.selected];
            if(current.isDirectory) this.props.onDirectoryChange(current);
            if(current.isFile) this.props.showFile(current);
          }
          if(code===KEYS.ColorF0Red){
            let current = this.props.value[this.state.selected];
            if(current.isFile) this.props.uploadFile(current);
          }
    }

    render() {
        return (
            <div className="filelist">
                {this.props.value.map((f, idx)=>{
                    return <FileItem value={f} selected={this.state.selected} idx={idx} />;
                })}
            </div>
        )
    }
}
