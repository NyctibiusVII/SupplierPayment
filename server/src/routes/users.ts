import express, { Request, Response } from 'express'
import { users } from '../fake-db/users'

export const usersRouter = express.Router()

const rootRoute  = '/'

export const unformatCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '')

// - Public API endpoints
usersRouter.get(rootRoute, async (req: Request, res: Response) => {
    const usersCnpj = users.map(user => user.cnpj)

    return res.status(200).send({
        description: 'API - Users',
        url: '/users',
        options: {
            users: '/users',
            user:  '/users/<cnpj>'
        },
        data: { cnpj: usersCnpj }
    })
})

usersRouter.get(`${rootRoute}:cnpj`, async (req: Request, res: Response) => {
    const { cnpj } = req.params
    const unformattedCnpj = unformatCNPJ(cnpj)

    const user = users.find(user => user.cnpj === unformattedCnpj)

    if (!user) {
        return res.status(404).send({
            description: 'User not found',
            url: '/users/<cnpj>',
            options: {
                users: '/users'
            },
            data: null
        })
    }

    return res.status(200).send({
        description: 'User found',
        url: '/users/<cnpj>',
        options: {
            users: '/users'
        },
        data: user
    })
})

usersRouter.get(`${rootRoute}:cnpj/contracts`, async (req: Request, res: Response) => {
    const { cnpj } = req.params, { contractId } = req.query

    const unformattedCnpj = unformatCNPJ(cnpj)

    const user = users.find(user => user.cnpj === unformattedCnpj)

    if (!user) {
        return res.status(404).send({
            description: 'User not found',
            url: '/users/<cnpj>/contracts',
            options: {
                users: '/users'
            },
            data: null
        })
    }

    if (contractId) {
        return res.status(200).send({
            description: 'User found',
            url: '/users/<cnpj>',
            options: {
                users: '/users'
            },
            data: user.contracts[Number(contractId)]
        })
    }

    return res.status(200).send({
        description: 'User found',
        url: '/users/<cnpj>',
        options: {
            users: '/users'
        },
        data: user.contracts
    })
})