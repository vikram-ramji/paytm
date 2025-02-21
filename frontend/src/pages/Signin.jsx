import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {BottomWarning} from '../components/BottomWarning'
import {Button} from '../components/Button'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter you credentials to access your account"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"johndoe@gamil.com"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"your-password"} />
                <div className='pt-4'>
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} linkText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>
}