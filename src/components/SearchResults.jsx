import { memo, useMemo } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useGiphyshContext } from "../Context";
import SearchResultsItem from "./SearchResultsItem";

const SearchResults = () => {
  const { state } = useGiphyshContext();
  const { data } = state;

  const gridProps = useMemo(
    () => ({
      templateColumns: { base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
      gap: { base: 2, md: 4 },
      w: "100%",
      maxWidth: { base: "100%", md: "80vw" },
      p: { base: 4, md: 8 },
      pt: 0,
    }),
    []
  );

  const notFoundProps = useMemo(
    () => ({
      colSpan: { base: 2, md: 4 },
    }),
    []
  );

  return (
    <Grid {...gridProps}>
      {data && data.length > 0 ? (
        data.map((image, index) => (
          <SearchResultsItem image={image} key={index} />
        ))
      ) : (
        <GridItem {...notFoundProps}>
          <Text align="center" fontSize="2xl">
            "Sorry! No 🐟 in the barrel..."
          </Text>
        </GridItem>
      )}
    </Grid>
  );
};

export default memo(SearchResults);
