import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';

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


    const buttonOnclickChangeFilterHandler = (todolistID: string, filter: FilterValuesType) => () => props.changeFilter(props.todolistID, filter)

    const buttonRemoveTodoListHandler = () => {
        props.removeTodoList(props.todolistID)
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// создаём обёртку, в которую приходит AddTask и эту обертку уже передаем в AddItemForm
    const addTask = (inputValue: string) => {
        props.addTask(props.todolistID, inputValue);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={buttonRemoveTodoListHandler}>-</button>
            </h3>

            <AddItemForm addTItem={addTask}/>
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
                            <EditableSpan title={t.title}/>
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

type EditableSpanPropsType = {
    title: string
}

function EditableSpan(props: EditableSpanPropsType) {
    return <span>{props.title}</span>
}