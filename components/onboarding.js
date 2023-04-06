import React, { useState, useCallback, useEffect } from "react";
import { Client } from "@notionhq/client";

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
// import OnboardingPreview from "../components/OnboardingPreview";

import CardGrid from "./CardGrid";

export default function Onboarding({ results }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [doubleArrayIndex, setDoubleArrayIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
    // setDoubleArrayIndex(0);
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

  const ImageData = results.map((page) => {
    return {
      src: page.properties.src.files,
    };
  });
  //   console.log(ImageData);

  const mapArr = ImageData.map((item) => item.src);
  //   console.log(mapArr);
  var doubledArray = mapArr.map((nested) =>
    nested.map((element) => element.file.url)
  );
  return (
    <div>
      <head>
        <title>User Onboarding</title>
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
            On-boarding Pages
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

                setDoubleArrayIndex(index);
              }}
            />
          ))}
          {/* {viewerIsOpen && (
            <OnboardingPreview
              // isOpen={openLightbox}
              // onClose={onClose}
              data={data}
              doubledArray={doubledArray[doubleArrayIndex]}
              openLightbox={openLightbox}
              closeLightbox={closeLightbox}
              viewerIsOpen={viewerIsOpen}
              currentImage={currentImage}
            // selectedPost={selectedPost}
            />
          )} */}
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
        equals: "User Onboarding",
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
