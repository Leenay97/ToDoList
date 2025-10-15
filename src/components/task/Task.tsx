import type { TaskProps } from "../../types/types"
import { useState } from "react";
import './task.scss'
import TextareaAutosize from 'react-textarea-autosize';



const Task = ({ id, name, content, deadline, status, onComplete, onDelete, onEdit }: TaskProps) => {

    const formattedDeadline = deadline.split('-').reverse().join('.')

    const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);
    const [editContent, setEditContent] = useState<string>(content);
    const [editDeadline, setEditDeadline] = useState<string>(deadline);

    const date: Date = new Date()
    const today = date.toISOString().split('T')[0]

    const handleToggleContent = (e: React.MouseEvent<HTMLDivElement>) => {

        const target = e.target as HTMLElement;

        if (
            target.closest('.task__complete') ||
            target.closest('.task__complete-btn') ||
            target.closest('.task__edit-btn')
        ) {
            return;
        }
        setIsContentOpen(prev => !prev)
    }

    const handleEditSubmit = () => {
        onEdit(id, editName, editContent, editDeadline);
        setIsEditMode(false);
    }

    const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
        onComplete(e, id, e.target.checked);
    };

    const handleEditClick = () => setIsEditMode(true);
    const handleDeleteClick = () => onDelete(id);

    if (isEditMode) {
        return (
            <form className="task" onSubmit={handleEditSubmit}>
                <input className="task__name" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <TextareaAutosize className="task__content open" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <input className="task__deadline" type="date" value={editDeadline} min={today} max='2099-01-01' onChange={(e) => setEditDeadline(e.target.value)} />
                <div className="task__buttons">
                    <button className="task__complete-btn" type="submit"></button>
                </div>
            </form>
        )
    }
    return (
        <div className={`task ${status === 'completed' ? 'completed' : ''}`} onClick={(e) => handleToggleContent(e)}>
            <div className="task__name">{name}</div>
            <div className={`task__content ${isContentOpen ? 'open' : ''}`}>{content}</div>
            <div className="task__deadline">До {formattedDeadline}</div>
            <div className="task__buttons">
                <input type="checkbox" className={`task__complete ${status === 'completed' ? 'completed' : ''}`}
                    onChange={handleComplete} checked={status === 'active' ? false : true} />
                {status === 'active' ?

                    <button className={`task__edit-btn ${isContentOpen ? 'active' : ''}`} onClick={handleEditClick}></button>
                    :
                    <button className={`task__delete-btn ${isContentOpen ? 'active' : ''}`} onClick={handleDeleteClick}></button>
                }
            </div>
        </div >
    )
}

export default Task