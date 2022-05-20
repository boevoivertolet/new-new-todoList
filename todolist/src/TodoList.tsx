import React from 'react';

export type TasksType ={
    id:number
    title:string
    isDone: boolean
}

type TodoListPropsType={
    title: string
    tasks: Array<TasksType>
}

export function TodoList(props:TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>

            </ul>
            <div>
                <button>all</button>
                <button>completed</button>
                <button>active</button>
            </div>
        </div>
    )
}