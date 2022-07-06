import {FilterValuesType, TasksStateType, TodolistType} from '../AppWithReducer';
import {v1} from 'uuid';



let initialState: TodolistType[] =[]


export const todolistsReducer = (state= initialState, action: allACsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {

        /*    let newTodolistId = v1()
            let todoList: TodolistType = {
                id: newTodolistId,
                title: action.payload.newTodolistTitle,
                filter: 'all'
            }
            return [todoList, ...state]*/
            return [...state,{id:action.payload.todolistId ,title: action.payload.newTodolistTitle,filter:'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id=== action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle }: el) }
        case'CHANGE-TODOLIST-FILTER':{
            return state.map(el=> el.id===action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}
type allACsType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeFilterACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodolistAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1()}

    } as const
}

export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
  return{
      type: 'CHANGE-TODOLIST-TITLE',
      payload:{todolistId2, newTodolistTitle}
    }as const

}

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return{
      type:'CHANGE-TODOLIST-FILTER',
      payload:{
          todolistId, filter
      }
  }as const
}