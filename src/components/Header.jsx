import { memo } from "react";
import { Heading, VStack, Image } from "@chakra-ui/react";
import fish from "../assets/fish.png";

const Header = () => {
  return (
    <VStack align="center" pt={8} pr={4} pb={8} pl={4}  spacing={2}>
      <Image src={fish} alt="" w={'15vw'} />
      <Heading as="h1" size="4xl">
        Giphysh
      </Heading>
    </VStack>
  );
};

export default memo(Header);
