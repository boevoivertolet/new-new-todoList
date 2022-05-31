import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addTask: (todolistId: string, inputValue: string) => void
    todolistID: string
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const inputValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const inputValueOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            props.addTask(props.todolistID, inputValue)
            setInputValue('')
        }
    }
    const buttonOnClickAddTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(props.todolistID, inputValue.trim())
            setInputValue('')
        } else {
            setError('Error')
        }
    }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={inputValue}
                onChange={inputValueOnChangeHandler}
                onKeyPress={inputValueOnKeyPressHandler}/>
            <button onClick={buttonOnClickAddTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}