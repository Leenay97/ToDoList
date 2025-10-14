import React, { type ChangeEvent } from "react";
import { useEffect, useState } from "react";
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

    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [option, setOption] = useState<Option>('active')
    const [createForm, setCreateForm] = useState<boolean>(false)

    const getTasks = () => {
        const initialTasks: string | null = localStorage.getItem('task-list');

        if (initialTasks) {
            const initialTasksArray: TaskType[] = JSON.parse(initialTasks)
            setTasks(initialTasksArray)
        }
    }

    const filterTasks = () => {
        let filter: TaskType[];
        switch (option) {
            case 'active':
                filter = tasks.filter(item => item.status === 'active');
                setFilteredTasks(filter)
                break;
            case 'completed':
                filter = tasks.filter(item => item.status === 'completed');
                setFilteredTasks(filter)
                break;
            case 'all':
                setFilteredTasks(tasks)
                break;

        }
    }

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

    useEffect(() => {
        getTasks();
    }, [])

    useEffect(() => {
        localStorage.setItem('task-list', JSON.stringify(tasks))



    }, [tasks])

    useEffect(() => {
        filterTasks();
    }, [option, tasks])

    return (
        <>
            <TaskFilter option={option} changeOption={setOption} />
            <div className="task-list__counter">
                Всего задач {filteredTasks.length}
            </div>
            {filteredTasks.length ?
                <ul className="task-list">
                    {filteredTasks.map(item =>
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