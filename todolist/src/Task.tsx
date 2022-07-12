import React, {ChangeEvent} from 'react';
import {EditableSpan} from './EditableSpan';
import {TasksType} from './TodoList';


type TasPropsType = {
    task: TasksType
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, status: boolean) => void
    changeTaskTitle:(id: string, title: string)=> void
}


export const Task =React.memo( ({task, removeTask, changeTaskStatus,changeTaskTitle}: TasPropsType) => {

    const inputTitleOnChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id,  newValue)
    }
    const checkboxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue)
    }


    const buttonRemoveTaskHandler = () => {
        removeTask(task.id)
    }


    return (
        <div>
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                    onChange={checkboxOnChangeHandler}
                    type="checkbox"
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} onChange={inputTitleOnChangeHandler}/>
                <button onClick={buttonRemoveTaskHandler}>-</button>
            </li>
        </div>
    )
})