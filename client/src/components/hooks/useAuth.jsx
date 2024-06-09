import { useSelector } from "react-redux";

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
