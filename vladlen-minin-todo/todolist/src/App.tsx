import React, {useEffect, useState} from 'react';
import {Navbar} from './components/Navbar';
import {TodoForm} from './components/TodoForm';
import {TodoList} from './components/TodoList';

export type newTodoType = {
    title: string
    id: number
    completed: boolean
}


function App() {

    let [todos, setTodos] = useState<newTodoType[]>([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as newTodoType[]
        setTodos(saved)
    }, [])
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])



    const toggleTodo = (id: number) => {
        setTodos(todos.map(td => {
            if (td.id === id) {
                td.completed = !td.completed
            }
            return td
        }))
    }

    const removeTodo = (id: number) => {
        /* const shouldRemove = window.confirm('Are u sure?')
          if (shouldRemove){

          }*/
        setTodos(todos.filter(td => td.id !== id))
    }
    const addNewTodo = (title: string) => {
        const newTodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        setTodos(prev => [newTodo, ...prev])
    }

    return (
        <>
            <Navbar/>
            <div className={'container'}>
                <TodoForm
                    addNewTodo={addNewTodo}
                />
                <TodoList
                    todos={todos}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                />
            </div>
        </>
    );
}

export default App;


