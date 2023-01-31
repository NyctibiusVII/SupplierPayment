import React    from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    redirect
} from 'react-router-dom'

import { LoginProvider } from './Contexts/LoginContext'
import { LinkedContractsProvider } from './Contexts/LinkedContractsContext'
import { InvoiceProvider } from './Contexts/InvoiceContext'

import SystemAccess    from './pages/SystemAccess'
import LinkedContracts from './pages/LinkedContracts'
import Invoice         from './pages/Invoice'
import ErrorPage       from './pages/ErrorPage'

import './global.scss'
import { MoreInfoModalProvider } from './Contexts/MoreInfoModalContext'

const loaderLinkedContracts = () => {
    const activeCnpj = sessionStorage.getItem('active-cnpj')
    if (!activeCnpj) return redirect('/')
    return null
}
const loaderInvoice = () => {
    const activeContractIndex = sessionStorage.getItem('active-contract-index')
    if (!activeContractIndex) return redirect('/contratos-vinculados')
    return null
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <SystemAccess />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/contratos-vinculados',
        element: <LinkedContracts />,
        loader: loaderLinkedContracts
    },
    {
        path: '/contratos-vinculados/nota-fiscal',
        element: <Invoice />,
        loader: loaderInvoice
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LoginProvider>
            <LinkedContractsProvider>
                <MoreInfoModalProvider>
                    <InvoiceProvider>
                        <RouterProvider router={router} />
                    </InvoiceProvider>
                </MoreInfoModalProvider>
            </LinkedContractsProvider>
        </LoginProvider>
    </React.StrictMode>,
)
