import React from 'react';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';
import './../../css/index.css';

export default class TodoApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isCheckAll:false,
            taskList:[
                {
                    status: 'completed',
                    taskName: '删除的任务'
                },
                {
                    status: '',
                    taskName: '任务一'
                }
            ]
        }
    }

    isAllChecked(){//任务是否全部完成
        if(this.state.taskList.every((task)=>task.status=='completed')){
            this.state.isCheckAll = true;
        }else{
            this.state.isCheckAll = false;
        }
        this.setState({taskList:this.state.taskList,isCheckAll:this.state.isCheckAll})
    }
    changeTaskStatus(index,status,isCheckAll=false){//任务状态改变
        if(isCheckAll){//如果是全选状态
            this.setState({
                taskList:this.state.taskList.map((task)=>{
                        task.status='completed';
                        return task;
                }),
                isCheckAll:true
            })
        }else{//非全选状态
            this.state.taskList[index].status = status;
            this.isAllChecked();//渲染是在这一步完成的
        }
    }
    deleteTask(index){//删除任务
        this.state.taskList.splice(index,1);
        this.setState({taskList:this.state.taskList});
    }
    updateTask(index,taskName){//修改任务
        this.state.taskList[index].taskName=taskName;
        this.setState({taskList:this.state.taskList});
    }
    clearCompleteTask(){//清除已完成的任务
        let noDoneTask = this.state.taskList.filter((task)=>task.status == '');
        this.setState({taskList:noDoneTask});
    }
    switchTab(currentTask){//切换tab
        this.setState({taskList:currentTask});
    }

    render(){
        return (
            <section ref="todoapp" id="todoapp" className="todoapp">
                <TodoHeader/>
                <TodoMain isCheckAll={this.state.isCheckAll}
                          taskList={this.state.taskList}
                          changeTaskStatus={this.changeTaskStatus.bind(this)}
                          deleteTask={this.deleteTask.bind(this)}
                          updateTask={this.deleteTask.bind(this)}
                />
                <TodoFooter  taskList={this.state.taskList}
                             clearCompleteTask={this.clearCompleteTask.bind(this)}
                             switchTab={this.switchTab.bind(this)}
                />
            </section>
        )
    }
}