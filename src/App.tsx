import './index.scss'
import TaskList from './components/taskList/TaskList'



const App = () => {
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