import React, { useState, useCallback, useEffect } from 'react';
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';



const Saved = async ({  }) => {

  console.log(pets);

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

  return (
    <div>
      <head>
        <title>Login</title>
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
            Saved
          </Heading>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          // spacing={8}
          mt={9}
          spacingX={12}
          spacingY={20}
        >
          {/* {user.map((post, index) => (
            <CardGrid
              key={index}
              index={index}
              post={post}
              onImageClick={() => {
                openLightbox(index);
                setItems(post);
              }}
            />
          ))} */}
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
export default Saved;

