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
} from "@chakra-ui/react";
import { url, uploadFile } from "../../utils";
import Navbar from "../Navbar.tsx";
import { useEffect, useState } from "react";
import { FileType } from "../../types";

function Dashboard() {
  const [user] = useRecoilState(userState);
  const [files, setFiles] = useState<FileType[]>([]);
  const [documentFile, setDocumentFile] = useState<File>({} as File);
  const toast = useToast();

  useEffect(() => {
    if (!isEmpty(user)) {
      getFiles(user.token).then((response) => setFiles(response.files));
    }
  }, [user]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentFile(e.target.files![0]);
  };

  const onSubmit = () => {
    if (uploadFile === null) {
      return;
    }

    let formData = new FormData();
    formData.append("document", documentFile);

    uploadFile(user.token, formData)
      .then((response) => {
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
        <VStack width="60%" alignItems="flex-start">
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
                  <Th width="60%">Name</Th>
                  <Th width="15%">Size</Th>
                  <Th width="25%">Date created</Th>
                </Tr>
                {files.map((file) => (
                  <Tr>
                    <Td>{file.name}</Td>
                    <Td>{file.size}</Td>
                    <Td>{file.created.toString()}</Td>
                  </Tr>
                ))}
              </Thead>
            </Table>
          </TableContainer>
        </VStack>
        <VStack width="30%" alignItems="flex-start">
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
              onChange={(e) => handleSelectFile}
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
