import React from 'react';
import ReactDOM from 'react-dom';

export default class FooterFilter extends React.Component{
    switchTab(index){
        let currentTask = this.props.allTask;
        if(index == 0){
            ReactDOM.findDOMNode(this.refs.all).className='selected';
            ReactDOM.findDOMNode(this.refs.active).className='';
            ReactDOM.findDOMNode(this.refs.completed).className='';
            currentTask = this.props.allTask;

        }else if(index == 1){
            ReactDOM.findDOMNode(this.refs.all).className='';
            ReactDOM.findDOMNode(this.refs.active).className='selected';
            ReactDOM.findDOMNode(this.refs.completed).className='';
            currentTask = this.props.doneTask;
        }else if(index == 2){
            ReactDOM.findDOMNode(this.refs.all).className='';
            ReactDOM.findDOMNode(this.refs.active).className='';
            ReactDOM.findDOMNode(this.refs.completed).className='selected';
            currentTask = this.props.noDoneTask;
        }
        this.props.switchTab(currentTask)
    }
    render(){
        return (
            <ul id="filters" className="filters">
                <li>
                    <a className="selected"
                       href="javascript:void(0)"
                       id="all" ref="all"
                       onClick={this.switchTab.bind(this,0)}>显示全部</a>
                </li>
                <li>
                    <a className=""
                       href="javascript:void(0)"
                       id="active" ref="active"
                       onClick={this.switchTab.bind(this,1)}>未完成</a>
                </li>
                <li><a className=""
                       href="javascript:void(0)"
                       id="completed" ref="completed"
                       onClick={this.switchTab.bind(this,2)}>已完成</a>
                </li>
            </ul>
        )
    }
}