import React from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';

function App() {

    let task1: Array<TasksType> = [
        {id:1, title:'CSS&HTML', isDone: true},
        {id:2, title: 'HTML', isDone: true},
        {id:3, title: 'React', isDone: false}
    ]
    let task2: Array<TasksType> = [
        {id:4, title:'Terminator', isDone: true},
        {id:5, title: 'XXX', isDone: false},
        {id:6, title: 'Transformers', isDone: false}
    ]


    return (
        <div className="App">
            <TodoList title={'What To learn'} tasks={task1}/>
            <TodoList title={'Movies'} tasks={task2}/>
        </div>
    );
}

export default App;

