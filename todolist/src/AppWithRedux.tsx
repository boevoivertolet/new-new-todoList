import React, {useCallback} from 'react';
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
    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType)=> {
        dispatch(changeFilterAC(todolistID, filter))
    },[dispatch])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const removeTask = useCallback((id: string, todolistId: string)=> {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
    },[dispatch])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addTask = useCallback((InputValue: string, todolistId: string) => {
        dispatch(addTaskAC(InputValue,todolistId))
    },[dispatch])

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTaskTitle = useCallback((tId: string, todolistId: string, newTitle: string)=> {
        dispatch(changeTaskTitleAC(tId, todolistId, newTitle))
    },[dispatch])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTaskStatus = useCallback((todolistId: string, tId: string, isDone: boolean )=> {
        dispatch(changeTaskStatusAC(todolistId, isDone, tId))
    },[dispatch])

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTodoListTitle = useCallback( (id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }, [dispatch])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const removeTodoList = useCallback( (todolistId: string) => {
        let action = removeTodoListAC(todolistId)
        dispatch(action)

    }, [dispatch])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addTodoList=useCallback((inputValue: string)=> {
        let action = addTodolistAC(inputValue)
        dispatch(action)

    }, [dispatch])

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="App">
            <AddItemForm addTItem={addTodoList}/>
            {todoLists.map((tl) => {


                return <TodoList
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}

                    key={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    todolistID={tl.id}

                    tasks={tasks[tl.id]}

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



