import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import { 
    Box, Button, Container, VStack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, STORAGE_KEY
 } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { loadStripe } from "@stripe/stripe-js";
import NavBar from "../components/NavBar";
 
export default function Explore () {
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [shows, setShows] = useState([]);
    const item = {
        name: 'Apple AirPods',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        price: 999,
    };
    const [key, setKey] = useState("pk_test_51JJoHJBi68lMh3jq9K7qrRCVYI2NgqjPaLwIkalJHXq7HgmvkmhholvPjXo8aqBj71doFgFVxIQMw5h3THiqA2em00i8e1lb0K");
    const [loading, setLoading] = useState(false);
    const { onClose, isOpen, onOpen } = useDisclosure();
    const spotifyApi = useSpotify();
    useEffect(() => {
        if (spotifyApi.setAccessToken()) {
            spotifyApi
            .getAlbums(albumIds)
            .then(data => setPlaylists(playlists => [...playlists, data.body.albums]))
            .catch(error => console.error(error))
        }
        }, [session, spotifyApi]);
        console.log(playlists);

    useEffect(() => {
        if (spotifyApi.setAccessToken()) {
            spotifyApi
            .getShows()
            .then(data => setShows(shows => [...shows, data.body.shows]))
            .catch(error => console.error(error))
        }
        }, [session, spotifyApi]);
        console.log(shows)
    useEffect(() => {
        fetch('api/keys', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setKey(data.key))
    }, [key])

    const stripePromise = loadStripe(key);
    const createCheckoutSession = async () => {
         setLoading(true);
        const checkoutSession = await fetch('api/create-stripe-session', {
            method: 'POST',
            body: {
                item: item
            }
        })
        const result = (await stripePromise).redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) console.log(result.error.message);
        setLoading(false);
    };

    return (status === "authenticated") ?
    <Box>
        <NavBar as="nav" m={4} />
        <VStack>
            <Container color={'gray'}>Hello there, { session?.user?.name }.</Container>
            <Button
            colorScheme={'teal'} 
            size={'sm'} 
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
                Signout
            </Button>
            <Button
            colorScheme={'teal'} 
            size={'sm'} 
            onClick={onOpen}>
                Checkout
            </Button>
            
            <Modal
            onClose={onClose}
            isOpen={isOpen}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>STRify: Checkout</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Image src={item.image} alt={item.name} width={100} height={50}/>
                            <Text>{ item.name }</Text>
                            <Text>{ item.price }</Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                        colorScheme={'teal'}
                        variant="outline"
                        mr={3}
                        onClick={createCheckoutSession}
                        >
                            {loading ? 'Processing...' : 'Buy'}
                        </Button>
                        <Button
                        colorScheme={'red'}
                        variant="outline"
                        onClick={onClose}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    </Box> :
    null;
}


export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context)
        }
    }
}