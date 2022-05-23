import React, {useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(id: string)=> void
    changeFilter: (value:FilterValuesType)=> void
    addTask: (inputValue:string)=> void
}

export function TodoList(props: TodoListPropsType) {
    const[inputValue , setInputValue] =useState('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange={(event)=> {
                     setInputValue(event.currentTarget.value)}}/>
                <button onClick={()=> {props.addTask(inputValue)}}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={()=> {props.removeTask(t.id)}}>-</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>all</button>
                <button onClick={()=>{props.changeFilter('completed')}}>completed</button>
                <button onClick={()=>{props.changeFilter('active')}}>active</button>

            </div>
        </div>
    )
}