import { 
    HStack, 
    Avatar,
    InputGroup,
    Input,
    IconButton,
    InputRightElement
  } from "@chakra-ui/react";
  import { MdSearch } from "react-icons/md";
  

export default function NavBar({ props }) {
    return (
        <HStack spacing={6} {...props}>
            <Avatar 
            size="md"
            colorScheme="blackAlpha"
            />

            <InputGroup size="md">
                <Input 
                placeholder="Type something to search here"
                type="text"
                />
                <InputRightElement>
                    <IconButton 
                    colorScheme="blackAlpha" 
                    icon={<MdSearch />}
                    aria-label="Search icon button"
                    variant="outline"
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
    )
}