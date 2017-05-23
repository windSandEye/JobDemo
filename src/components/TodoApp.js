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
            ],
            tabIndex:0
        }
    }

    componentWillMount(){
        if(this.state.taskList.every((task)=>task.status=='completed')){
            this.state.isCheckAll = true;
        }else{
            this.state.isCheckAll = false;
        }
        this.setState({isCheckAll:this.state.isCheckAll})
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
    addTask(task){//新增任务
        this.state.taskList.push(task);
        this.setState({taskList:this.state.taskList});
    }
    clearCompleteTask(){//清除已完成的任务
        let noDoneTask = this.state.taskList.filter((task)=>task.status == '');
        this.setState({taskList:noDoneTask});
    }
    switchTab(index){//切换tab
        this.setState({tabIndex:index});
    }
    resetStatus(){//重置所有任务未未完成
        let taskList = this.state.taskList;
        for(let task of taskList){
            task.status = "";
        }
         this.setState({taskList:taskList,isCheckAll:false});
    }

    render(){
      
        let currentTask = [];
        if(this.state.tabIndex == 0){
            currentTask = this.state.taskList;
        }else if(this.state.tabIndex == 1){
            currentTask = this.state.taskList.filter((task)=>task.status == 'completed')
        }else{
            currentTask = this.state.taskList.filter((task)=>task.status == '')
        }

        let taskCount = currentTask.length || 0;
        return (
            <section ref="todoapp" id="todoapp" className="todoapp">
                <TodoHeader addTask={this.addTask.bind(this)} />
                <TodoMain isCheckAll={this.state.isCheckAll}
                          taskList={currentTask}
                          changeTaskStatus={this.changeTaskStatus.bind(this)}
                          deleteTask={this.deleteTask.bind(this)}
                          updateTask={this.deleteTask.bind(this)}
                          resetStatus={this.resetStatus.bind(this)}
                />
                <TodoFooter  clearCompleteTask={this.clearCompleteTask.bind(this)}
                             switchTab={this.switchTab.bind(this)}
                             taskCount={taskCount}
                />
            </section>
        )
    }
}