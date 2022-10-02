import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FileType } from "../../types";
import { deleteDocument } from "../../utils";

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
  const onSubmit = () => {
    deleteDocument(token, selectedFile!._id);
    window.location.reload();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete this document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Are you sure you want to delete this document?</p>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" onClick={onSubmit} marginLeft="10px">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmailModal;
