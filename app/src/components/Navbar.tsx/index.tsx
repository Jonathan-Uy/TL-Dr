import { Stack, Link, HStack } from "@chakra-ui/react";
import { logout } from "../../utils";

function Navbar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="black"
      width="100%"
      color="white"
      padding="16px"
    >
      <Link fontSize="24px" marginLeft="40px" fontWeight="bold" href="/">
        TL;Dr.
      </Link>
      <HStack
        fontSize="18px"
        marginRight="40px"
        width="25%"
        justifyContent="space-evenly"
      >
        <Link href="/">Dashboard</Link>
        <Link href="/patients">Patients</Link>
        <Link onClick={logout}>Logout</Link>
      </HStack>
    </Stack>
  );
}

export default Navbar;
