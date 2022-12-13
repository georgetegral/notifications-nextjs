import { createContext, useContext, useState } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Divider
} from '@chakra-ui/react';
import useFirestore from "../src/hook/firestore";

export default function Home() {
  const firestore = useFirestore();
  const [notificationData, setNotificationData] = useState(null);

  const handleSignUpClick = event => {
		event.preventDefault()
    firestore.subscribeNotifications()
		setNotificationData(firestore.notificationData);
    console.log(firestore.notificationData)
	}

  return (
    <>
      <Stack
            spacing={{ base: 6, sm: 6 }}
            direction={'column'}
            >
            <HStack justifyContent={'space-between'} px={2}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                Notifications
              </Text>
              <Button
                rounded={'full'}
                variant={'solid'}
                colorScheme={'teal'}
                onClick={handleSignUpClick}>
                Get Notifications
              </Button>
            </HStack>
            {notificationData && (
              <>
                {Object.keys(notificationData).map((keyName, i) => (
                  <Box>
                    <Text
                      fontSize={{ base: '16px', lg: '18px' }}
                      color={useColorModeValue('yellow.500', 'yellow.300')}
                      fontWeight={'500'}
                      textTransform={'uppercase'}
                      mb={'4'}>
                      {notificationData[i]['title']['stringValue']}
                    </Text>
                    <span>Date: {notificationData[i]['date']['timestampValue']}</span>
                    <span>Description: {notificationData[i]['description']['stringValue']}</span>
                    <span>Seen: {notificationData[i]['seen']['booleanValue']}</span>
                    <Divider />
                  </Box>
                  
                ))}
              </>
            )}
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box>
          </Stack>
    </>
  )
}
