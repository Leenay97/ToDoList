import React from "react";
import { useEffect, useState } from "react";
import TaskFilter from "../taskFilter/TaskFilter";
import CreateTaskForm from "../createTaskForm/CreateTaskForm";
import Task from "../task/Task";
import './taskList.scss'

import type { Task as TaskType, Option } from '../../types/types';


const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [option, setOption] = useState<Option>('active')
    const [createForm, setCreateForm] = useState<boolean>(false)

    const getTasks = () => {
        const initialTasks: string | null = localStorage.getItem('task-list');

        if (initialTasks) {
            const initialTasksArray: TaskType[] = JSON.parse(initialTasks)
            setTasks(initialTasksArray)
        }
    }

    const createTask = (data: TaskType) => {
        setTasks(prev => [...prev, data])
    }

    useEffect(() => {
        getTasks();
    }, [])

    useEffect(() => {
        console.log(JSON.stringify(tasks))
        if (tasks.length) {
            localStorage.setItem('task-list', JSON.stringify(tasks))
        }

    }, [tasks])

    return (
        <>
            <TaskFilter option={option} changeOption={setOption} />
            {tasks.length ?
                <ul className="task-list">
                    {tasks.map(item =>
                        <Task key={item.id}
                            name={item.name}
                            content={item.content}
                            deadline={item.deadline}
                            status={item.status}
                        />
                    )}
                </ul>
                :
                'Пока нет задач'}
            <button className="task-list__create-btn" onClick={() => setCreateForm(true)}>Добавить задачу</button>

            {createForm ? <CreateTaskForm createTask={createTask} closeForm={setCreateForm} /> : ''}
        </>
    )
}

export default TaskList