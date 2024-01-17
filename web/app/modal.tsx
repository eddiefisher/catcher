'use client'

import { CopyIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Icon } from "@chakra-ui/react"

export default function ItemModal({ text }: { text: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} size='sm'>Show body</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Body
            <Button ml='4' colorScheme='blue' variant='ghost' onClick={() => { navigator.clipboard.writeText(text) }}>
              <Icon as={CopyIcon}></Icon>
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='0.7em'><pre>{JSON.stringify(JSON.parse(text), null, 2)}</pre></Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} size='sm'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
