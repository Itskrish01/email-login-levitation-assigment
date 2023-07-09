import React, { useState, useEffect, useRef } from "react";
import { Input } from "../components/UI/Input";
import { useDispatch } from "react-redux";
import { addDialCode, updateFormData } from "../features/formSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChevronDown } from "lucide-react";

const Step1: React.FC = () => {
    const formData = useSelector((state: RootState) => state.formState);
    const dispatch = useDispatch();
    const [countryCodeDropdownShow, setCountryCodeDropdownShow] = useState<boolean>(false)
    const [countriesData, setCountriesData] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<object | undefined>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/src/data/countries.json');
                const jsonData = await response.json();
                setCountriesData(jsonData);
                setSelectedCountry(jsonData[87])
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Autofocus on the input element when a country is selected
        }
    }, [selectedCountry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    useEffect(() => {
        if (selectedCountry) {
            dispatch(addDialCode(selectedCountry.dial_code))
        }
    }, [selectedCountry])


    return (
        <div className="bg-white w-full space-y-3 sm:mx-0 rounded-lg pt-6 pb-8 mb-4">
            <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="User name"
            />
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <div className="relative flex">
                {countryCodeDropdownShow && <div id="style-3" className="h-44 w-36 border border-slate-300 rounded-lg absolute top-14 overflow-auto bg-white px-1 py-1">
                    {countriesData.map((item) => (
                        <div
                            key={item.code}
                            onClick={() => { setSelectedCountry(item); setCountryCodeDropdownShow(false) }}
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded py-2 px-2"
                        >
                            <img src={`data:image/png;base64,${item.flag}`} alt={item.name} className="rounded" />
                            <span className="text-sm text-slate-700">{item.dial_code}</span>
                        </div>
                    ))}
                </div>}


                <div
                    onClick={() => setCountryCodeDropdownShow(!countryCodeDropdownShow)}
                    className="flex items-center border sm:w-44 w-20 gap-3 sm:gap-5 border-slate-300 justify-between cursor-pointer hover:bg-gray-100 rounded-l-lg py-2 px-4"
                >
                    <div className="flex items-center gap-2">
                        <img src={`data:image/png;base64,${selectedCountry?.flag}`} className="hidden sm:block" alt={selectedCountry?.name} />
                        <span className="text-sm text-slate-700 whitespace-nowrap">{selectedCountry?.dial_code}</span>
                    </div>
                    <ChevronDown size={14} />
                </div>
                <input
                    type="number"
                    ref={inputRef}
                    className="h-12 w-full rounded-r-xl border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Step1;
