export interface Task {
  id: string;
  name: string;
  cpf: string;
  responsible: string;
  deadline: Date;
  status: string;
  isDone: boolean;
}
