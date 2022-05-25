import React from 'react';
import {newTodoType} from '../App';

type TodoListPropsType = {
    todos: newTodoType[]
    removeTodo: (id: number) => void
    toggleTodo(id: number): void
}

export function TodoList(props: TodoListPropsType) {
    return (
        <ul>
            {
                props.todos.map(td => {
                    const classes = ['todo']
                    if (td.completed) {
                        classes.push('completed')
                    }
                    return (
                        <li className={classes.join(' ')} key={td.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={td.completed}
                                    onChange={props.toggleTodo.bind(null, td.id)}
                                />
                                <span>{td.title}</span>
                                <i className={'material-icons red-text'} onClick={() => {
                                    props.removeTodo(td.id)
                                }}>delete</i>
                            </label>
                        </li>
                    )
                })
            }

        </ul>
    )
}