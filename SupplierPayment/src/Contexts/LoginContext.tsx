import {
    createContext,
    ReactNode,
    useState
} from 'react'

import type { FormLoginData, ReturnMessageType, User } from '../interfaces/types'

import { formatCNPJ, unformatCNPJ }  from '../services/formatting'
import { api, cnpj_api } from '../services/api'

interface LoginContextData {
    validateCnpj:  (data: FormLoginData) => Promise<boolean>
    returnMessage: (message: ReturnMessageType) => void
    login:         (data: FormLoginData) => Promise<boolean>
    cnpj: string
    setCnpjFormatted: (cnpj: string) => void
    cnpjFormatted: string
    corporateName: string
    fantasyName: string
}
interface LoginProviderProps {
    children: ReactNode
}

export const LoginContext = createContext({} as LoginContextData)

export function LoginProvider({ children }: LoginProviderProps) {
    const [cnpj, setCnpj] = useState(String(sessionStorage.getItem('active-cnpj')))
    const [cnpjFormatted, setCnpjFormatted] = useState('')

    const [corporateName, setCorporateName] = useState(String(sessionStorage.getItem('corporate-name')))
    const [fantasyName, setFantasyName] = useState(String(sessionStorage.getItem('fantasy-name')))

    async function validateCnpj (data: FormLoginData): Promise<boolean> {
        try {
            let { cnpj } = data
            cnpj = unformatCNPJ(cnpj)

            const res = await cnpj_api.get(`/${cnpj}`)
            if (res.status) return true
            return false
        } catch (err) {
            console.error(err)
            return false
        }
    }

    function returnMessage(message: ReturnMessageType) {
        const label = document.querySelector('label[for="cnpj"]')

        const addClassLabel = (className: ReturnMessageType) => {
            if (label) {
                label.classList.add(className)
                setTimeout(() => {
                    label.classList.remove(className)
                }, 7000)
            }
        }

        switch (message) {
            case 'invalid': return addClassLabel(message)
            case 'noContracts': return addClassLabel(message)
            case 'unexpectedError': return addClassLabel(message)

            default: break
        }
    }

    async function login({ cnpj }: FormLoginData) {
        if (cnpj === sessionStorage.getItem('active-cnpj')) return true

        cnpj = unformatCNPJ(cnpj)

        const isOk = await api.get(`/users/${cnpj}`)
            .then(res => {
                if (res.status === 200) {
                    const { corporateName, fantasyName } = res.data.data as User

                    cnpj = formatCNPJ(cnpj)

                    sessionStorage.setItem('active-cnpj', cnpj)
                    sessionStorage.setItem('corporate-name', corporateName)
                    sessionStorage.setItem('fantasy-name', fantasyName)

                    setCnpj(cnpj)
                    setCorporateName(corporateName)
                    setFantasyName(fantasyName)

                    return true
                } else {
                    returnMessage('unexpectedError')
                    return false
                }
            }).catch(err => {
                console.error(err)

                if (err.response.status === 404) returnMessage('noContracts')
                else returnMessage('unexpectedError')

                return false
            })

        return isOk
    }

    return (
        <LoginContext.Provider
            value={{
                validateCnpj,
                returnMessage,
                login,
                cnpj,
                cnpjFormatted,
                setCnpjFormatted,
                corporateName,
                fantasyName
            }}
        >
            { children }
        </LoginContext.Provider>
    )
}