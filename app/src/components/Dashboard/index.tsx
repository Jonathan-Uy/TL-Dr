import { isEmpty } from "../../utils";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../state";

function Dashboard() {
  const [user] = useRecoilState(userState);
  if (isEmpty(user)) {
    return <Navigate to="/login" />;
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
