import { 
    FormControl,
    FormLabel,
    Input, 
    Flex,
    Stack, 
    Button,
    Box,
    Heading,
 } from "@chakra-ui/react";
 import { MdArrowBack } from "react-icons/md";
 import { useRouter } from "next/router";
 import React from "react";

 export default function SignupForm() {
     const router = useRouter()
     
    //  const loginLink = React.forwardRef(({ href }, ref) => {
    //      return (
    //          <a href={href} ref={ref}>login</a>

    //          <FormHelperText>
    //                     Already have an account with STRIPify? Cool, just 
    //                     <Link href='/login' passHref>
    //                         <loginLink />
    //                     </Link> here.
    //                 </FormHelperText>
    //      )
    //  })

     return (
        <Flex justify="center" align="center" h="100vh">
            <Box as="form" p={10} border="1px" borderColor="gray.700" rounded="md" w="300px" color="gray.700" bgColor="gray.50">
                <Stack direction="column" spacing={6}>
                <Button
                    colorSheme="black" 
                    aria-label="back button to home"
                    leftIcon={<MdArrowBack />}
                    size="lg"
                    variant="outline"
                    onClick={() => router.push('/')}
                    >
                        Back home
                    </Button>
                    <Box>
                        <Heading fontSize="xl">
                            Signup to listen to music and make payment using STRIPify.
                        </Heading>
                    </Box>
                    
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input type="text" />
                    </FormControl>

                    <FormControl id="surname">
                        <FormLabel>Surname</FormLabel>
                        <Input type="text" />
                    </FormControl>

                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>

                    

                    <Button>
                        Signup
                    </Button>
                </Stack>
             </Box>
        </Flex>
     )
 }