import { FC } from 'react';
import { Text, Modal, ModalBackdrop, ModalContent, ModalHeader, Heading, CloseIcon, Icon, ModalCloseButton, ModalBody, ModalFooter, Button, ButtonText } from '@gluestack-ui/themed';

interface DeleteMessageModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteMessageModal: FC<DeleteMessageModalProps> = ({ visible, onClose, onDelete }) => {
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Warning</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete this message?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="negative"
            borderWidth="$0"
            onPress={onDelete}
          >
            <ButtonText>Delete</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};