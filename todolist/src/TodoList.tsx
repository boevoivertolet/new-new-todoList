import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
}


export function TodoList(props: TodoListPropsType) {
    const [inputValue, setInputValue] = useState('')
    const inputValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const inputValueOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(inputValue)
            setInputValue('')
        }
    }
    const buttonOnClickAddTask = () => {
        props.addTask(inputValue)
        setInputValue('')

    }
    const buttonOnclickChangeFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={inputValueOnChangeHandler}
                       onKeyPress={inputValueOnKeyPressHandler}/>
                <button onClick={buttonOnClickAddTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                        const buttonRemoveTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={buttonRemoveTaskHandler}>-</button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button onClick={buttonOnclickChangeFilterHandler('all')}>all</button>
                <button onClick={buttonOnclickChangeFilterHandler('completed')}>completed</button>
                <button onClick={buttonOnclickChangeFilterHandler('active')}>active</button>
            </div>
        </div>
    )
}