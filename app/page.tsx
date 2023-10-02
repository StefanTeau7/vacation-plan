"use client"; // This is a client component 👈🏽
import { Home } from "@/src/screens/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";


export default function Page() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}