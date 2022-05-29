import { memo, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useGiphyshContext } from "../hooks/Context";

const Form = () => {
  const debounce = useRef(null);
  const { state, setState, handleSearch } = useGiphyshContext();

  const handleChange = useCallback(
    (event) => {
      clearTimeout(debounce.current);
      setState({ search: event.target.value });
      debounce.current = setTimeout(() => {
        handleSearch(event.target.value);
      }, 1000);
    },
    [setState, handleSearch]
  );

  const handleEnter = useCallback(
    (event) => {
      if (event.charCode === 13) {
        clearTimeout(debounce.current);
        handleSearch(state.search);
      }
    },
    [handleSearch, state.search]
  );

  const handleClear = useCallback(() => {
    setState({ search: "" });
    handleSearch();
  }, [handleSearch, setState]);

  const inputProps = useMemo(
    () => ({
      value: state.search,
      placeholder: state.loading ? "Searching..." : "Let's Start Gyphishing...",
      isDisabled: state.loading,
      onChange: handleChange,
      onKeyPress: handleEnter,
    }),
    [state.loading, state.search, handleChange, handleEnter]
  );

  return (
    <Box w="100%" p={4} maxWidth="60ch">
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input {...inputProps} />
        {state.loading && (
          <InputRightElement children={<Spinner color="blue.400" />} />
        )}
        {!state.loading && state.search && (
          <InputRightElement
            children={<CloseIcon onClick={handleClear} cursor="pointer" />}
          />
        )}
      </InputGroup>
    </Box>
  );
};

export default memo(Form);
