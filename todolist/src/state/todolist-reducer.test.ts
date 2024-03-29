import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './todolists-reducer';
let todolistId1 : string
let todolistId2 : string
let startState: Array<TodolistType>


beforeEach(()=>{
     todolistId1 =v1()
     todolistId2 =v1()

     startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

})

test.skip('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test.skip('correct todolist should be added', () => {


    let newTodolistTitle = 'New Todolist'



    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test.skip('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'



    const endState = todolistsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test.skip('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'
    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))


        expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
