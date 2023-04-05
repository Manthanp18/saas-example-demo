import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, SimpleGrid, } from '@chakra-ui/react';

import PreviewImage from '../components/PreviewImage';
import CardGrid from '../components/CardGrid';

export default function Saved() {
  const [cards, setCards] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();

  const openLightbox = useCallback((index) => {
    // console.log(index)
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const handleRemove = async (id) => {
    try {
      const response = await fetch('/api/save', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardId: id }) // Send cardId in request body
      });
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };



  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const userId = localStorage.getItem("_id");
        const response = await fetch(`/api/save?userId=${userId}`);
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedCards();
  }, []);
  console.log(cards)
  return (
    <div>
      <head>
        <title>Saved</title>
        <meta name="description" content="Meta description for the Home page" />
      </head>
      <Box
        minHeight="100vh"
        display="flex"
        flexDir="column"
        marginTop="10"
        marginLeft="30"
        marginRight="30"
        paddingX={12}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          // spacing={8}
          mt={9}
          paddingX={12}
          spacingX={12}
          spacingY={20}
        >
          {cards.map((post, index) => (
            <CardGrid
              key={index}
              index={index}
              post={post}
              onImageClick={() => {
                openLightbox(index);
                setItems(post);

              }}
              handleRemove={handleRemove}
            />
          ))}
          {viewerIsOpen &&
            (
              <PreviewImage
                id={cards._id}
                data={cards}
                openLightbox={openLightbox}
                closeLightbox={closeLightbox}
                viewerIsOpen={viewerIsOpen}
                currentImage={currentImage}

              />
            )
          }
        </SimpleGrid>


        {/* Using Routes */}
        {/* {filteredResults.map((name) => (
              <button
                type="button"
                className="w-80"
                onClick={() => {
                  if (name === "User Onboarding") {
                    router.push(`/pages/onboarding?count=55`);
                  } else {
                    router.push(`/pages/page/${name}?count=55`);
                  }
                }}
              >
                <Card name={name} count="55" />
              </button>
            ))} */}
      </Box>
    </div>
  );
}
