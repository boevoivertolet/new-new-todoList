import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type TodoFormPropsType = {
    addNewTodo: (title: string) => void
}


export function TodoForm(props: TodoFormPropsType) {

    const [title, setTitle] = useState<string>('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addNewTodo(event.currentTarget.value)
            setTitle('')
        }
    }

    return (
        <div className={'input-field mt2'}>
            <input
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                value={title}
                type={'text'}
                id={'title'}
                placeholder={'please do'}

            />
            <label htmlFor="title" className={'active'}>
                please do
            </label>
        </div>

    )
}
