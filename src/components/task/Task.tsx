import type { Task as TaskType } from "../../types/types"
import { useState } from "react";
import './task.scss'

type TaskProps = Omit<TaskType, 'id'>;

const Task = ({ name, content, deadline, status }: TaskProps) => {
    const [contentOpen, setContentOpen] = useState<boolean>(false)

    const formattedDeadline = deadline.split('-').reverse().join('.')
    return (
        <div className="task" onClick={() => setContentOpen(prev => !prev)}>
            <div className="task__name">{name}</div>
            <div className={`task__content ${contentOpen ? 'open' : ''}`}>{content}</div>
            <div className="task__deadline">До {formattedDeadline}</div>
            <div className="task__buttons">
                <button className={`task__complete-btn ${contentOpen ? 'active' : ''}`} onClick={() => setContentOpen(prev => !prev)}></button>
                <button className={`task__edit-btn ${contentOpen ? 'active' : ''}`} onClick={() => setContentOpen(prev => !prev)}></button>
            </div>
            {/* <TaskMenu /> */}

        </div>
    )
}

const TaskMenu = () => {
    return (
        <ul className="task__menu">
            <li>Выполнено</li>
            <li>Изменить</li>
            <li>Удалить</li>
        </ul>
    )
}

export default Task