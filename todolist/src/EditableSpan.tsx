import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    создаём лок стейет для активации инпута
    const [editMode, setEditMode] = useState(false)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// создаём стейт для изменения тайтла
    const [title, setTitle] = useState('')
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Функция включает инпут
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// функция выключает инпут
    const ActivateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Функция считывает значение с инпута и помещает его в стейт. Меняет Тайтл
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return editMode
        ? <input
            value={title}// значение инпута
            onBlur={ActivateViewMode} //выключение инпута при нажатии кнопки мыши вне его поля
            autoFocus// Автоматически активируе ввод на инпуте
            onChange={onChangeTitleHandler}//обработчик события на инпуте

        />

        : <span
            onDoubleClick={activateEditMode}


        >{props.title}</span>
}