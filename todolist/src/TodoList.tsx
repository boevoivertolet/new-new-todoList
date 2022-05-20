import React from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(id: number)=> void
    changeFilter: (value:FilterValuesType)=> void
}

export function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
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