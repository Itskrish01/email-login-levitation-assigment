import { useState } from 'react'
import { Input } from '../UI/Input'
import { Button } from '../UI/Button'
import { Link } from "react-router-dom"

type Props = {
    email?: string
    password?: string
    response?: any
    isLoading?: boolean
    isError?: boolean
    errorStatement?: string
    onLogin: (email: string, password: string) => void;
}

const AuthForm = ({ onLogin, isLoading, isError, errorStatement }: Props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e: any) => {
        e.preventDefault()

        onLogin(email || '', password || '');
    };
    return (
        <div className=" md:w-1/3 w-full sm:mx-0 rounded-lg sm:px-8 px-4 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-center font-semibold ">Welcome back!</h2>
            <p className='text-slate-500 mb-4 text-center text-sm'>Login to your account.</p>
            <form onSubmit={handleLogin} className=' space-y-4 w-full mt-5'>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    isError={isError}
                    onChange={(e) => setEmail(e.target.value)}
                    errorStatement={errorStatement}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    isError={isError}
                    errorStatement={errorStatement}
                />

                <Button type='submit' className='w-full' size={'lg'} isLoading={isLoading}>
                    LOGIN
                </Button>
                <div className='text-center'>
                    <Link className='text-slate-600 hover:text-slate-500 font-bold text-xs text-center' to={'/reset-pass'}>Forget Password?</Link>
                </div>
            </form>
        </div>
    )
}

export default AuthForm