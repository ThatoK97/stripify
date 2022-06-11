import { 
    Flex,
    Stack,
    Box,
    Button,
    ButtonGroup,
    InputGroup,
    Input,
    Heading,
    Divider,
    Text,
    RadioGroup,
    Radio,
    Avatar
} from "@chakra-ui/react"
import NavBar from "../components/NavBar"

export default function Settings() {
    return (
        <Stack spacing={8}>
            <Box>
                <NavBar as="nav" m={4}/>
            </Box>
            <Flex justify="center" align="center">
                <Stack spacing={8}>
                    <Avatar
                    size="xl"
                    colorScheme="blackAlpha"
                    />
                    <Box borderRadius="lg" borderWidth="1.5px">
                        <Heading>Settings</Heading>
                        <Divider />
                        <Stack>
                            <Heading>Profile</Heading>
                            <Text>Gender</Text>
                            <RadioGroup>
                                <Stack direction="row">
                                    <Radio>Male</Radio>
                                    <Radio>Female</Radio>
                                    <Radio>Other</Radio>
                                </Stack>
                            </RadioGroup>
                            <InputGroup>
                            <Input 
                            type="password"
                            placeholder="Password reset"
                            />
                            </InputGroup>
                            <Button>Save</Button>
                            
                            <Divider />

                            <ButtonGroup>
                                <Button>Delete Account</Button>
                                <Button>Logout</Button>
                            </ButtonGroup>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Stack>
    )
}

