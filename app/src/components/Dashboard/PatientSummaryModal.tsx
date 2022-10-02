import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { FileType } from "../../types";
import { generatePatientSummary } from "../../utils";

// top 10 most spoken languages
const languages = ["Spanish", "French", "Italian", "German"];

type PatientSummaryModalProps = {
  token: string;
  selectedFile: FileType | null;
  isOpen: boolean;
  onClose: () => void;
};

const PatientSummaryModal = ({
  token,
  selectedFile,
  isOpen,
  onClose,
}: PatientSummaryModalProps) => {
  const [shouldTranslate, setShouldTranslate] = useState(false);
  const [language, setLanguage] = useState("");

  const onSubmit = () => {
    if (shouldTranslate) {
      generatePatientSummary(token, selectedFile!._id, language);
    } else {
      generatePatientSummary(token, selectedFile!._id);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Generate a Summary Report for a Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Checkbox
            isChecked={shouldTranslate}
            onChange={() => setShouldTranslate(!shouldTranslate)}
          >
            Generate summary with translation
          </Checkbox>
          <Select
            isReadOnly={!shouldTranslate}
            placeholder="Select a language"
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <option value={language}>{language}</option>
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

export default PatientSummaryModal;
