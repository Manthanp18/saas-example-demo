// import { ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Flex, Img, Link, Skeleton, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuth from '../../config/firebase';

export default function CardGrid({ post, onImageClick }) {
  const { currentUser } = useAuth();
  // console.log(post)
  let postData = JSON.stringify(post);
  const userId = currentUser;

  let savePostData = JSON.parse(postData);
  savePostData.userId = userId;
  const h = JSON.stringify(savePostData);

  // const handleClick = async () => {
  //   const response = await fetch('/api/save', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: h,
  //   });
  //   const json = await response.json();
  // };
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
            <Link
              fontWeight="semibold"
              // href={`https://www.reddit.com/user/${post.author}/`}
              isExternal
            >
              {`${post.name} ${post.tag} Page`}
            </Link>
          </Text>
          <Text fontSize={['xs', null, 'sm']}>
            <Link
              fontWeight="semibold"
              // href={`https://www.reddit.com/user/${post.author}/`}
              isExternal
            >

            </Link>
          </Text>
          <Flex align="center">
            <Button ml={2} variantColor="teal">
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
