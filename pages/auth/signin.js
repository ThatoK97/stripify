import { 
    FormControl,
    FormLabel,
    Input, 
    Flex,
    Stack, 
    Button,
    Box,
    Heading
 } from "@chakra-ui/react";
 import { MdArrowBack } from "react-icons/md";
 import { useRouter } from "next/router";
 import { getProviders, signIn } from "next-auth/react";

export default function LoginForm({ providers }) {
     const router = useRouter();
     return (
        <Flex justify="center" align="center" h="100vh">
            <Box as="form" p={10} border="1px" borderColor="gray.500" rounded="md" w="300px" color="gray.500" bgColor="gray.50">
                <Stack direction="column" spacing={6}>
                <Button
                    color_scheme="black" 
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
                            Login to STRIPify.
                        </Heading>
                    </Box>
                    
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    // use email login credentials via mongodb api
                    <Button
                    onClick={() => router.push('/explore')}
                    >
                        Login
                    </Button> {' '}
                    {Object.values(providers).map(provider =>
                    <Button
                    key={provider.name}
                    onClick={() => signIn('spotify', { callbackUrl: 'http://localhost:3000/explore' })}
                    >
                        { provider.name }
                    </Button>
                    )}
                </Stack>
             </Box>
        </Flex>
     )
 }

 export async function getServerSideProps() {
     return {
         props: {
             providers:  await getProviders()
         }
     }
 }