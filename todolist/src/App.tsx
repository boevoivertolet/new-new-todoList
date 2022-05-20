import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <TodoList
                title={'What To learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;

