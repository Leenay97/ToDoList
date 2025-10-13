import './app.scss'
import React from 'react';
import TaskList from '../taskList/TaskList'
import { useState, useEffect } from 'react';

import type { Task, Option } from '../../types/types';



const App: React.FC = () => {
    return (
        <div className="app">
            <div className="app__container">
                <h1 className="app__name">
                    To do list
                </h1>
                <TaskList />
            </div>
        </div>
    )
}

export default App