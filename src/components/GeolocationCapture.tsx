import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { captureGeolocation } from "../features/formSlice";

interface GeolocationPosition {
    coords: {
        latitude: number;
        longitude: number;
    };
}

const GeolocationCapture: React.FC = () => {
    const dispatch = useDispatch();
    const [geolocation, setGeolocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    useEffect(() => {
        const captureGeolocationData = () => {
            setIsCapturing(true);

            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const latitude = position.coords.latitude.toString();
                    const longitude = position.coords.longitude.toString();
                    const geolocationString = `${latitude},${longitude}`; // Concatenate latitude and longitude with a separator

                    setGeolocation(geolocationString);
                    dispatch(captureGeolocation(geolocationString));
                    setIsCapturing(false);
                    setIsConfirmed(true);
                },
                (error) => {
                    setError(error.message);
                    setIsCapturing(false);
                }
            );
        };

        captureGeolocationData();
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center mt-8">
            <div className="mb-4 text-2xl text-gray-800 font-semibold">
                Geolocation Capture
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
                <div className="mb-2">
                    <span className="font-semibold text-gray-800">Status: </span>
                    {isConfirmed
                        ? "Geolocation captured"
                        : isCapturing
                            ? "Capturing geolocation..."
                            : "Geolocation not captured"}
                </div>
                {geolocation && (
                    <div className="mb-2">
                        <span className="font-semibold text-gray-800">Geolocation: </span>
                        {geolocation}
                    </div>
                )}
                {error && (
                    <div className="text-red-600 mb-2">
                        <span className="font-semibold text-gray-800">Error: </span>
                        {error}
                    </div>
                )}
                {isCapturing && (
                    <div className="text-gray-600">Capturing geolocation...</div>
                )}
            </div>
        </div>
    );
};

export default GeolocationCapture;
