export interface IUser{
    nome: string
    email: string
    telefone: string
    senha: string
    acesso: boolean
}

export interface UpdateUserListProps {
    updateUserList: (users: IUser) => void;
  }