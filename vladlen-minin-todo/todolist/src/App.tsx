import React, {useState} from 'react';
import {Navbar} from './components/Navbar';
import {TodoForm} from './components/TodoForm';
import {TodoList} from './components/TodoList';

export type newTodoType = {
    title: string
    id: number
    completed: boolean
}


function App() {

    const [todos, setTodos] = useState<newTodoType[]>([])

    const removeTodo = (id: number) => {
        setTodos(prev => prev.filter(td=> td.id !== id))

    }
    const toggleTodo = (id: number) => {
        setTodos(prev => prev.map(td => {
            if (td.id === id) {
                td.completed = !td.completed
            }
            return td
        }))
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


