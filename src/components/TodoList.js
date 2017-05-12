import React from 'react';

export default class TodoList extends React.Component{

    //多选框选中操作
    handleChecked(index){
        let currentList = this.props.taskList;
        if(currentList[index].status =='completed'){
            this.props.changeTaskStatus(index,'')
        }else{
            this.props.changeTaskStatus(index,'completed')
        }
    }

    //编辑文本框值改变操作
    handleChange(index,event){
        this.props.updateTask(index,event.target.value)
    }

    //删除该任务
    handleDestroy(index){
        this.props.deleteTask(index)
    }

    render(){
        return (
            <ul id="todo-list" className="todo-list">
                {
                    this.props.taskList.map((item,index) => {
                        return (
                            <li key={index} className={item.status}>
                                <div className="view">
                                    <input className="toggle"
                                           type="checkbox"
                                           checked={item.status=='completed'?true:false}
                                           onChange={this.handleChecked.bind(this,index)}
                                    />
                                     <label>{item.taskName}</label>
                                    <button className="destroy" onClick={this.handleDestroy.bind(this,index)}></button>
                                </div>
                                <input className="edit" value={item.taskName} onChange={this.handleChange.bind(this,index)}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}