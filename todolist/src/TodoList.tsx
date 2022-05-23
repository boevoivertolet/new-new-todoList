import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}


export function TodoList(props: TodoListPropsType) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)


    const inputValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const inputValueOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addTask(inputValue)
            setInputValue('')
        }
    }
    const buttonOnClickAddTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError('Error')
        }


    }
    const buttonOnclickChangeFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={inputValue}
                    onChange={inputValueOnChangeHandler}
                    onKeyPress={inputValueOnKeyPressHandler}/>
                <button onClick={buttonOnClickAddTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                        const checkboxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked)
                        }
                        const buttonRemoveTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id} className={t.isDone ?'is-done': ''}>
                            <input
                                onChange={checkboxOnChangeHandler}
                                type="checkbox"
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={buttonRemoveTaskHandler}>-</button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler('all')}>all
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler('completed')}>completed
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler('active')}>active
                </button>
            </div>
        </div>
    )
}