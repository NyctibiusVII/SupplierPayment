import {
    createContext,
    ReactNode,
    useState
} from 'react'

import { MoreInfoModal } from '../Components/MoreInfoModal'
import { ModeInfoModalType } from '../interfaces/types'

interface MoreInfoModalContextData {
    modalIsOpen: boolean
    openModal: (info: ModeInfoModalType) => void
    closeModal: () => void
    currentContractName: string
    currentContractCode: string
    currentContractTechnicalRetentionPercentage: string
}
interface MoreInfoModalProviderProps {
    children: ReactNode
}

export const MoreInfoModalContext = createContext({} as MoreInfoModalContextData)

export function MoreInfoModalProvider({ children }: MoreInfoModalProviderProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [currentContractName, setCurrentContractName] = useState('')
    const [currentContractCode, setCurrentContractCode] = useState('')
    const [currentContractTechnicalRetentionPercentage,
        setCurrentContractTechnicalRetentionPercentage] = useState('')

    function openModal(info: ModeInfoModalType) {
        setCurrentContractName(info.contractName)
        setCurrentContractCode(info.contractCode)
        setCurrentContractTechnicalRetentionPercentage(info.contractTechnicalRetentionPercentage)

        setModalIsOpen(true)
    }

    function closeModal() {
        setCurrentContractName('')
        setCurrentContractCode('')
        setCurrentContractTechnicalRetentionPercentage('')

        setModalIsOpen(false)
    }

    return (
        <MoreInfoModalContext.Provider
            value={{
                modalIsOpen,
                openModal,
                closeModal,
                currentContractName,
                currentContractCode,
                currentContractTechnicalRetentionPercentage
            }}
        >
            { children }
            { modalIsOpen && <MoreInfoModal /> }
        </MoreInfoModalContext.Provider>
    )
}