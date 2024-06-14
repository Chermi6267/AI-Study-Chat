import { useSelector } from "react-redux";

// A hook for retrieving user data
export function useAuth() {
  const { id, email, username, token, phone } = useSelector(
    (state) => state.user
  );

  return {
    isAuth: !!id,
    id: id,
    email: email,
    username: username,
    token: token,
    phone: phone,
  };
}
