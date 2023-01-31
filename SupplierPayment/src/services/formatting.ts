/**
 * Formats the value to a decimal string
 * @param value Value to be formatted
 * @returns Formatted value (12.34)
 */
export const decimal = (value: string) => parseFloat(value).toFixed(2)
/**
 * Formats the value to a CNPJ string
 * @param cnpj Value to be formatted
 * @returns Formatted value (12.345.678/0000-01)
 */
export const formatCNPJ = (cnpj: string) => cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
/**
 * Unformats the value to a CNPJ string
 * @param cnpj Value to be unformatted
 * @returns Unformatted value (12345678000001)
 */
export const unformatCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '')
/**
 * Formats the value to a string of invoice numbers (NF)
 * @param invoiceNumber Value to be formatted
 * @returns Formatted value (123.456.789)
 */
export const formatInvoiceNumber = (invoiceNumber: string) => invoiceNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
/**
 * Formats the value to a decimal value string
 * @param value Value to be formatted
 * @returns Formatted value (12.34)
 */
export const formatValueToDecimal = (value: string) => value.replace(/(\d{2})(\d{2})/, '$1,$2')