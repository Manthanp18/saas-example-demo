import React, { useState, useCallback, useEffect } from "react";
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
import { useRouter } from "next/router";

export default function NotFound({ results }) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSelectedPost(true);
      console.log(selectedPost);
    }, 1000);
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();

  const openLightbox = useCallback((index) => {
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
      id: page.id,
      name: page.properties.Name.title[0].plain_text,
      tag: page.properties.Tags.select.name,
      src: page.properties.src.files[0].file.url,
    };
  });
  console.log(data);
  // const view = (post) => {
  //   setSelectedPost(post);
  //   // openLightbox();
  //   // viewerIsOpen;
  // };

  return (
    <div>
      <head>
        <title>Setting</title>
        <meta name="description" content="Meta description for the Home page" />
      </head>

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
            Settings Pages
          </Heading>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          // spacing={8}
          mt={9}
          spacingX={12}
          spacingY={20}
        >
          {data.map((post, index) => (
            <CardGrid
              key={index}
              index={index}
              post={post}
              onImageClick={() => {
                openLightbox(index);
                setItems(post);
              }}
            />
          ))}
          {viewerIsOpen && (
            <PreviewImage
              // isOpen={openLightbox}
              // onClose={onClose}
              id={items.id}
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
    </div>
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
        equals: "Settings",
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
