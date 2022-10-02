import { generateHandoff, getFiles, isEmpty } from "../../utils";
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
  useDisclosure,
} from "@chakra-ui/react";
import { url, uploadFile, downloadDocument } from "../../utils";
import Navbar from "../Navbar.tsx";
import { useEffect, useState } from "react";
import { FileType } from "../../types";
import { HamburgerIcon } from "@chakra-ui/icons";
import PatientSummaryModal from "./PatientSummaryModal";
import EmailModal from "./EmailModal";
import ShareModal from "./ShareModal";
import DeleteModal from "./DeleteModal";

function Dashboard() {
  const [user] = useRecoilState(userState);
  const [files, setFiles] = useState<FileType[]>([]);
  const [documentFile, setDocumentFile] = useState<File>({} as File);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const {
    isOpen: patientSummaryModalIsOpen,
    onOpen: patientSummaryModalOnOpen,
    onClose: patientSummaryModalOnClose,
  } = useDisclosure();
  const {
    isOpen: shareModalIsOpen,
    onOpen: shareModalOnOpen,
    onClose: shareModalOnClose,
  } = useDisclosure();
  const {
    isOpen: emailModalIsOpen,
    onOpen: emailModalOnOpen,
    onClose: emailModalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();
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

  const onGenerate = () => {
    if (selectedFile) {
      generateHandoff(user.token, selectedFile!._id).then(
        window.location.reload
      );
    }
  };

  // const onDownload = () => {
  //   downloadDocument(user.token, selectedFile!._id).then((response) => {
  //     const link = document.createElement("a");
  //     link.target = "_blank";
  //     link.download = "download.pdf";
  //     link.href = URL.createObjectURL(new Blob([response]));
  //     link.click();
  //   });
  // };

  const onSubmit = () => {
    uploadFile(user.token, documentFile)
      .then((response) => {
        console.log(response);
        setFiles([response._doc, ...files]);
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
      <PatientSummaryModal
        token={user.token}
        selectedFile={selectedFile}
        isOpen={patientSummaryModalIsOpen}
        onClose={patientSummaryModalOnClose}
      />
      <EmailModal
        token={user.token}
        selectedFile={selectedFile}
        isOpen={emailModalIsOpen}
        onClose={emailModalOnClose}
      />
      <ShareModal
        token={user.token}
        selectedFile={selectedFile}
        isOpen={shareModalIsOpen}
        onClose={shareModalOnClose}
      />
      <DeleteModal
        token={user.token}
        selectedFile={selectedFile}
        isOpen={deleteModalIsOpen}
        onClose={deleteModalOnClose}
      />
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
                  <Th width="20%">Owner</Th>
                  <Th width="20%">Type</Th>
                  <Th width="20%">Date created</Th>
                  <Th width="5%">Actions</Th>
                </Tr>
                {files.map((file, index) => (
                  <Tr key={index}>
                    <Td>
                      {/* <Link href={`/document/${file._id}`}>{file.name}</Link> */}
                      {file.name}
                    </Td>
                    <Td>{file.owner.name}</Td>
                    <Td>{file.type}</Td>
                    <Td>{new Date(file.created).toLocaleDateString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton onClick={() => setSelectedFile(file)}>
                          <HamburgerIcon />
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={onGenerate}>
                            Generate handoff document
                          </MenuItem>
                          <MenuItem onClick={patientSummaryModalOnOpen}>
                            Generate summary/translation
                          </MenuItem>
                          {/* <MenuItem onClick={shareModalOnOpen}>
                            Share document
                          </MenuItem> */}
                          <MenuItem onClick={emailModalOnOpen}>
                            Email document
                          </MenuItem>
                          {/* <MenuItem onClick={onDownload}>
                            Download document
                          </MenuItem> */}
                          <MenuItem color="red" onClick={deleteModalOnOpen}>
                            Delete document
                          </MenuItem>
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
