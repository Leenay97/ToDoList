export interface Task {
  id: string;
  name: string;
  content: string;
  deadline: string;
  status: 'active' | 'completed';
}

export type Option = 'active' | 'completed' | 'all'

export interface TaskProps extends Task {
  onComplete: (e: React.ChangeEvent, id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, content: string, deadline: string) => void;
}

export interface TypeFilterProps {
  option: Option;
  changeOption: (option: Option) => void;
}

export interface TypeCreateTaskFormProps {
  createTask: (data: Task) => void
  closeForm: (data: boolean) => void
}