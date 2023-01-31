import {
 useContext,
 useEffect
} from 'react'
import { useNavigate }  from 'react-router-dom'
import { unformatCNPJ } from '../../services/formatting'

import { LinkedContractsContext } from '../../Contexts/LinkedContractsContext'

import { Button } from '../UI/Button'

import searchIcon from '/search-icon.svg'
import styles     from './index.module.scss'

export const Contracts = () => {
    const navigate = useNavigate()
    const { getUserContracts, contracts } = useContext(LinkedContractsContext)

    const handlePrevious = () => {
        sessionStorage.clear()

        navigate('/')
    }
    const handleNext = () => {
        const inputs = document.getElementsByTagName('input')

        let count = 0, activeContract = -1
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'checkbox' && inputs[i].checked) {
                count++
                activeContract = i
            }
        }
        if (count === 0) return alert('Ao menos um Contrato deverá ser selecionado')
        if (count > 1)   return alert('Somente um Contrato deverá ser selecionado')

        const next = () => {
            sessionStorage.setItem('active-contract-index', String(activeContract))
            navigate('nota-fiscal')
        }

        activeContract != -1 ? next() : alert('Unexpected error')
    }

    const handleMoreDetails = (index: number) => alert('Detalhes sobre o contrato: ' + (index + 1))

    useEffect(() => {
        let cnpj = sessionStorage.getItem('active-cnpj')
        const activeContractIndex = sessionStorage.getItem('active-contract-index')

        cnpj = unformatCNPJ(cnpj as string)

        if (cnpj) getUserContracts(cnpj)
        if (activeContractIndex) sessionStorage.removeItem('active-contract-index')
    }, [])

    return (
        <main className={styles.container}>
            <h2>Contratos Vinculados</h2>

            <table className={styles.contracts}>
                <thead>
                    <tr>
                        <th>Nome do Contrato</th>
                        <th>Código do Contrato</th>
                        <th>Retenção Técnica</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>

                <tbody>
                    { contracts.map(({ contractName, contractCode, technicalRetentionPercentage }, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <span>
                                        <input type='checkbox' />
                                        &nbsp;
                                        { contractName }
                                    </span>
                                </td>
                                <td><span>{ contractCode }</span></td>
                                <td><span>{ technicalRetentionPercentage }%</span></td>
                                <td>
                                    <Button type='button' className='buttonIcon moreDetails' onClick={() => handleMoreDetails(index)}>
                                        <img src={searchIcon} width={10} />
                                    </Button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>

            <footer>
                <Button className='previous' onClick={() => handlePrevious()} tabIndex={1}>Anterior</Button>
                <Button className='next' onClick={() => handleNext()} tabIndex={2}>Próximo</Button>
            </footer>
        </main>
    )
}