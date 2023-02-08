import React, { useState, useCallback } from "react";
import { Client } from "@notionhq/client";
import CardGrid from "../components/CardGrid";
import {
  SimpleGrid,
  Box,
  Skeleton,
  Container,
  Heading,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PreviewImage from "../components/PreviewImage";

export default function Billing({ results }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const data = results.map((page) => {
    return {
      // relationPageId: page.properties.Companies.relation,
      name: page.properties.Name.title[0].plain_text,
      tag: page.properties.Tags.select.name,
      src: page.properties.src.files[0].file.url,
    };
  });
  // console.log(currentImage);
  // const view = (post) => {
  //   setSelectedPost(post);
  //   // openLightbox();
  //   // viewerIsOpen;
  // };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDir="column"
      marginTop="10"
      marginLeft="36"
      marginRight="36"
    >
      {/* <Container mt="95px" flex={1}> */}
      <Box textAlign="center">
        <Heading
          as="h1"
          // size="4xl"
          pb={"16"}
          bgGradient="linear(to-l, #ffffff, #848c86)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Billing & Subcription Pages
        </Heading>
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        // spacing={8}
        mt={9}
        spacingX={12}
        spacingY={20}
      >
        {data.map((post, index, arr) => (
          <CardGrid
            key={index}
            index={index}
            post={post}
            onImageClick={() => {
              openLightbox(index);
            }}
          />
        ))}
        {viewerIsOpen && (
          <PreviewImage
            // isOpen={openLightbox}
            // onClose={onClose}
            data={data}
            openLightbox={openLightbox}
            closeLightbox={closeLightbox}
            viewerIsOpen={viewerIsOpen}
            currentImage={currentImage}
            // selectedPost={selectedPost}
          />
        )}
      </SimpleGrid>
      {/* </Container> */}
    </Box>
  );
}
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Tags",
      select: {
        equals: "Billing",
      },
    },
  });
  // console.log(response);
  return {
    props: {
      results: response.results,
      //   responseResults,
    },
    revalidate: 100,
  };
}
