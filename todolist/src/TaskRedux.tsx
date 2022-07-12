import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from './EditableSpan';
import {TasksType} from './TodoList';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';


type TasPropsType = {
    task: TasksType
    todolistId: string
}


export const TaskRedux = memo( ({task, todolistId}: TasPropsType) => {
    const dispatch = useDispatch()


    const buttonRemoveTaskHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const checkboxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, newIsDoneValue, task.id))
        //todolistId: string, isDone: boolean, id: string
    }
    const inputTitleOnChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
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