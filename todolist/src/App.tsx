import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(inputValue: string) {
        let newTask = {id: v1(), title: inputValue, isDone: false}
        let newArrayTasks = [newTask, ...tasks]
        setTasks(newArrayTasks)
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

    function changeTaskStatus(tId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === tId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }



    return (
        <div className="App">
            <TodoList
                title={'What To learn'}
                tasks={tasksForTodoList}
                filter={filter}

                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
            />

        </div>
    );
}

export default App;

