import { ArrowLeft, Check, Cross, Key, X } from "lucide-react";
import React from "react";

interface Step5Props {
    isError?: boolean;
    errorStatement?: string
}


const Step5: React.FC<Step5Props> = ({ isError, errorStatement }) => {


    return (
        <div className=" pt-8 shadow-md border w-full flex items-center justify-center flex-col text-center sm:mx-0 rounded-lg mb-4">
            {isError ? <div className='text-red-500 bg-red-200 rounded-full p-4 border-[10px] border-red-100 '><X /></div> : <div className='text-green-500 bg-green-200 rounded-full p-4 border-[10px] border-green-100 '><Check /></div>}
            <div className=' mt-5 w-full sm:mx-0 rounded-lg sm:px-8 px-4 pb-8 mb-4'>
                <h2 className='text-2xl text-center font-medium text-slate-700'>{isError ? errorStatement : "Successfully submitted the form!"}</h2>
            </div>
        </div>
    );
};

export default Step5;
