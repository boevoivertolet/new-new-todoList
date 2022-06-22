import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    // Отображаем массив с условием. Если Элемент.id строго равен todolistID(который пришёл в функцию),то создаем копию этого элемента, в которой перезаписываем значение filter на то, которое пришло в функцию.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function removeTask(id: string, todolistId: string) {
        /*  let todoListTasks = tasks[todolistId]
          tasks[todolistId] =todoListTasks.filter(task => task.id != id)
          setTasks({...tasks})*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
        //    возвращаем объект, в котором копия всех тасок и те таски, айди которых не равно входящему
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTask(todolistId: string, inputValue: string) {
        let newTask = {id: v1(), title: inputValue, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskTitle(tId: string, todolistId: string, newTitle: string) {
       /* setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === tId ? {...task, newTitle} : task)})*/
        let todolistTasks =tasks[todolistId]
        let task =todolistTasks.find(t => t.id === tId)
        if(task){
            task.title =newTitle;
            setTasks({...tasks})
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeTaskStatus(todolistId: string, tId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === tId ? {...task, isDone} : task)})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const changeTodoListTitle = (id: string, newTitle: string) => {
      const todoList = todoLists.find(tl => tl.id===id);
    if(todoList){
        todoList.title =newTitle;
        setTodoLists([...todoLists])
    }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const removeTodoList = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function addTodoList(inputValue: string) {
        let todoList: TodolistType = {
            id: v1(),
            title: inputValue,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists]);
        setTasks({...tasks , [todoList.id]:[]})
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="App">
            <AddItemForm addTItem={addTodoList}/>
            {todoLists.map((tl) => {
                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                }

                return <TodoList
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}

                    key={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    todolistID={tl.id}

                    tasks={tasksForTodoList}

                    removeTodoList={removeTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                />
            })}


        </div>
    );
}

export default App;

