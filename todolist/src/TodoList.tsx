import React, {useCallback, useMemo} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {TaskRedux} from './TaskRedux';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (inputValue: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, tId: string, status: boolean,) => void
    changeTaskTitle: (tId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    todolistID: string
    removeTodoList: (todolistId: string) => void
}


export const TodoList = React.memo(({
                                        title,
                                        tasks,

                                        changeTodoListTitle,
                                        changeFilter,
                                        addTask,
                                       /* changeTaskStatus,
                                        changeTaskTitle,*/
                                        filter,
                                        todolistID,
                                        removeTodoList
                                    }: TodoListPropsType) => {
    console.log('TodoList')


    const buttonOnclickChangeFilterHandler = (todolistID: string, filter: FilterValuesType) => () => changeFilter(todolistID, filter)
    const buttonRemoveTodoListHandler = () => {
        removeTodoList(todolistID)
    }
    const buttonChangeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(todolistID, newTitle, title)
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// создаём обёртку, в которую приходит AddTask и эту обертку уже передаем в AddItemForm
    const addTask1 = useCallback((inputValue: string) => {
        addTask(inputValue, todolistID);
    }, [todolistID, addTask])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let tasksForTodoList = tasks

    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
 /*   const removeTask1 = useCallback((taskId: string) => removeTask(taskId, todolistID), [removeTask, todolistID])
    const changeTaskStatus1 = useCallback((taskId: string, status: boolean) => {
        changeTaskStatus(todolistID, taskId, status)
    }, [changeTaskStatus, todolistID])
    const changeTaskTitle1 = useCallback((taskId: string, newValue: string) => {
        changeTaskTitle(taskId, newValue, todolistID)
    }, [changeTaskTitle, todolistID])
*/

    const tasksUseMemo = useMemo(()=> {
        return tasksForTodoList.map(t => {

                return <TaskRedux
                    key={t.id}
                    task={t}
                    todolistId={todolistID}
                />
            })
    },[tasks, filter])

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={buttonChangeTodoListTitleHandler}/>
                <button onClick={buttonRemoveTodoListHandler}>-</button>
            </h3>

            <AddItemForm addTItem={addTask1}/>
            <div>
                {tasksUseMemo}
            </div>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler(todolistID, 'all')}>all
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler(todolistID, 'completed')}>completed
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={buttonOnclickChangeFilterHandler(todolistID, 'active')}>active
                </button>
            </div>
        </div>
    )
})

