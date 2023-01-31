import { Header }      from '../../Components/Header'
import { InvoiceData } from '../../Components/InvoiceData'
import { Footer }      from '../../Components/Footer'

import styles from './index.module.scss'

function Invoice() {
    return (
        <main className={styles.container}>
            <Header />
            <InvoiceData />
            <Footer />
        </main>
    )
}

export default Invoice