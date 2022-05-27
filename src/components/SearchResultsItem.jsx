import { memo, useCallback, useMemo } from "react";
import {
  useToast,
  GridItem,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

const SearchResultsItem = ({ image }) => {
  const toast = useToast();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      toast({
        status: "success",
        title: "Copied to clipboard",
        position: "top",
        duration: 1000,
      });
      navigator.clipboard.writeText(image.url);
    },
    [toast, image.url]
  );

  const linkBoxProps = useMemo(
    () => ({
      w: "100%",
      h: "100%",
      onClick: handleClick,
    }),
    [handleClick]
  );

  const imageProps = useMemo(
    () => ({
      src: image.images.fixed_width.url,
      alt: image.title,
      w: "100%",
      h: "100%",
      objectFit: "cover",
      cursor: "pointer",
    }),
    [image.images.fixed_width.url, image.title]
  );

  return (
    <GridItem __css={{ aspectRatio: "1" }}>
      <LinkBox {...linkBoxProps}>
        <LinkOverlay href={image.url}>
          <Image {...imageProps} />
        </LinkOverlay>
      </LinkBox>
    </GridItem>
  );
};

export default memo(SearchResultsItem);
