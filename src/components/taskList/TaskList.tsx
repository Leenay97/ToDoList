import { useEffect, useState, useMemo } from "react";
import TaskFilter from "../taskFilter/TaskFilter";
import CreateTaskForm from "../createTaskForm/CreateTaskForm";
import Task from "../task/Task";
import './taskList.scss'

import type { Task as TaskType, Option } from '../../types/types';


const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        const saved = localStorage.getItem('task-list');
        return saved ? JSON.parse(saved) : [];
    });

    const [option, setOption] = useState<Option>('active')
    const [createForm, setCreateForm] = useState<boolean>(false)
    const [counterText, setCounterText] = useState<string>('')

    const filteredTasks = useMemo(() => {
        switch (option) {
            case 'active':
                return tasks.filter(item => item.status === 'active');
            case 'completed':
                return tasks.filter(item => item.status === 'completed');
            default:
                return tasks;
        }
    }, [option, tasks]);


    const createTask = (data: TaskType) => {
        setTasks(prev => [...prev, data])
    }

    const completeTask = (e: React.ChangeEvent, id: string, status: boolean) => {
        e.stopPropagation();
        let newStatus: 'active' | 'completed';
        if (status) {
            newStatus = 'completed'
        } else {
            newStatus = 'active'
        }
        const newTasks: TaskType[] = tasks.map(item => {
            if (item.id === id) {
                return { ...item, status: newStatus }
            } else {
                return item
            }
        })
        setTasks(newTasks);

    }

    const deleteTask = (id: string) => {
        const newTasks: TaskType[] = tasks.filter(item => item.id !== id)
        setTasks(newTasks);
    }

    const editTask = (id: string, name: string, content: string, deadline: string) => {
        const newTasks: TaskType[] = tasks.map(item => {
            if (item.id === id) {
                return { ...item, name, content, deadline }
            } else {
                return item
            }
        })
        setTasks(newTasks);
    }

    const createCounter = () => {
        const number = filteredTasks.length;
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (number === 0) {
            setCounterText('Задач нет');
            return;
        }

        let text = '';

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            text = `Осталось ${number} задач`;
        } else if (lastDigit === 1) {
            text = `Осталась ${number} задача`;
        } else if ([2, 3, 4].includes(lastDigit)) {
            text = `Осталось ${number} задачи`;
        } else {
            text = `Осталось ${number} задач`;
        }

        setCounterText(text);
    };

    useEffect(() => {
        localStorage.setItem('task-list', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        createCounter();
    }, [option, filteredTasks])

    return (
        <>
            <TaskFilter option={option} changeOption={setOption} />
            <div className="task-list__counter">
                {counterText}
            </div>
            {filteredTasks.length ?
                <ul className="task-list">
                    {[...filteredTasks].reverse().map(item =>
                        <Task key={item.id}
                            id={item.id}
                            name={item.name}
                            content={item.content}
                            deadline={item.deadline}
                            status={item.status}
                            onComplete={completeTask}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    )}
                </ul>
                :
                ''}
            <button className="task-list__create-btn" onClick={() => setCreateForm(true)}>Добавить задачу</button>

            {createForm ? <CreateTaskForm createTask={createTask} closeForm={setCreateForm} /> : ''}
        </>
    )
}

export default TaskList