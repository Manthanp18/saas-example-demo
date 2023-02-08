import React, { useState, useCallback, useEffect } from 'react';
import { Client } from '@notionhq/client';
import CardGrid from '../components/CardGrid';
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';
import PreviewImage from '../components/PreviewImage';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../redux/authSlice';

export default function NotFound({ results }) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSelectedPost(true);
      // console.log(selectedPost);
    }, 1000);
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();
  const [query, setQuery] = useState('');

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
  const responseResults = data.filter((i) => i.name.toLowerCase().includes(query));
  // console.log(responseResults);
  // const view = (post) => {
  //   setSelectedPost(post);
  //   // openLightbox();
  //   // viewerIsOpen;
  // };

  return (
    <div className="flex">
      <head>
        <title>404</title>
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
            pb={'16'}
            bgGradient="linear(to-l, #ffffff, #848c86)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            404 Pages
          </Heading>
        </Box>
        <div className="flex flex-col   ">
          <input
            type="text"
            placeholder="Search by company"
            className="h-12 w-1/4 border items-end justify-end border-gray-400 rounded-lg px-4 py-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* <div className="flex flex-col justify-between">
          <input
            type="text"
            placeholder="Search by company"
            className="h-12 w-1/4 border items-end justify-end border-gray-400 rounded-lg px-4 py-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div> */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          // spacing={8}
          mt={9}
          spacingX={12}
          spacingY={20}
        >
          {responseResults.map((post, index) => (
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
      property: 'Tags',
      select: {
        equals: '404',
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

//////// Saved Page
// import React from "react";
// import { useShoppingCart } from "../context/ShoppingCartContext";
// import { Client } from "@notionhq/client";
// import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
// // import SavedCardGrid from "./components/SavedCardGrid";
// function saved({ responseResults }) {
//   const {
//     getItemQuantity,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//     removeFromCart,
//     cartItems,
//   } = useShoppingCart();
//   // console.log(responseResults);
//   // const item =
//   // console.log(cartItems);
//   let result = responseResults.filter((o1) =>
//     cartItems.some((o2) => o1.id === o2.id)
//   );
//   console.log(result);
//   return (
//     <Box
//       minHeight="100vh"
//       display="flex"
//       flexDir="column"
//       marginTop="10"
//       marginLeft="36"
//       marginRight="36"
//     >
//       <Heading
//         as="h1"
//         // size="4xl"
//         pb={"16"}
//         textAlign="center"
//         bgGradient="linear(to-l, #ffffff, #848c86)"
//         bgClip="text"
//         fontSize="6xl"
//         fontWeight="extrabold"
//       >
//         Saved Pages
//       </Heading>
//       <SimpleGrid
//         columns={{ base: 1, md: 2, lg: 3 }}
//         // spacing={8}

//         mt={9}
//         spacingX={12}
//         spacingY={20}
//       >
//         {/* {result.map((item) => (
//           <SavedCardGrid key={item} {...item} />
//         ))} */}

//       </SimpleGrid>
//     </Box>
//   );
// }

// export default saved;
// export async function getStaticProps() {
//   const notion = new Client({ auth: process.env.NOTION_API_KEY });

//   const databaseId = process.env.NOTION_DATABASE_ID;
//   const response = await notion.databases.query({
//     database_id: databaseId,
//   });
//   const responseResults = response.results.map((page) => {
//     return {
//       // relationPageId: page.properties.Companies.relation,
//       id: page.id,
//       name: page.properties.Name.title[0].plain_text,
//       tag: page.properties.Tags.select.name,
//       src: page.properties.src.files[0].file.url,
//     };
//   });
//   // console.log();
//   return {
//     props: {
//       // results: response.results,
//       responseResults,
//     },
//     revalidate: 100,
//   };
// }
