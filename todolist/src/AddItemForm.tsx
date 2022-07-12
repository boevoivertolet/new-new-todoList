import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addTItem: (inputValue: string) => void
}

export const AddItemForm =React.memo((props: AddItemFormPropsType) => {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Перенесено из TodoList.tsx. Универсальная компонента, которая будет работать в Todolist и в App

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const inputValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const inputValueOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
       if(error) setError(null)
        if (event.charCode === 13) {
            addTask();
            setInputValue('')
        }
    }
    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTItem( inputValue.trim())
            setInputValue('')
        } else {
            setError('Error')
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={inputValue}
                onChange={inputValueOnChangeHandler}
                onKeyPress={inputValueOnKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
})