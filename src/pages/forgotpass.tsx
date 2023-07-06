import { ArrowLeft, Key } from 'lucide-react'
import { Input } from '../components/UI/Input'
import { Button } from '../components/UI/Button'
import { Link } from 'react-router-dom'


const ForgotPassPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-3 justify-center w-full items-center h-screen ">
            <div className='text-slate-500 bg-slate-200 rounded-full p-4 border-[10px] border-slate-100 '><Key /></div>
            <div className=' mt-5 md:w-1/3 w-full sm:mx-0 rounded-lg sm:px-8 px-4 pt-6 pb-8 mb-4'>
                <h1 className='text-3xl text-center font-medium'>Forgot password?</h1>
                <p className='text-slate-500 text-center mt-2'>No worries, we'll send you reset instructions.</p>
                <div className='mt-8'>
                    <Input className='w-full' placeholder='Enter your email' />
                </div>
                <Button className='w-full mt-3' size="lg">Reset password</Button>
                <div className='flex items-center justify-center mt-6'>
                    <Link to="/login" className='flex items-center text-sm gap-2 hover:text-slate-500'>
                        <ArrowLeft size={16} />
                        <span>Back to login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassPage