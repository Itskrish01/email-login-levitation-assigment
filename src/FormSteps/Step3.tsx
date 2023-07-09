import React from "react";
import 'filepond/dist/filepond.min.css';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addSingleFile } from "../features/formSlice";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast"

const Step3: React.FC = () => {
    const fileURL = useSelector((state: RootState) => state.formState.single_file);
    const dispatch = useDispatch();

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        const isValid = validateFile(selectedFile);
        if (isValid) {
            dispatch(addSingleFile(selectedFile));
        }
    };

    const validateFile = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        const isValid = extension === 'png' || extension === 'pdf';
        if (!isValid) {
            toast.error('Invalid file type. Please select a PNG or PDF file.'); // Dispatch an error toast message
        }
        return isValid;
    };


    return (
        <div className="bg-white w-full sm:mx-0 rounded-lg pb-8 mb-4">
            <span className="text-red-500 text-xs mb-1">Valid file type - PNG, PDF</span>
            <div className="items-center justify-center bg-grey-lighter">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-slate-600">
                    <UploadCloud size={30} />
                    <span className="mt-2 text-base leading-normal text-slate-600">Select a file</span>
                    <input type='file' className="hidden" onChange={handleFileChange} />
                </label>
                {fileURL && (
                    <>
                        <span className="uppercase text-sm font-bold mt-2">File name - </span><span className="text-sm">{fileURL.name}</span>
                    </>
                )}
            </div>
            <div></div>
        </div>
    );
};

export default Step3;
