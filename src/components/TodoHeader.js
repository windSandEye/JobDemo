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

    handleChange(event){
        this.setState({cipVal:event.target.value});
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
                />
            </header>
        )
    }
}