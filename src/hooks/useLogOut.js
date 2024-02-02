import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../FireBase/FireBase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
const useLogOut = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogOut;
