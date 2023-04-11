import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthModeTypes } from "../../types/userType";
import { useAuth } from "../../hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "registration">("login");
  const auth = useAuth();

  const handleLogin = async () => {
    if (email.length <= 0 || password.length <= 0) {
      return;
    }
    try {
      await auth?.login({ email, password });
    } catch (error: any) {
      toast(error.email ?? error.password);
    }
  };

  const handleRegistration = async () => {
    if (email.length <= 0 || password.length <= 0 || isError) {
      return;
    }
    try {
      await auth?.signup({ email, password });
    } catch (error: any) {
      toast(error.email ?? error.password);
    }
  };

  const handleAuthState = () => {
    if (authMode === AuthModeTypes.login) {
      setAuthMode("registration");
      return;
    }
    setAuthMode("login");
  };

  useEffect(() => {
    if (
      password.length > 0 &&
      confirmPassword !== password &&
      authMode === AuthModeTypes.register
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    return () => {};
  }, [confirmPassword]);

  return (
    <motion.div
      whileInView={{ y: [-100, -50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="flex w-full h-screen justify-center overflow-hidden items-center bg-gray-900 relative"
    >
      <motion.div
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"
      ></motion.div>

      <motion.div
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"
      ></motion.div>
      <motion.div
        whileInView={{ y: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container flex h-96 w-5/6 md:w-2/4 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm"
      >
        <div className="h-full flex flex-col justify-evenly items-center w-full md:w-1/2">
          <div className="text-white font-poppins text-2xl tracking-widest font-semibold">
            {authMode == AuthModeTypes.login ? "Login" : "Sign Up"}
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="input-text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="input-text"
          />
          <AnimatePresence>
            {authMode == AuthModeTypes.register ? (
              <>
                <motion.input
                  whileInView={{ y: [-50, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: -10, opacity: 0 }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password..."
                  type="password"
                  className="input-text"
                />
                {isError ? (
                  <p className="text-red-500">Does not match</p>
                ) : null}
              </>
            ) : null}
          </AnimatePresence>
          {authMode === AuthModeTypes.login ? (
            <button
              onClick={handleLogin}
              type="submit"
              className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleRegistration}
              type="submit"
              className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80"
            >
              Register Account
            </button>
          )}
          <button
            onClick={handleAuthState}
            type="submit"
            className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-transparent bg-opacity-50 hover:text-blue-300 underline hover:bg-opacity-80 text-white"
          >
            {authMode === AuthModeTypes.login
              ? "New here? Sign up"
              : "Already have an account? Click here to log in"}
          </button>
        </div>
        <div className="w-1/2  flex-col justify-center bg-gradient-to-b from-green-400/50 to-blue-500/90  bg-opacity-10 backdrop-filter backdrop-blur-sm border-opacity-30 rounded-r-2xl pl-6 hidden md:flex">
          <p className="text-white text-2xl font-bold w-1/2">
            Organize your work and life, finally.
          </p>
          <p className="text-white text-md mt-3">
            Trust us to manage your tasks for you
          </p>
        </div>
      </motion.div>
      <ToastContainer position="top-center" />
    </motion.div>
  );
}
