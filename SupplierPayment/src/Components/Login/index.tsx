import { useContext }    from 'react'
import { SubmitHandler } from '@unform/core'
import { useNavigate }   from 'react-router-dom'

import { useFormat } from '../../hooks/useFormat'
import type { FormLoginData } from '../../interfaces/types'

import { LoginContext } from '../../Contexts/LoginContext'

import { Form }   from '@unform/web'
import { Input }  from '../UI/Form/Input'
import { Button } from '../UI/Button'

export const Login = () => {
    const navigate = useNavigate()
    const {formatThisCnpj} = useFormat()

    const {
        cnpjFormatted,
        validateCnpj,
        returnMessage,
        login
    } = useContext(LoginContext)

    const handleFormSubmit: SubmitHandler<FormLoginData> = async data => {
        const cnpjIsValid = await validateCnpj(data)
        if (!cnpjIsValid) return returnMessage('invalid')

        login(data).then(isOk => isOk && navigate('contratos-vinculados'))
    }

    return (
        <Form className='login' onSubmit={handleFormSubmit}>
            <Input
                name='cnpj'
                label='CNPJ'
                type='text'
                placeholder='00.000.000/0000-00'
                onChange={event => formatThisCnpj(event.target.value)}
                value={cnpjFormatted}
                minLength={14}
                maxLength={18}
                tabIndex={1}
                required
            />

            <Button className='access' type='submit' tabIndex={2}>Acessar</Button>
        </Form>
    )
}