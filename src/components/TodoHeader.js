import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headerTitle:'todos',
            cipId:'',
            cipVal:''
        }
    }

    guid() {//生成uuid
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    handleChange(event){
        this.setState({cipVal:event.target.value});
    }
    

    handleEnter(event){//回撤新增任务
        if(event.keyCode == 13 && this.state.cipVal !=""){
            let task = {
                taskId:this.guid(),
                status: '',
                taskName: this.state.cipVal
            }
            this.props.addTask(task)
            this.setState({cipVal:'',cipId:task.taskId});
        }
    }

    render(){
        return (
            <header ref="header" id="header">
                <h1>{this.state.headerTitle}</h1>
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       data-cip-id={this.state.cipId}
                       value={this.state.cipVal}
                       onChange={this.handleChange.bind(this)}
                       onKeyDown={this.handleEnter.bind(this)}
                />
            </header>
        )
    }
}