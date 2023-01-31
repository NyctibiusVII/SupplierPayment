import { Header }    from '../../Components/Header'
import { Contracts } from '../../Components/Contracts'
import { Footer }    from '../../Components/Footer'

import styles from './index.module.scss'

function LinkedContracts() {
    return (
        <main className={styles.container}>
            <Header />
            <Contracts />
            <Footer />
        </main>
    )
}

export default LinkedContracts