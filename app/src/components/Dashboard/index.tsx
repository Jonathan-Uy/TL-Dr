import { getFiles, isEmpty } from "../../utils";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../state";
import {
  Stack,
  Input,
  Button,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  useToast,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { url, uploadFile } from "../../utils";
import Navbar from "../Navbar.tsx";
import { useEffect, useState } from "react";
import { FileType } from "../../types";
import { HamburgerIcon } from "@chakra-ui/icons";

function Dashboard() {
  const [user] = useRecoilState(userState);
  const [files, setFiles] = useState<FileType[]>([]);
  const [documentFile, setDocumentFile] = useState<File>({} as File);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!isEmpty(user)) {
      getFiles(user.token).then((response) => {
        setFiles(response);
      });
    }
  }, [user]);

  const handleSelectFile = (file: File) => {
    setDocumentFile(file);
  };

  const onSubmit = () => {
    uploadFile(user.token, documentFile)
      .then((response) => {
        console.log(response);
        setFiles([response, ...files]);
        toast({
          title: "File uploaded.",
          description: `Your file ${response.name} has been uploaded.`,
          status: "success",
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "File upload error.",
          description: "There was an error uploading your file.",
          status: "error",
          isClosable: true,
        });
      });
  };

  if (isEmpty(user)) {
    return <Navigate to="/login" />;
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      height="100%"
    >
      <Navbar />
      <Stack
        direction="row"
        width="80%"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingTop="40px"
      >
        <VStack width="70%" alignItems="flex-start">
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "medium",
              marginBottom: "20px",
            }}
          >
            Documents
          </h1>
          <TableContainer width="100%">
            <Table>
              <Thead>
                <Tr>
                  <Th width="40%">Name</Th>
                  <Th width="15%">Type</Th>
                  <Th width="15%">Size (KB)</Th>
                  <Th width="25%">Date created</Th>
                  <Th width="5%">Actions</Th>
                </Tr>
                {files.map((file, index) => (
                  <Tr key={index}>
                    <Td>
                      <Link href={`/document/${file._id}`}>{file.name}</Link>
                    </Td>
                    <Td>{file.type}</Td>
                    <Td>{Math.round((file.size / 1000.0) * 10) / 10}</Td>
                    <Td>{new Date(file.created).toLocaleDateString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton onClick={() => setSelectedFile(file)}>
                          <HamburgerIcon />
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Generate handoff document</MenuItem>
                          <MenuItem>Generate summary/translation</MenuItem>
                          <MenuItem color="red">Delete document</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Thead>
            </Table>
          </TableContainer>
        </VStack>
        <VStack width="20%" alignItems="flex-start">
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "medium",
              marginBottom: "20px",
            }}
          >
            Upload File
          </h1>
          <form
            action={`${url}/file/upload`}
            method="post"
            encType="multipart/form-data"
          >
            <Input
              type="file"
              name="document"
              width="100%"
              height="50px"
              padding="9px"
              marginBottom="20px"
              onChange={(e) => handleSelectFile(e.target.files![0])}
            />
            <Button colorScheme="teal" onClick={onSubmit}>
              Upload
            </Button>
          </form>
        </VStack>
      </Stack>
    </Stack>
  );
}

export default Dashboard;
