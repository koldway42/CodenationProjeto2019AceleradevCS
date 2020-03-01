import axios from "axios"
import https from "https";

const api = axios.create({
    baseURL: "https://localhost:44313/api",
    config: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    },
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

export default api;