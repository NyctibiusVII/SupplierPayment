import { Login } from '../../Components/Login'
import { Logo }  from '../../Components/Logo'

import styles from './index.module.scss'

function SystemAccess() {
    return (
        <main className={styles.container}>
            <Logo className='logo login' />

            <h1>Pagamento de Fornecedor</h1>
            <Login />
        </main>
    )
}

export default SystemAccess