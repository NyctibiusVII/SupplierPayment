import express, { Request, Response } from 'express'

export const rootRouter = express.Router()

const rootRoute  = '/'

// - Public API endpoints
rootRouter.get(rootRoute, async (req: Request, res: Response) => {
    return res.status(200).send({
        description: 'Root router',
        url: '/',
        options: {
            users: '/users'
        }
    })
})