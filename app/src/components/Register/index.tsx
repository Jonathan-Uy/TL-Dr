import { Stack, Input, Button, useToast, Link } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userState } from "../../state";
import { isEmpty, register } from "../../utils";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [user] = useRecoilState(userState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  const onSubmit = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password error.",
        description: "Passwords do not match.",
        status: "error",
        isClosable: true,
      });
    }

    register(name, email, password)
      .then(() =>
        toast({
          title: "Registration successful.",
          description: "You can now log in.",
          status: "success",
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: "Registration error.",
          description:
            "There was a problem registering, please try again later.",
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
        HandJob
      </p>
      <Stack direction="column" alignItems="center">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          width="100%"
          onClick={onSubmit}
          disabled={
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
          }
        >
          Register
        </Button>
        <Link
          color="teal.500"
          href="/login"
          paddingTop="10px"
          fontWeight="medium"
        >
          Go to Login
        </Link>
      </Stack>
    </Stack>
  );
}

export default Register;
