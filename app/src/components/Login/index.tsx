import { Stack, Input, Button, useToast, Link } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userState } from "../../state";
import { isEmpty, login } from "../../utils";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [user, setUser] = useRecoilState(userState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const onSubmit = () => {
    login(email, password)
      .then((response) => {
        setUser({
          ...response.user,
          token: response.token,
        });
        window.location.assign("/");
      })
      .catch(() =>
        toast({
          title: "Login error.",
          description:
            "There was a problem logging in, please check your username and password.",
          status: "error",
          isClosable: true,
        })
      );
  };

  if (!isEmpty(user)) {
    return <Navigate to="/" />;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <p
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        TL;Dr.
      </p>
      <Stack direction="column" alignItems="center">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          width="100%"
          onClick={onSubmit}
          disabled={email === "" || password === ""}
        >
          Login
        </Button>
        <Link
          color="teal.500"
          href="/register"
          paddingTop="10px"
          fontWeight="medium"
        >
          Go to Register
        </Link>
      </Stack>
    </Stack>
  );
}

export default Login;
