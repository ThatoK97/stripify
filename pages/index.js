import {
    Box,
    Stack,
    Text,
    Heading,
    Flex,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Spacer
} from "@chakra-ui/react"
import { MdMenu, MdExplore, MdSettings } from "react-icons/md"
import SignupButton from "../components/SignupButton"


export default function Home() { 
    return (
        <Box bgGradient="linear(135deg, green.500, gray.900)" w="100%" h="655px" >
            <Stack spacing={6}>
                <Flex as="nav">
                    <Menu>
                        <MenuButton 
                        as={IconButton}
                        colorScheme="gray.900"
                        icon={<MdMenu />}
                        variant="outline"
                        aria-label="Options"
                        m={4}
                        />
                        <MenuList>
                            <MenuItem icon={<MdExplore />}>Explore</MenuItem>
                            <MenuItem icon={<MdSettings />}>Settings</MenuItem>
                        </MenuList>
                    </Menu>
                    <Spacer />
                    <SignupButton 
                    variant="outline"
                    spacing={4}
                    m={4}
                    />
                </Flex>
                <Heading size="4xl" align="center" color="white">Welcome to  STRIPify.</Heading>
                <Text fontSize="6xl" align="center" color="white">Purchasing music made </Text>
                <Text fontSize="6xl" align="center" color="white">easy with STRIPify</Text>
            </Stack>
        </Box>
        
    )
}

