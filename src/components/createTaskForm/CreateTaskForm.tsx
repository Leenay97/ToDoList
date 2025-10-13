import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import TextareaAutosize from 'react-textarea-autosize';
import type { TypeCreateTaskFormProps, Task as TaskType } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';
import './createTaskForm.scss'

const CreateTaskForm = ({ createTask, closeForm }: TypeCreateTaskFormProps) => {
    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id: string = uuidv4();
        const data: TaskType = { id: id, name, content, deadline, status: 'active' }
        createTask(data)
        closeForm(false)
    }

    useEffect(() => {
        const date: Date = new Date()
        const formattedDate = date.toISOString().split("T")[0];
        setDeadline(formattedDate)
    }, [])

    const root = document.querySelector('#root');
    if (!root) return null;

    return createPortal(
        <div className="create-task-form__wrapper">
            <form className="create-task-form" onSubmit={(e) => onSubmitForm(e)} >
                <input id="name" type="text"
                    value={name}
                    placeholder="Покормить собаку"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextareaAutosize id="content"
                    value={content}
                    placeholder="Собака любит корм с кроликом, но не любит корм с говядиной. Сосиски тоже не предлагать."
                    onChange={(e) => setContent(e.target.value)}
                />
                <label htmlFor="deadline">Дедлайн</label>
                <input id="deadline" type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">Сохранить</button>
            </form>
        </div >
        , root)
}

export default CreateTaskForm