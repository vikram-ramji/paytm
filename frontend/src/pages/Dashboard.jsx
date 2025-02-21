import { useEffect, useState } from 'react'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios'

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => setBalance(response.data.balance))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => setUser(response.data.user))
    }, [])

    return <div>
        <Appbar user={`${user.firstName} ${user.lastName}`} />
        <div className='m-8'>
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}