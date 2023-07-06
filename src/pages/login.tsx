import { Navigate, redirect } from "react-router-dom";
import AuthForm from "../components/Forms/AuthForm";
import { setAuthToken } from "../features/authSlice";
import useLogin from "../hooks/useLogin";
import { useDispatch } from "react-redux"


function LoginPage() {
  const dispatch = useDispatch()
  const { login, isLoading, isError, errorStatement } = useLogin();




  // Check if the auth token exists in localStorage
  const authTokenFromStorage = localStorage.getItem('authToken');

  // If the auth token exists in localStorage, set it in the Redux state
  if (authTokenFromStorage) {
    dispatch(setAuthToken(authTokenFromStorage));
    return <Navigate to="/" replace />;
  }

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then((responseData) => {
        // Handle successful login respons
        console.log(responseData);
        // Set the auth token in the Redux state
        dispatch(setAuthToken(responseData.authToken));

        // Store the auth token in localStorage
        localStorage.setItem('authToken', responseData.authToken);
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center w-full items-center h-screen">
      <h1 className="text-3xl sm:text-left text-center mb-20 uppercase">Sign in to your app</h1>
      <AuthForm onLogin={handleLogin} isLoading={isLoading} isError={isError} errorStatement={errorStatement} />
    </div>
  );
}

export default LoginPage;
