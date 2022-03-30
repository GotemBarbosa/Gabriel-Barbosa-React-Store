import { useNavigate, useParams, useLocation } from "react-router-dom";

export const withRouter = (Children) => {
  return (props) => {
    const navigate = useNavigate();
    const match = { params: useParams() };
    const location = useLocation();
    return (
      <Children
        {...props}
        match={match}
        navigate={navigate}
        location={location}
      />
    );
  };
};
