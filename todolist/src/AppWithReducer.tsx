import React, {useReducer} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {addTodolistAC, changeFilterAC, removeTodoListAC, todolistsReducer} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithReducer() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeFilter(todolistID: string, filter: FilterValuesType) {
        dispatchTodoLists(changeFilterAC(todolistID,filter))
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatchTasks(action)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTask(todolistId: string, title: string) {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskTitle(tId: string, todolistId: string, newTitle: string) {
        dispatchTasks(changeTaskTitleAC(tId,todolistId,newTitle))
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskStatus(todolistId: string, tId: string, isDone: boolean) {
        dispatchTasks(changeTaskStatusAC(todolistId,isDone,tId))
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTodoListTitle = (id: string, title: string,todolistId: string) => {
        dispatchTasks(changeTaskTitleAC(id,title,todolistId))
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const removeTodoList = (todolistId: string) => {
        let action = removeTodoListAC(todolistId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodoList(inputValue: string) {
        let action = addTodolistAC(inputValue)
       dispatchTodoLists(action)
        dispatchTasks(action)
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



