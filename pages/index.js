import {
  Button,
} from '@chakra-ui/react';
import useFirestore from "../src/hook/firestore"

export default function Home() {
  const firestore = useFirestore();
  
  const handleSignUpClick = event => {
		event.preventDefault()
		firestore.subscribeNotifications();
    console.log(firestore)
	}

  return (
    <>
      <Button
        rounded={'full'}
        variant={'solid'}
        colorScheme={'teal'}
        onClick={handleSignUpClick}>
        Get Notifications
      </Button>
    </>
  )
}
