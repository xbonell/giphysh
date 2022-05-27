import { memo, useMemo } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { useGiphyshContext } from "../Context";

const Footer = () => {
  const { state, handleSearch } = useGiphyshContext();

  const showLoadMore = useMemo(
    () => state.lastSearch?.pagination?.total_count > state.data?.length,
    [state.data, state.lastSearch?.pagination?.total_count]
  );

  const buttonProps = useMemo(() => {
    const offset =
      state.lastSearch?.pagination?.count +
      state.lastSearch?.pagination?.offset;
    return {
      isLoading: state.loading,
      loadingText: "Loading",
      onClick: () => handleSearch(state.search, offset),
    };
  }, [
    state.lastSearch?.pagination?.count,
    state.lastSearch?.pagination?.offset,
    state.loading,
    state.search,
    handleSearch,
  ]);

  return (
    <VStack p={6} pt={0} spacing={8}>
      {showLoadMore && <Button {...buttonProps}>Get more 🐟</Button>}
      <Text fontSize="xs">© 2022</Text>
    </VStack>
  );
};

export default memo(Footer);
