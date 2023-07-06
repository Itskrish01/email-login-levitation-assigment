import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatement, setErrorStatement] = useState("");

  const headers = {
    "Content-Type": "application/json",
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    return await axios
      .post(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login",
        { email, password },
        { headers }
      )
      .then((response) => {
        setIsError(false);
        setErrorStatement("");
        return response.data; // Return the response data if needed
      })
      .catch((error) => {
        setIsError(true);
        setErrorStatement(error.response.data.message);
        throw error; // Throw the error to be handled by the caller
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { login, isLoading, isError, errorStatement };
};

export default useLogin;
