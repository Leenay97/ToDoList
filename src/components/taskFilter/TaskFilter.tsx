import type { TypeFilterProps } from "../../types/types"
import './taskFilter.scss'

const TaskFilter = ({ option, changeOption }: TypeFilterProps) => {
    return (
        <nav className="task-filter">
            <div className={`task-filter__option ${option === 'active' ? 'active' : ''} `}
                onClick={() => changeOption('active')}>
                Активные
            </div>
            <div className={`task-filter__option ${option === 'completed' ? 'active' : ''} `}
                onClick={() => changeOption('completed')}>
                Выполненные
            </div>
            <div
                className={`task-filter__option ${option === 'all' ? 'active' : ''} `}
                onClick={() => changeOption('all')}>
                Все
            </div>
        </nav>
    )
}

export default TaskFilter

