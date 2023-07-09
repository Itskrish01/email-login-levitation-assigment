import { Input } from "../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";

// Import updateFormData action from store.js
import { updateFormData } from "../features/formSlice";
import { RootState } from "../store/store";

const Step2: React.FC = () => {
    // Get the form data from the store using useSelector hook
    const formData = useSelector((state: RootState) => state.formState);

    // Get a dispatch function from useDispatch hook
    const dispatch = useDispatch();

    // Create a handleChange function that dispatches the updateFormData action with the input name and value
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    return (
        <div className="container max-w-7xl mx-auto w-full space-y-3 sm:mx-0 rounded-lg pt-6 pb-8 mb-4">
            <Input
                type="text"
                name="address_line_1"
                placeholder="Address line one"
                value={formData.address_line_1}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="address_line_2"
                placeholder="Address line two"
                value={formData.address_line_2}
                onChange={handleChange}
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                <Input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <Input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                <Input type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Step2;
