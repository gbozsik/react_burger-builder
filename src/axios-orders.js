import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-44dfd.firebaseio.com/'
})

export default instance