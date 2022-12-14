import { useRef, useEffect } from "react";
import {
  Box,
  Stack,
  Text,
  HStack,
  Button,
  useColorModeValue,
  Divider,
  Spinner,
  Center
} from '@chakra-ui/react';
import useFirestore from "../src/hook/firestore";
import { useToast } from '@chakra-ui/react';

export default function Home() {
  const firestore = useFirestore();
  const isFirstRender = useRef(true);
  const toast = useToast();
  
  useEffect(() => {
    firestore.subscribeNotifications()
    isFirstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarkAsSeen = event => {
    event.preventDefault();
    const id = event.target.id;
    firestore.markAsSeen(id);
    toast({
      title: 'Marked as seen',
      status: 'success',
      isClosable: true
    })
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
            </HStack>
            {firestore.notificationData ? (
              <>
                {Object.keys(firestore.notificationData).map((keyName, i) => (
                  <Box key={i}>
                    <HStack justifyContent={'space-between'} px={2}>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        {firestore.notificationData[i]['title']['stringValue']}
                      </Text>
                      {firestore.notificationData[i]['seen']['booleanValue'] ? (
                        <Button
                          rounded={'full'}
                          variant={'outline'}
                          size="xs"
                          colorScheme={'teal'}
                          disabled={true}
                          id={firestore.notificationData[i]['id']['integerValue']}
                          onClick={handleMarkAsSeen}>
                          Seen
                        </Button>
                      ) : (
                        <Button
                          rounded={'full'}
                          variant={'outline'}
                          size="xs"
                          colorScheme={'teal'}
                          id={firestore.notificationData[i]['id']['integerValue']}
                          onClick={handleMarkAsSeen}>
                          Mark as seen
                        </Button>
                      )}
                      
                    </HStack>
                    <HStack justifyContent={'space-between'} px={2}>
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
