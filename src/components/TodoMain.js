import React from 'react';
import TodoList from './TodoList';

export default class TodoMain extends React.Component{
    handleToggleAll(){
        let checkState = this.props.isCheckAll;
        if(!checkState){
            this.props.changeTaskStatus(null,null,true);
        }else{
            this.props.resetStatus();
        }
    }

    render(){
        return (
            <section ref="main" id="main" className="main">
                <input id="toggle-all"
                       className="toggle-all"
                       type="checkbox"
                       checked={this.props.isCheckAll}
                       onChange={this.handleToggleAll.bind(this)}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoList taskList={this.props.taskList}
                          changeTaskStatus={this.props.changeTaskStatus.bind(this)}
                          updateTask={this.props.updateTask.bind(this)}
                          deleteTask={this.props.deleteTask.bind(this)}
                />
            </section>
        )
    }
}