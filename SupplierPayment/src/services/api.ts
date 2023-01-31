import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: { 'Content-Type': 'application/json' }
})
export const cnpj_api = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cnpj/v1'
})