import { useRouteError } from 'react-router-dom'

import styles from './index.module.scss'

function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <div id={styles.errorPage}>
            <h1>Oops!</h1>
            <p>Desculpe, ocorreu um erro inesperado.</p>
        </div>
    )
}

export default ErrorPage