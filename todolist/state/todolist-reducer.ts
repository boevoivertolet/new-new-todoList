import {FilterValuesType, TodolistType} from '../src/App';
import {v1} from 'uuid';

export const TodoListReducer = (state: TodolistType[], action: allACsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case 'ADD-TODOLIST': {

            let newTodolistId = v1()
            let todoList: TodolistType = {
                id: newTodolistId,
                title: action.payload.newTodolistTitle,
                filter: 'all'
            }
            return [todoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id=== action.payload.todolistId2 ? {...el, titie: action.payload.newTodolistTitle }: el) }
        case'CHANGE-TODOLIST-FILTER':{
            return state.map(el=> el.id===action.payload.todolistId2 ? {...el, filter: action.payload.newFilter} : el)
        }
        default:
            return state
    }
}
type allACsType = removeTodoListACType | addTodoListACType | changeTodoListTitleACType | changeFilterACType
type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodoListAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const
}

export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle}

    } as const
}

export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
  return{
      type: 'CHANGE-TODOLIST-TITLE',
      payload:{todolistId2, newTodolistTitle}
    }as const

}

export const changeFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
  return{
      type:'CHANGE-TODOLIST-FILTER',
      payload:{
          todolistId2, newFilter
      }
  }as const
}