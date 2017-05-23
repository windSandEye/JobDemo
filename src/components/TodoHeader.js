import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headerTitle:'todos',
            cipId:'cIPJQ342845639',
            cipVal:''
        }
    }

    static defaultPropsType = {
         cipVal: React.PropTypes.string.isRequired
    }

    handleChange(event){
        this.setState({cipVal:event.target.value});
    }
    

    handleEnter(event){
        if(event.keyCode == 13){
            let task = {
                status: '',
                taskName: this.state.cipVal
            }
            this.props.addTask(task)
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