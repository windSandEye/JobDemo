import React from 'react';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';
import './../../css/index.css';

export default class TodoApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isClear:true,//是否显示清除已完成任务按钮
            isCheckAll:false,//是否全选或全不选
            taskList:[
                {
                    taskId:"123",
                    status: 'completed',
                    taskName: '删除的任务'
                },
                {
                    taskId:"1234",
                    status: '',
                    taskName: '任务一'
                }
            ],
            tabIndex:0 //切换tab标识，0表示显示全部，1表示显示已完成，2表示未完成
        }
    }

    componentWillMount(){//初始化是否全选，是否显示清除任务按钮
        if(this.state.taskList.every((task)=>task.status=='completed')){
            this.state.isCheckAll = true;
        }else{
            this.state.isCheckAll = false;
        }
        if(this.state.taskList.every((task)=>task.status=='')){
            this.state.isClear = false;
        }else{
            this.state.isClear = true;
        }

        this.setState({isCheckAll:this.state.isCheckAll,isClear:this.state.isClear})
    }

    isAllChecked(){//任务是否全部完成
        if(this.state.taskList.every((task)=>task.status=='completed')){
            this.state.isCheckAll = true;
        }else{
            this.state.isCheckAll = false;
        }
        if(this.state.taskList.every((task)=>task.status=='')){
            this.state.isClear = false;
        }else{
            this.state.isClear = true;
        }
        this.setState({taskList:this.state.taskList,isCheckAll:this.state.isCheckAll,isClear:this.state.isClear})
    }
    changeTaskStatus(taskId,status,isCheckAll=false){//任务状态改变
        if(isCheckAll){//如果是全选状态
            this.setState({
                taskList:this.state.taskList.map((task)=>{
                        task.status='completed';
                        return task;
                }),
                isCheckAll:true,
                isClear:true
            })
        }else{//非全选状态
            this.state.taskList =  this.state.taskList.map((task,index)=>{
                if(task.taskId == taskId){
                    task.status = status;
                }
                return task;
            })
            this.isAllChecked();//渲染是在这一步完成的
        }
    }
    deleteTask(taskId){//删除任务
        this.state.taskList =  this.state.taskList.filter((task)=>task.taskId != taskId)
        this.setState({taskList:this.state.taskList});
    }
    updateTask(taskId,taskName){//修改任务
       this.state.taskList =  this.state.taskList.map((task,index)=>{
                if(task.taskId == taskId){
                    task.taskName = taskName;
                }
                return task;
        })
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
         this.setState({taskList:taskList,isCheckAll:false,isClear:false});
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
                          updateTask={this.updateTask.bind(this)}
                          resetStatus={this.resetStatus.bind(this)}
                />
                <TodoFooter  clearCompleteTask={this.clearCompleteTask.bind(this)}
                             switchTab={this.switchTab.bind(this)}
                             taskCount={taskCount}
                             isCheckAll={this.state.isCheckAll}
                             isClear={this.state.isClear}
                />
            </section>
        )
    }
}