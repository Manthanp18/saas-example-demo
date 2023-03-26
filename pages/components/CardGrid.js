// import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Flex, Img, Link, Skeleton, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Context } from "../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';


export default function CardGrid({ post, onImageClick }) {

  const { state, dispatch } = useContext(Context);
  const userId = state.user._id

  const handleClick = async () => {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, cardDetails: post }),
    });
    const json = await response.json();
    console.log(json);
  };
  return (
    <>
      <Box
        // backgroundColor={cardColor}
        borderRadius={['sm', null, 'md']}
        borderWidth={1}
        borderColor="gray.200"
        boxShadow="dark-lg"
      // overflow="hidden"
      >
        <Box
          onClick={() => onImageClick(post)}
          cursor="pointer"
          h="240px"
          position="relative"
          overflow="hidden"
        >
          <motion.img
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            w="100%"
            h="100%"
            objectFit="cover"
            // key={key}
            src={post.src}
          />
        </Box>
        <Flex px="4" py="2" align="center" justify="space-between" w="100%">
          <Text fontSize={['xs', null, 'sm']}>
            <Link fontWeight="semibold" isExternal>
              {`${post.name} `}
              <Box display="inline-block" px={2} py={1} rounded="full" bg="teal.500" color="white">
                {post.tag}
              </Box>
              {' Page'}
            </Link>
          </Text>

          <Button ml={2} onClick={handleClick}>
            Save
          </Button>

        </Flex>

      </Box>
    </>
  );
}
