import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import Step1 from '../FormSteps/Step1';
import { Button } from '../components/UI/Button';
import Stepper from '../FormSteps/Stepper/Stepper';
import Step2 from '../FormSteps/Step2';
import Step3 from '../FormSteps/Step3';
import Step4 from '../FormSteps/Step4';
import { Toaster, toast } from 'react-hot-toast';
import Step5 from '../FormSteps/Step5';
import axios from 'axios';
import { RootState } from '../store/store';


const Home: React.FC = () => {
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const [errorStatement, setErrorStatement] = useState("")

    const authState = useSelector((state: RootState) => state.authState);
    const formDataState = useSelector((state: RootState) => state.formState);

    const handleLogout = () => {
        try {
            toast.promise(
                new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        dispatch(logout());
                        resolve();
                    }, 1000);
                }),
                {
                    loading: "Logging out...",
                    success: "Successfully logged out!",
                    error: "Logout failed",
                }
            );

            return <Navigate to="/login" replace />;
        } catch (error) {
            console.log(error);
        }
    };

    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        <Step1 key={currentStep} />,
        <Step2 key={currentStep} />,
        <Step3 key={currentStep} />,
        <Step4 key={currentStep} />,
        <Step5 key={currentStep} isError={isError} errorStatement={errorStatement} />,
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", formDataState.username);
        formData.append("email", formDataState.email);
        formData.append("phone_number", formDataState.dialCode + formDataState.phone);
        formData.append("address_1", formDataState.address_line_1);
        formData.append("address_2", formDataState.address_line_2);
        formData.append("city", formDataState.city);
        formData.append("state", formDataState.state);
        formData.append("pincode", formDataState.pincode);
        formData.append("country", formDataState.country);
        formData.append("single_file", formDataState.single_file);

        formDataState.multiple_files?.forEach((file, index) => {
            formData.append(`multi_ups${index + 1}`, file);
        });

        if (formDataState.geolocation) {
            formData.append("geolocation", JSON.stringify(formDataState.geolocation));
        }

        try {
            await toast.promise(
                axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', formData, {
                    headers: {
                        Authorization: `Bearer ${authState.authToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }),
                {
                    loading: 'Submitting...',
                    success: 'Form submitted successfully!',
                    error: (error: any) => {
                        setIsError(true);
                        setErrorStatement(error.response.data.message || 'An error occurred. Please try again.');
                        toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
                        if (currentStep === 3) {
                            setCurrentStep(currentStep + 1);
                        }
                    },
                }
            );

            if (currentStep === 3) {
                setCurrentStep(currentStep + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="flex flex-col justify-center container max-w-4xl mx-auto px-4 w-full h-screen">
            {authState.authToken !== "" && <Button className='absolute top-2 right-2' onClick={handleLogout}>Logout</Button>}

            <Toaster position="top-left" reverseOrder={false} />
            <Stepper pageStep={currentStep} />
            <div className="w-full flex-col items-center flex justify-center">
                {steps[currentStep]}
                <div className="flex justify-between w-full bg-white">
                    {currentStep === 0 && currentStep === steps.length - 1 ? (
                        <div></div>
                    ) : (
                        <Button type="button" onClick={handlePrev}>
                            Previous
                        </Button>
                    )}
                    {currentStep === steps.length - 2 ? (
                        <Button onClick={handleSubmit}>Submit</Button>
                    ) : currentStep === steps.length - 1 ? (
                        ""
                    ) : (
                        <Button type="button" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
