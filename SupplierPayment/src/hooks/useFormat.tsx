import { useContext } from 'react'

import { InvoiceContext } from '../Contexts/InvoiceContext'
import { LoginContext } from '../Contexts/LoginContext'

import {
    formatCNPJ,
    formatInvoiceNumber,
    formatValueToDecimal
} from '../services/formatting'

export const useFormat = () => {
    const { setCnpjFormatted } = useContext(LoginContext)
    const { setInvoiceNumberFormatted } = useContext(InvoiceContext)

    const formatThisCnpj = (cnpj: string) => {
        return setCnpjFormatted(formatCNPJ(cnpj))
    }

    const formatThisInvoiceNumber = (invoiceNumber: string) => {
        invoiceNumber = invoiceNumber.replace(/\D/g, '')

        return setInvoiceNumberFormatted(formatInvoiceNumber(invoiceNumber))
    }

    const formatThisValueToDecimal = (value: string) => {
        value = value.replace(/\D/g, '')

        return formatValueToDecimal(value)
    }

    return { formatThisCnpj, formatThisInvoiceNumber, formatThisValueToDecimal }
}