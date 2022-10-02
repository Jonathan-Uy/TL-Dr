import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { FileType } from "../../types";
import { emailDocument } from "../../utils";

type EmailModalProps = {
  token: string;
  selectedFile: FileType | null;
  isOpen: boolean;
  onClose: () => void;
};

const EmailModal = ({
  token,
  selectedFile,
  isOpen,
  onClose,
}: EmailModalProps) => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    emailDocument(token, selectedFile!._id, email);
    setEmail("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Email this document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" onClick={onSubmit} marginLeft="10px">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmailModal;
