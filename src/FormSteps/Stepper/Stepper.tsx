import { CheckCircle2, File, FileStack, Contact, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'



const Stepper = (props: any) => {

    const [barWidth, setBarWidth] = useState("")

    useEffect(() => {
        switch (props.pageStep) {
            case 0:
                setBarWidth('5%')
                break;
            case 1:
                setBarWidth("30%")
                break;
            case 2:
                setBarWidth("50%")
                break;
            case 3:
                setBarWidth("70%")
                break;
            case 4:
                setBarWidth("100%")
                break;
            default:
                break;
        }
    }, [props.pageStep])

    return (

        <div className='w-full bg-white mb-10'>
            <h2 className="sr-only">Steps</h2>

            <div>
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-2 rounded-full bg-slate-700`} style={{ width: barWidth, transition: "ease", transitionDuration: "0.5s" }}></div>
                </div>

                <ol className="mt-4 grid transition-all grid-cols-5 text-sm font-medium text-gray-500">
                    <li className={`${props.pageStep >= 0 ? "text-slate-700" : ""} flex items-center justify-start  sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Details </span>
                        <Contact />
                    </li>

                    <li className={`${props.pageStep > 0 ? "text-slate-700" : ""} flex items-center justify-center sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Address </span>
                        <MapPin />
                    </li>

                    <li className={`${props.pageStep > 1 ? "text-slate-700" : ""} flex items-center justify-center sm:gap-1.5`}>
                        <span className="hidden sm:inline"> File </span>
                        <File />
                    </li>
                    <li className={`${props.pageStep > 2 ? "text-slate-700" : ""} flex items-center justify-center sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Files </span>
                        <FileStack />
                    </li>
                    <li className={`${props.pageStep > 3 ? "text-slate-700" : ""} flex items-center justify-end sm:gap-1.5`}>
                        <span className="hidden sm:inline"> Success </span>
                        <CheckCircle2 />
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Stepper