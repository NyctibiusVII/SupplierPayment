import { useContext } from 'react'

import { LoginContext } from '../../Contexts/LoginContext'

import styles from './index.module.scss'

export const SupplierInfo = () => {
    const { cnpj, corporateName, fantasyName } = useContext(LoginContext)

    return (
        <div className={styles.content}>
            <div className={styles.corporateName}>
                <p>Razão Social:</p>&nbsp;<span>{corporateName}</span>
            </div>
            <div className={styles.fantasyName}>
                <p>Nome Fantasia:</p>&nbsp;<span>{fantasyName}</span>
            </div>
            <div className={styles.cnpj}>
                <p>CNPJ:</p>&nbsp;<span>{cnpj}</span>
            </div>
        </div>
    )
}