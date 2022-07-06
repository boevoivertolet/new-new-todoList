import React from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {addTodolistAC, changeFilterAC, removeTodoListAC} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {


    let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeFilter(todolistID: string, filter: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, filter))
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTask(InputValue: string, todolistId: string) {
        dispatch(addTaskAC(InputValue,todolistId))
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskTitle(tId: string, todolistId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(tId, todolistId, newTitle))
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskStatus(todolistId: string, tId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, isDone, tId))
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTodoListTitle = (id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const removeTodoList = (todolistId: string) => {
        let action = removeTodoListAC(todolistId)
        dispatch(action)

    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodoList(inputValue: string) {
        let action = addTodolistAC(inputValue)
        dispatch(action)

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="App">
            <AddItemForm addTItem={addTodoList}/>
            {todoLists.map((tl) => {
                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                }

                return <TodoList
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}

                    key={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    todolistID={tl.id}

                    tasks={tasksForTodoList}

                    removeTodoList={removeTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                />
            })}


        </div>
    );
}



