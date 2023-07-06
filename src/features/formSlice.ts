import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Define an interface for the form data state
interface FormDataState {
  username: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  dialCode: string;
  single_file: File | null;
  multiple_files: File[] | null;
  geolocation: GeolocationData | null;
}

// Define an interface for the updateFormData payload
interface UpdateFormDataPayload {
  name: keyof FormDataState;
  value: any;
}

// Define an interface for geolocation data
interface GeolocationData {
  latitude: string;
  longitude: string;
}

interface DialCodePayload {
  dialCode: string;
}

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    username: "",
    email: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    single_file: null,
    multiple_files: null,
    geolocation: null,
    dialCode: "",
  } as FormDataState,
  reducers: {
    updateFormData: (state, action: PayloadAction<UpdateFormDataPayload>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    addSingleFile: (state, action: PayloadAction<File>) => {
      state.single_file = action.payload;
    },
    addMultipleFiles: (state, action: PayloadAction<File[]>) => {
      if (state.multiple_files === null) {
        state.multiple_files = action.payload.slice(0, 5); // Limit to first 5 files
      } else {
        const remainingSpace = 5 - state.multiple_files.length;
        if (remainingSpace === 0) {
          toast.error("You have reached the file limit.");
        } else {
          const filesToAdd = action.payload.slice(0, remainingSpace);
          state.multiple_files.push(...filesToAdd);
        }
      }
    },
    captureGeolocation: (state, action: PayloadAction<GeolocationData>) => {
      state.geolocation = action.payload;
      toast.success("Geolocation captured successfully.");
    },
    addDialCode: (state, action: PayloadAction<DialCodePayload>) => {
      state.dialCode = action.payload;
    },
  },
});

// Export the actions and the reducer of the slice
export const {
  updateFormData,
  addSingleFile,
  addMultipleFiles,
  captureGeolocation,
  addDialCode,
} = formDataSlice.actions;
export const formDataReducer = formDataSlice.reducer;
