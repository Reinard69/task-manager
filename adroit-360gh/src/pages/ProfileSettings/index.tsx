import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextInput from "../../components/TextInput";
import api from "../../services/api";
import { useAuth } from "../../hooks/auth";

function ProfileSettings() {
  const [cookies] = useCookies();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${cookies["token"]}` },
  };

  useEffect(() => {
    if (cookies["user"] != undefined || cookies["user"] != null) {
      setEmail(cookies["user"]["email"]);
      setPassword(cookies["user"]["password"]);
    }

    return () => {};
  }, [cookies]);

  const handleSave = async () => {
    try {
      await api.put(
        "/update",
        {
          email: email,
        },
        config
      );
      toast("successfully updated");
      auth?.logout();
    } catch (error) {
      toast("something went wrong...");
      throw error;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-3">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <p className="text-3xl font-bold text-black">Profile Settings</p>
        <button
          className="px-3 py-2 bg-blue-400  hover:bg-gray-700  text-white border rounded-lg text-sm w-36 mt-5 shadow-2xl"
          onClick={handleSave}
        >
          Save change
        </button>
      </div>
      <div className="w-full flex flex-col items-center md:justify-center h-full gap-10">
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          tailwindInputStyle="w-96 h-20 text-lg px-3 "
        />
        <TextInput
          label="Password"
          disabled
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          tailwindInputStyle="w-96 h-20 text-lg px-3 "
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ProfileSettings;
