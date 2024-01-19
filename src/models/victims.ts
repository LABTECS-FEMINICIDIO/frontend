export interface IVictims{
    nome: string
    idade: number
    rua: string
    armaUsada: string
    sites: string
}

export interface UpdateVictimsListProps {
    updateVictimsList: (victims: IVictims) => void;
  }