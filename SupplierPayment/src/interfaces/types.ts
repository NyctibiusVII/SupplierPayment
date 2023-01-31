/* Components/Login */
/**
 * @cnpj Inputting Supplier CNPJ
 */
export interface FormLoginData { cnpj: string }

/* Components/Invoice */
type TaxesRetention = {
    issqn: string
    irrf: string
    csll: string
    cofins: string
    inss: string
    pis: string
}
type TechnicalRetention = {
    finalValue: string
    percentual: string
}
/**
 * Invoice data
 * @variables Types string
 * @file File[]
 */
export interface FormInvoiceData {
    invoiceNumber: string
    dueDate: string
    issueDate: string
    initialValue: string
    taxesRetention: TaxesRetention
    technicalRetention: TechnicalRetention
    attachInvoice: File[]
}
/**
 * Supplier contract
 * @contractName Name of the contract
 * @contractCode Code of the contract
 * @technicalRetentionPercentage Technical retention percentage
 */
export type Contract = {
    contractName: string
    contractCode: string
    technicalRetentionPercentage: string
}
export type Contracts = Contract[]
/**
 * Defines the types of properties for a supplier
 * @cnpj Supplier's CNPJ
 * @corporateName Supplier's corporate name
 * @fantasyName Supplier's fantasy name
 * @contracts Supplier's contracts
 */
export interface User {
    cnpj: string
    corporateName: string
    fantasyName: string
    contracts: Contracts
}
/**
 * @invalid Invalid CNPJ
 * @noContracts No contracts found
 * @unexpectedError Unexpected error
 */
export type ReturnMessageType = 'invalid' | 'noContracts' | 'unexpectedError'

/* Components/Logo */
export type LogoProps = JSX.IntrinsicElements['figure']

/* Components/ModeInfoModal */
export interface ModeInfoModalType {
    contractName: string
    contractCode: string
    contractTechnicalRetentionPercentage: string
}

/* Components/UI/Input */
interface InputType {
    name: string
    label?: string
    labelBefAft?: 'before' | 'after'
    container?: boolean
}
/**
 * Defines the types of native input properties.
 */
export type InputProps = JSX.IntrinsicElements['input'] & InputType

/* Components/UI/Fieldset */
interface FieldsetType { legend: string }
/**
 * Defines the types of native fieldset properties.
 */
export type FieldsetProps = JSX.IntrinsicElements['fieldset'] & FieldsetType

/* Components/UI/Button */
/**
 * Defines the types of native button properties.
 */
export type ButtonType = JSX.IntrinsicElements['button']