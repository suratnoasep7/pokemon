import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: 'https://api.pokemontcg.io/v1/',
  headers: {
    'Access-Control-Allow-Origin': 'https://api.pokemontcg.io/v1/'
  }
})