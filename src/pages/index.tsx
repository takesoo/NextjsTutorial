import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<Box textAlign={"center"} py={10} px={6} bg={"brand.100"}>
			<Heading as="h1" size={"xl"} mb={4}>
				Welcome to My Next.js App
			</Heading>
			<Text fontSize="lg" color="gray.500" mb={6}>
				This is the home page.
			</Text>
			<Link href={"/about"} passHref>
				<Button colorScheme="teal" size={"lg"}>
					Go to About Page
				</Button>
			</Link>
		</Box>
	);
}
