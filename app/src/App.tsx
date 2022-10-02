import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { getFromStorage, getUser } from "./utils";
import { useSetRecoilState } from "recoil";
import { userState } from "./state";
import { useEffect } from "react";
import { User } from "./types";

function App() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (getFromStorage("token") !== null) {
      getUser(getFromStorage("token")!).then((response) => {
        setUser(response as User);
      });
    }
  }, [setUser]);

  return (
    <ChakraProvider>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
