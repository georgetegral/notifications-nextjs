import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export default function AppLayout({children}) {
  return (
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>Resilia</Box>
                <Flex alignItems={'center'}>
                    <Menu>
                    <MenuButton
                        size={'md'}
                        rounded={'full'}
                        minW={5}>
                        <BellIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Link 1</MenuItem>
                        <MenuItem>Link 2</MenuItem>
                        <MenuDivider />
                        <MenuItem>Link 3</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>

        {children}
    </>
  );
}