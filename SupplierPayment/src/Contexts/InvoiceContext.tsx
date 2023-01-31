import {
    createContext,
    ReactNode,
    useState
} from 'react'

import type { FormInvoiceData } from '../interfaces/types'

interface InvoiceContextData {
    inputFiles: File[]
    addFile(input: HTMLInputElement): void
    removeFile(index: number): void
    sendData(formData: FormInvoiceData): void
    clearPersistentData(): void
    invoiceNumberFormatted: string
    initialValue: string
    finalValue: string
    issqn: string
    irrf: string
    csll: string
    cofins: string
    inss: string
    pis: string
    setInvoiceNumberFormatted(invoiceNumber: string): void
    setInitialValue(value: string): void
    setFinalValue(value: string): void
    setIssqn(value: string): void
    setIrrf(value: string): void
    setCsll(value: string): void
    setCofins(value: string): void
    setInss(value: string): void
    setPis(value: string): void
}
interface InvoiceProviderProps {
    children: ReactNode
}

export const InvoiceContext = createContext({} as InvoiceContextData)

export function InvoiceProvider({ children }: InvoiceProviderProps) {
    const [inputFiles, setInputFiles] = useState<File[]>([])
    const nReq = Math.floor(Math.random() * 1000000)

    const [invoiceNumberFormatted, setInvoiceNumberFormatted] = useState('')

    const [initialValue, setInitialValue] = useState('')
    const [finalValue,     setFinalValue] = useState('')

    const
        [issqn,   setIssqn] = useState(''),
        [irrf,     setIrrf] = useState(''),
        [csll,     setCsll] = useState(''),
        [cofins, setCofins] = useState(''),
        [inss,     setInss] = useState(''),
        [pis,       setPis] = useState('')

    function addFile (input: HTMLInputElement) {
        if (!input.files) return

        for (let i = 0; i < input.files.length; i++)
            setInputFiles([...inputFiles, input.files[i]])
    }

    function removeFile (index: number) {
        const newInputFiles = inputFiles.filter((file, i) => i !== index && file )
        setInputFiles(newInputFiles)
    }

    function clearPersistentData() {
        setInvoiceNumberFormatted('')

        setInitialValue('')
        setFinalValue('')

        setIssqn('')
        setIrrf('')
        setCsll('')
        setCofins('')
        setInss('')
        setPis('')

        setInputFiles([])
    }

    function sendData(formData: FormInvoiceData) {
        const data = {...formData, attachInvoice: [...inputFiles]}

        console.log(`Solicitação ${nReq} foi enviada com sucesso!\n`, data)
    }

    return (
        <InvoiceContext.Provider
            value={{
                inputFiles,
                addFile,
                removeFile,
                sendData,
                clearPersistentData,
                invoiceNumberFormatted,
                initialValue,
                finalValue,
                issqn,
                irrf,
                csll,
                cofins,
                inss,
                pis,
                setInvoiceNumberFormatted,
                setInitialValue,
                setFinalValue,
                setIssqn,
                setIrrf,
                setCsll,
                setCofins,
                setInss,
                setPis,
            }}
        >
            { children }
        </InvoiceContext.Provider>
    )
}