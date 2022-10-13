import axios from "axios";


export const UseAxios = axios.create({
    baseURL: 'http://localhost:4000'
  })

  