import { Logo } from '../Logo'

import styles from './index.module.scss'

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <Logo className='logo footer' />

            <small>© 2022-2023 Construindo Patrimônios</small>
        </footer>
    )
}