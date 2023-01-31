import { Logo }         from '../Logo'
import { SupplierInfo } from '../SupplierInfo'

import styles from './index.module.scss'

export const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Logo className='logo header' />

                <h1>Pagamento de Fornecedor</h1>
            </div>
            <SupplierInfo />
        </header>
    )
}