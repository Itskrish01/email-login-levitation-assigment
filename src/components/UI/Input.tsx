import * as React from 'react'

import { cn } from '../../utils/util'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean
    errorStatement?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, isError, errorStatement, ...props }, ref) => {
        return (
            <>
                <input
                    className={cn(
                        `flex h-12 w-full rounded-xl border ${isError ? 'border-red-400' : "border-slate-300"}  bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 `,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {isError && <span className='text-red-500 text-xs'>{errorStatement}</span>}
            </>
        )
    }
)
Input.displayName = 'Input'

export { Input }