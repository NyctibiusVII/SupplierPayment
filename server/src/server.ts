import express from 'express'
import cors from 'cors'

import { rootRouter }  from './routes/root'
import { usersRouter } from './routes/users'

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/', rootRouter)
server.use('/users', usersRouter)

server.listen(3333)