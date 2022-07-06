import {TasksStateType} from '../AppWithReducer';
import {v1} from 'uuid';
import {addTodoListACType, removeTodoListACType} from './todolists-reducer';


let initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: allTasksACsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        case 'ADD-TASK':/*{
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.payload.InputValue,
                isDone: false
            }
            const tasks = stateCopy[action.payload.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }*/
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.InputValue,
                    isDone: false
                }, ...state[action.payload.todolistId]]

            }
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)

            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.title
                } : t)

            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.todolistId]: []

            }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default:
            return state
    }
}


type allTasksACsType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListACType
    | removeTodoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {id, todolistId}} as const
}

export const addTaskAC = (InputValue: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {InputValue, todolistId}} as const
}

export const changeTaskStatusAC = (todolistId: string, isDone: boolean, id: string) => {
    return {type: 'CHANGE-TASK', payload: {id, isDone, todolistId}} as const
}


export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {id, title, todolistId}} as const
}