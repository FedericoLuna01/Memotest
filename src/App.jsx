import { RepeatIcon } from "@chakra-ui/icons"
import { Button, Card, CardBody, Center, Grid, GridItem, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import './fireworks.css'

const IMAGES = [
  'https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/c-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/django-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor',
  'https://icongr.am/devicon/python-original.svg?size=128&color=currentColor',
]
.flatMap((image) => [`a|${image}`, `b|${image}`])
.sort(() => Math.random() - 0.5)

export const App = () => {
  const [guessed, setGuessed] = useState([])
  const [selected, setSelected] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleReload = () => {
    location.reload()
  }

  useEffect(() => {
    if(selected.length === 2) {
      if(selected[0].split('|')[1] === selected[1].split('|')[1]) {
        setGuessed([...guessed, ...selected])
      }

      setTimeout(() => {
        setSelected([])
      }, 1000);
    }

  }, [selected])
  
  useEffect(() => {
    if(guessed.length === IMAGES.length) {
      onOpen()
    }
  }, [guessed])
  
  
  return (
    <Center
      flexDirection={'column'}
      gap={8}
      bg='gray.800'
      h='100vh'
    >

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        colorScheme='gray'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
          </div>
          <ModalCloseButton />
          <ModalBody
            textAlign='center'
            py={12}
          >
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
            <Heading>¡Felicitaciones!</Heading>
            <Heading>¡Ganaste!</Heading>
            <Button 
              mt={12}
              colorScheme='blackAlpha' 
              onClick={handleReload} 
              rightIcon={<RepeatIcon />} 
            >
              Reiniciar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid
        templateColumns='repeat(5, 1fr)' gap={5}
        bg='gray.900'
        p={16}
        borderRadius='xl'
        boxShadow='xl'
      >
        {
          IMAGES.map((image) => {
          const [, url] = image.split('|')
          return ( 
            <GridItem
              key={image}
              w='150px'
              h='150px'
              cursor='pointer'
              onClick={() => selected.length < 2 && setSelected([...selected, image])}
            >
              <Card>
                <CardBody>
                  {
                    selected.includes(image) || guessed.includes(image) ?
                      (<Image src={url}/>)
                      :
                      (<Image src='https://icongr.am/fontawesome/question.svg?size=128&color=currentColor'/>)
                  }
                </CardBody>
              </Card>
            </GridItem>
          )}
          )
        }
      </Grid>
      <Button 
        onClick={handleReload}
        colorScheme='gray'
      >
        <RepeatIcon />
      </Button>
    </Center>
  )
}
