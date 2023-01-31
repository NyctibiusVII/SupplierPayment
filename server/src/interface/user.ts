type Contract = {
    contractName: string
    contractCode: string
    technicalRetentionPercentage: number
}
type Contracts = Contract[]

export interface User {
    cnpj: string
    corporateName: string
    fantasyName: string
    contracts: Contracts
}

export type Users = User[]