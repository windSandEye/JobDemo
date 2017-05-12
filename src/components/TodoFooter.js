import React from 'react';
import FooterFilter from "./FooterFilter";

export default class TodoFooter extends React.Component{
    constructor(props){
        super(props)
        this.state = {//注意：这里初始化的数据是没有被同步的，也就是说，界面的修改并没有影响这里的数据，实际应用中应该从后台获取实时数据。
            allTask : props.taskList,
            doneTask:props.taskList.filter((task)=>task.status=='completed'),
            noDoneTask:props.taskList.filter((task)=>task.status==''),
            currentTask:props.taskList
        }
    }

    render(){
        let taskCount = this.state.currentTask.length||0;
        return (
            <footer id="footer" className="footer">
                <span id="todo-count"
                    className="todo-count">
                    <strong id="totale">{taskCount}</strong>
                    <span> 项任务</span>
                </span>
                <FooterFilter switchTab={this.props.switchTab.bind(this)}
                              allTask={this.state.allTask}
                              doneTask={this.state.doneTask}
                              noDoneTask={this.state.noDoneTask}
                />
                <button id="clear-completed" className="clear-completed"
                        onClick={this.props.clearCompleteTask.bind(this)}>
                    清除已完成项目
                </button>
            </footer>
        )
    }
}