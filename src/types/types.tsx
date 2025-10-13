export interface Task {
  id: string;
  name: string;
  content: string;
  deadline: string;
  status: 'active' | 'completed';
}

export type Option = 'active' | 'completed' | 'all'

export interface TypeFilterProps {
  option: Option;
  changeOption: (option: Option) => void;
}

export interface TypeTaskProps {
  content: Task
}

export interface TypeCreateTaskFormProps {
  createTask: (data: Task) => void
  closeForm: (data: boolean) => void
}