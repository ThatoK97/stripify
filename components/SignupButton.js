import { 
    Button,
    ButtonGroup 
    } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SignupButton({ variant, spacing, ...rest }) {
    const router = useRouter()
    
    return (
    <ButtonGroup variant={variant} spacing={spacing} {...rest}>
        <Button colorScheme="whiteAlpha" onClick={() => router.push('/auth/signin')}>Login</Button>
        <Button colorScheme="whiteAlpha" onClick={() => router.push('/auth/signup')}>Signup</Button>
    </ButtonGroup>
    )
}