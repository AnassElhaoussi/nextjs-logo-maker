import axios from 'axios'

export default async function signUpUser(user: { email: string, password: string }) {
    return await axios.post('/api/register', user)
}