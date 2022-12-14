import { createContext, useContext, useState, useRef, useEffect } from "react";
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
  Divider,
  Spinner,
  Center
} from '@chakra-ui/react';
import useFirestore from "../src/hook/firestore";

export default function Home() {
  const firestore = useFirestore();
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    firestore.subscribeNotifications()
    isFirstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            </HStack>
            {firestore.notificationData ? (
              <>
                {Object.keys(firestore.notificationData).map((keyName, i) => (
                  <Box key={i}>
                    <Text
                      fontSize={{ base: '16px', lg: '18px' }}
                      fontWeight={'500'}
                      textTransform={'uppercase'}
                      mb={'4'}>
                      {firestore.notificationData[i]['title']['stringValue']}
                    </Text>
                    <HStack justifyContent={'space-between'}>
                      <Text as={'span'} fontWeight={'bold'}>
                        {firestore.notificationData[i]['description']['stringValue']}
                      </Text>
                      <Text as={'span'}>
                        {new Date(firestore.notificationData[i]['date']['timestampValue']).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <Divider />
                  </Box>
                  
                ))}
              </>
            ) : (
              <Center>
                <Spinner size='xl' />
              </Center>
              
            )}
          </Stack>
    </>
  )
}
