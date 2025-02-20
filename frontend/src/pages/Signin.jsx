import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {BottomWarning} from '../components/BottomWarning'
import {Button} from '../components/Button'

export const Signin = () => {
    return <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter you credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"johndoe@gamil.com"} />
                <InputBox label={"Password"} placeholder={"your-password"} />
                <div className='pt-4'>
                    <Button label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} linkText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>
}