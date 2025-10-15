import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import TextareaAutosize from 'react-textarea-autosize';
import type { TypeCreateTaskFormProps, Task as TaskType } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';
import './createTaskForm.scss'

const CreateTaskForm = ({ createTask, closeForm }: TypeCreateTaskFormProps) => {
    const [name, setName] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [error, setError] = useState<string>('')

    const formRef = useRef<HTMLFormElement>(null)

    const date: Date = new Date()
    const today = date.toISOString().split('T')[0]

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            setError('У задачи должно быть название')
            return;
        }

        const id: string = uuidv4();
        const data: TaskType = { id: id, name, content, deadline, status: 'active' }
        createTask(data)
        closeForm(false)
    }

    useEffect(() => {
        const formattedDate = date.toISOString().split("T")[0];
        setDeadline(formattedDate)

        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                closeForm(false)
            }
        };

        const timeout = setTimeout(() => {
            document.body.addEventListener('click', handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timeout);
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [])

    useEffect(() => {
        setError('')
    }, [name])

    const root = document.querySelector('#root') as HTMLElement | null;;
    if (!root) return null;

    return createPortal(
        <div className="create-task-form__wrapper">
            <form className="create-task-form" ref={formRef} onSubmit={(e) => onSubmitForm(e)} >
                <input id="name" type="text"
                    value={name}
                    placeholder="Покормить собаку"
                    onChange={(e) => { setName(e.target.value) }}
                />
                <TextareaAutosize id="content"
                    value={content}
                    placeholder="Собака любит корм с кроликом. Сосиски не предлагать."
                    onChange={(e) => setContent(e.target.value)}
                />
                <label htmlFor="deadline">Дедлайн</label>
                <input id="deadline" type="date" min={today}
                    max='2099-01-01'
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <div className="error">{error}</div>
                <button type="submit">Сохранить</button>
            </form>
        </div >
        , root)
}

export default CreateTaskForm