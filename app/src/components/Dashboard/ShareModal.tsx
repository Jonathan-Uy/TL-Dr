import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FileType, User } from "../../types";
import { getOtherDoctors, shareDocument } from "../../utils";

type ShareModalProps = {
  token: string;
  selectedFile: FileType | null;
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal = ({
  token,
  selectedFile,
  isOpen,
  onClose,
}: ShareModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    getOtherDoctors(token).then((response) => {
      setUsers(response);
    });
  }, [token, isOpen]);

  const onSubmit = () => {
    shareDocument(token, selectedFile!._id, selectedUserId);
    setSelectedUserId("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share this document with another doctor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Select a language"
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {users.map((user) => (
              <option value={user._id}>{user.name}</option>
            ))}
          </Select>
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

export default ShareModal;
