import React from 'react';

export default class TodoList extends React.Component {

    //多选框选中操作
    handleChecked(index) {
        let currentList = this.props.taskList;
        if (currentList[index].status == 'completed') {
            this.props.changeTaskStatus(index, '')
        } else {
            this.props.changeTaskStatus(index, 'completed')
        }
    }

    //编辑文本框值改变操作
    handleChange(index, event) {
        this.props.updateTask(index, event.target.value)
    }

    //删除该任务
    handleDestroy(index) {
        this.props.deleteTask(index)
    }
    openEdit(index, event) {//变为编辑状态
        let currentList = this.props.taskList;
        for(let task of currentList){//先将所有编辑框取消，因为双击不触发失去焦点事件
            this.refs[task.taskId].className = task.status;
        }
        let currentClassName = this.refs[currentList[index].taskId].className;
        this.refs[currentList[index].taskId].className += " editing";
    }
    closeEdit(index, event) {//回撤取消编辑状态
        let currentList = this.props.taskList;
        if (event.keyCode == 13) {
            if (currentList[index].taskName != "") {
                this.refs[currentList[index].taskId].className = currentList[index].status;
            } else {
                this.props.deleteTask(index);
            }
        }
    }
    closeEditBlur(index) {//失去焦点取消编辑状态
        let currentList = this.props.taskList;
        if (currentList[index].taskName != "") {
            this.refs[currentList[index].taskId].className = currentList[index].status;
        } else {
            this.props.deleteTask(index);
        }

    }

    render() {
        return (
            <ul id="todo-list" className="todo-list">
                {
                    this.props.taskList.map((item, index) => {
                        return (
                            <li key={index} className={item.status} onDoubleClick={this.openEdit.bind(this, index)} ref={item.taskId}>
                                <div className="view">
                                    <input className="toggle"
                                        type="checkbox"
                                        checked={item.status == 'completed' ? true : false}
                                        onChange={this.handleChecked.bind(this, index)}
                                    />
                                    <label>{item.taskName}</label>
                                    <button className="destroy" onClick={this.handleDestroy.bind(this, index)}></button>
                                </div>
                                <input className="edit" value={item.taskName} ref={item.taskId + "-1"}
                                    placeholder="请输入任务名称"
                                    onChange={this.handleChange.bind(this, index)}
                                    onKeyDown={this.closeEdit.bind(this, index)}
                                    onBlur={this.closeEditBlur.bind(this,index)}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}