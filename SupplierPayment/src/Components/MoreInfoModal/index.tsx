import { useContext } from 'react'

import { MoreInfoModalContext } from '../../Contexts/MoreInfoModalContext'

import { Button } from '../UI/Button'

import styles from './index.module.scss'

export const MoreInfoModal = () => {
    const {
        closeModal,
        currentContractName,
        currentContractCode,
        currentContractTechnicalRetentionPercentage
    } = useContext(MoreInfoModalContext)

    return (
        <div className={styles.overlay} /*onClick={closeModal}*/>
            <div className={styles.modal}>
                <h1>{currentContractName}</h1>

                <div className={styles.info}>
                    <p>Código: <span>{currentContractCode}</span></p>
                    <p>Porcentagem: <span>{currentContractTechnicalRetentionPercentage}%</span></p>
                </div>

                <Button className='closeModal' onClick={closeModal}>Fechar</Button>
            </div>
        </div>
    )
}