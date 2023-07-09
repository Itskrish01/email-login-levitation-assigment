import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addMultipleFiles } from "../features/formSlice";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import GeolocationCapture from "../components/GeolocationCapture";

const Step4: React.FC = () => {
    const multipleFiles = useSelector((state: RootState) => state.formState.multiple_files);
    const dispatch = useDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        const validFiles = selectedFiles.filter(file => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            const isValid = extension === 'png' || extension === 'pdf';
            if (!isValid) {
                toast.error('Invalid file type. Please select a PNG or PDF file.'); // Dispatch an error toast message
            }
            return isValid;
        });

        dispatch(addMultipleFiles(validFiles));
    };

    return (
        <div className="bg-white w-full  sm:mx-0 rounded-lg pb-8 mb-4">
            <span className="text-red-500 text-xs mb-1">Valid file type - PNG, PDF</span>
            <div className="items-center justify-center bg-grey-lighter">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-slate-600">
                    <UploadCloud size={30} />
                    <span className="mt-2 text-base leading-normal text-slate-600">Select files</span>
                    <input type="file" className="hidden" onChange={handleFileChange} multiple={true} />
                </label>
                <div className="flex flex-wrap gap-4 mt-2">
                    {multipleFiles && multipleFiles.map((file, index) => (
                        <div key={index} className="border border-slate-600 rounded-lg text-sm text-slate-500 px-3 py-1"> {file.name}</div>
                    ))}
                </div>
            </div>
            <GeolocationCapture />
        </div>
    );
};

export default Step4;
