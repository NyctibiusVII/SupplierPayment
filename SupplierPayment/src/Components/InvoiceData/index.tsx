import {
    useContext,
    useEffect,
    useRef,
    useState
}  from 'react'
import { useNavigate }   from 'react-router-dom'
import {
    FormHandles,
    Scope,
    SubmitHandler
} from '@unform/core'

import { useFormat } from '../../hooks/useFormat'
import { decimal, unformatCNPJ } from '../../services/formatting'
import type { FormInvoiceData }  from '../../interfaces/types'

import { LinkedContractsContext } from '../../Contexts/LinkedContractsContext'
import { InvoiceContext }         from '../../Contexts/InvoiceContext'

import { Form }     from '@unform/web'
import { Input }    from '../UI/Form/Input'
import { Fieldset } from '../UI/Form/Fieldset'
import { Button }   from '../UI/Button'

import trashIcon from '/trash-icon.svg'
import styles    from './index.module.scss'

export const InvoiceData = () => {
    const formRef = useRef<FormHandles>(null)
    const navigate = useNavigate()

    const { formatThisInvoiceNumber } = useFormat()
    const { getContract, contract } = useContext(LinkedContractsContext)
    const { contractName, contractCode, technicalRetentionPercentage: tRPercent } = contract

    const {
        inputFiles, issqn, irrf, initialValue, csll, cofins,
        finalValue, inss, pis, invoiceNumberFormatted
    } = useContext(InvoiceContext)
    const {
        addFile, removeFile, clearPersistentData, sendData, setInitialValue,
        setFinalValue, setIssqn,setIrrf, setCsll, setCofins, setInss, setPis
    } = useContext(InvoiceContext)

    const [taxesRetention, setTaxesRetention] = useState(false)
    const [technicalRetention, setTechnicalRetention] = useState(false)

    const handlePrevious = () => {
        navigate('/contratos-vinculados')

        clearPersistentData()
    }
    const handleFormSubmit: SubmitHandler<FormInvoiceData> = async (data, { reset }) => {
        /* Observe o console do navegador */
        sendData(data)

        reset()
        clearPersistentData()

        setTimeout(() => navigate('/'), 1000)
    }

    useEffect(() => {
        const updatingFinalValue = () => {
            const value = Number(initialValue) * Number(tRPercent) / 100

            setFinalValue(decimal(String(value)))
        }

        return updatingFinalValue()
    }, [initialValue])

    useEffect(() => {
        let cnpj = sessionStorage.getItem('active-cnpj')
        const activeContractIndex = sessionStorage.getItem('active-contract-index')

        cnpj = unformatCNPJ(cnpj as string)

        if (cnpj && activeContractIndex) getContract(cnpj, activeContractIndex)
    }, [])

    return (
        <main className={styles.container}>
            <h2>Dados da Nota Fiscal</h2>

            <Form ref={formRef} className='invoice' onSubmit={handleFormSubmit}>
                <section className={styles.contractInfo}>
                    <p>Código do Contrato:&nbsp;<span>{contractCode}</span></p>
                    <span>{contractName}</span>
                </section>

                <section className={styles.invoiceInfo}>
                    <Input
                        name='invoiceNumber'
                        label='Número da Nota Fiscal'
                        type='text'
                        placeholder='000.000.000'
                        onChange={event => formatThisInvoiceNumber(event.target.value)}
                        value={invoiceNumberFormatted}
                        minLength={9}
                        maxLength={11}
                        container
                        required
                    />
                    <Input
                        name='issueDate'
                        label='Data de Emissão'
                        type='date'
                        container
                        required
                    />
                    <Input
                        name='dueDate'
                        label='Data de Vencimento'
                        type='date'
                        container
                        required
                    />
                    <Input
                        name='initialValue'
                        label='Valor'
                        type='number'
                        onChange={e => setInitialValue(decimal(e.target.value))}
                        value={initialValue}
                        container
                        required
                    />
                </section>

                <section className={styles.taxesRetention}>
                    <Input
                        name='taxesRetention'
                        label='Retenção de Impostos'
                        labelBefAft='after'
                        type='checkbox'
                        onChange={e => setTaxesRetention(e.target.checked)}
                        container
                    />
                    { taxesRetention && (
                        <Fieldset className='taxesRetention' legend='Dados de Impostos'>
                            <Scope path='taxesRetention'>
                                <Input
                                    name='issqn'
                                    label='ISSQN'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setIssqn(decimal(event.target.value))}
                                    value={issqn}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                                <Input
                                    name='irrf'
                                    label='IRRF'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setIrrf(decimal(event.target.value))}
                                    value={irrf}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                                <Input
                                    name='csll'
                                    label='CSLL'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setCsll(decimal(event.target.value))}
                                    value={csll}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                                <Input
                                    name='cofins'
                                    label='COFINS'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setCofins(decimal(event.target.value))}
                                    value={cofins}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                                <Input
                                    name='inss'
                                    label='INSS'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setInss(decimal(event.target.value))}
                                    value={inss}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                                <Input
                                    name='pis'
                                    label='PIS'
                                    type='number'
                                    placeholder='00.00'
                                    onChange={event => setPis(decimal(event.target.value))}
                                    value={pis}
                                    step='00.01'
                                    min='00.01'
                                    max='99.99'
                                    minLength={3}
                                    maxLength={5}
                                    container
                                    required
                                />
                            </Scope>
                        </Fieldset>
                    )}
                </section>

                <section className={styles.technicalRetention}>
                    <Input
                        name='technicalRetention'
                        label='Retenção de Técnica'
                        labelBefAft='after'
                        type='checkbox'
                        onChange={e => setTechnicalRetention(e.target.checked)}
                        container
                    />
                    { technicalRetention && (
                        <Fieldset className='technicalRetention' legend='Dados da Retenção Técnica'>
                            <Scope path='technicalRetention'>
                                <Input
                                    name='finalValue'
                                    label='Valor'
                                    type='text'
                                    value={!isNaN(Number(finalValue)) ? finalValue : '0.00'}
                                    readOnly
                                    container
                                    disabled
                                />
                                <Input
                                    name='percentual'
                                    label='Percentual'
                                    type='text'
                                    value={`${tRPercent}%`}
                                    readOnly
                                    container
                                    disabled
                                />
                            </Scope>
                        </Fieldset>
                    )}
                </section>

                <section className={styles.attachInvoice}>
                    <Input type='file' name='attachInvoice' label='Anexar Nota Fiscal' container onChange={e => addFile(e.target)} />
                    { inputFiles.length > 0 &&
                        <ul>
                            { inputFiles.map((file: File, index: number) => {
                                return (
                                    <li key={index}>
                                        <span>{file.name}</span>
                                        <Button type='button' className='buttonIcon removeFile' onClick={() => removeFile(index)}>
                                            <img src={trashIcon} width={10} />
                                        </Button>
                                    </li>
                                )
                            }) }
                        </ul>
                    }
                </section>

                <footer>
                    <Button className='previous' type='button' onClick={() => handlePrevious()} tabIndex={1}>Anterior</Button>
                    <Button className='next' type='submit' tabIndex={2}>Próximo</Button>
                </footer>
            </Form>
        </main>
    )
}