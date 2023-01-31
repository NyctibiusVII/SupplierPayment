import {
    createContext,
    ReactNode,
    useState
} from 'react'

import type { Contract, Contracts } from '../interfaces/types'

import { api } from '../services/api'

interface LinkedContractsContextData {
    getUserContracts: (cnpj: string) => void
    contracts: Contracts
    getContract: (cnpj: string, activeContractIndex: string) => void
    contract: Contract
}
interface LinkedContractsProviderProps {
    children: ReactNode
}

export const LinkedContractsContext = createContext({} as LinkedContractsContextData)

export function LinkedContractsProvider({ children }: LinkedContractsProviderProps) {
    const [contracts, setContracts] = useState<Contracts>([])
    const [contract, setContract] = useState<Contract>({} as Contract)

    function getUserContracts(cnpj: string) {
        api.get(`/users/${cnpj}/contracts`)
            .then(res => setContracts(res.data.data))
            .catch(err => console.error(err))
    }

    function getContract(cnpj: string, activeContractIndex: string) {
        api.get(`/users/${cnpj}/contracts?contractId=${activeContractIndex}`)
            .then(res => setContract(res.data.data))
            .catch(err => console.error(err))
    }

    return (
        <LinkedContractsContext.Provider
            value={{
                getUserContracts,
                contracts,
                getContract,
                contract
            }}
        >
            { children }
        </LinkedContractsContext.Provider>
    )
}