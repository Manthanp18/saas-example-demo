// import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Flex, Img, Link, Skeleton, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function CardGrid({ post, onImageClick, handleRemove }) {
  const router = useRouter();
  const [userId, setUserId] = useState()

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('_id');
      setUserId(userId);
    }
  }, []);
  // const userId = localStorage.getItem('_id');


  const handleClick = async () => {
    try {
      const response = await axios.post('/api/save', { userId, cardDetails: post });
      return response.data;
    } catch (error) {
      console.error(error);
    }
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

          {router.pathname !== '/dashboard' && (
            <Button ml={2} onClick={() => handleRemove(post._id)}>
              Remove
            </Button>
          )}
          <Button ml={2} onClick={handleClick}>
            Save
          </Button>

        </Flex>

      </Box>
    </>
  );
}
