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
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, inputValue: string) => void
    changeTaskStatus: (todolistId: string, tId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    removeTodoList: (todolistId: string) => void
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
            props.addTask(props.todolistID, inputValue)
            setInputValue('')
        }
    }
    const buttonOnClickAddTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(props.todolistID, inputValue.trim())
            setInputValue('')
        } else {
            setError('Error')
        }


    }

    const buttonOnclickChangeFilterHandler = (todolistID: string, filter: FilterValuesType) => () => props.changeFilter(props.todolistID, filter)

    const buttonRemoveTodoListHandler = () => {
        props.removeTodoList(props.todolistID)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={buttonRemoveTodoListHandler}>-</button>
            </h3>

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
                            props.changeTaskStatus(props.todolistID, t.id, event.currentTarget.checked)
                        }
                        const buttonRemoveTaskHandler = () => {
                            props.removeTask(t.id, props.todolistID)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
                        onClick={buttonOnclickChangeFilterHandler(props.todolistID, 'all')}>all
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler(props.todolistID, 'completed')}>completed
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler(props.todolistID, 'active')}>active
                </button>
            </div>
        </div>
    )
}