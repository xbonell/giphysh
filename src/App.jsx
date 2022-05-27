import { memo } from "react";
import { extendTheme, ChakraProvider, VStack } from "@chakra-ui/react";
import { GiphyshProvider } from "./Context";
import Header from "./components/Header";
import Form from "./components/Form";
import SearchResults from "./components/SearchResults";
import Footer from './components/Footer';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <GiphyshProvider>
        <VStack maxWidth="100vw" p={0}>
          <Header />
          <Form />
          <SearchResults />
          <Footer />
        </VStack>
      </GiphyshProvider>
    </ChakraProvider>
  );
};

export default memo(App);
