import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  // 1.load the authenticated user.
  const { isLoading, isAuthenticate } = useUser();
  //2. while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //3.if there is no authenticated user redirct to login page
  if (!isAuthenticate && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  //4. if there is user render app
  if (isAuthenticate) return children;
}
