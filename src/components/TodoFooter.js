import React from 'react';
import ReactDOM from 'react-dom';
import FooterFilter from "./FooterFilter";

export default class TodoFooter extends React.Component{

    render(){
        return (
            <footer id="footer" className="footer">
                <span id="todo-count"
                    className="todo-count">
                    <strong id="totale">{this.props.taskCount}</strong>
                    <span> 项任务</span>
                </span>
                <FooterFilter switchTab={this.props.switchTab.bind(this)} />
                <button ref="clearCompleted" className={this.props.isClear ? "clear-completed" : "hidden"}
                        onClick={this.props.clearCompleteTask.bind(this)}>
                    清除已完成项目
                </button>
            </footer>
        )
    }
}