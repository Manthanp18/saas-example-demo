// import { ArrowUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Img,
  Link,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
// import { PostPropTypes } from "../lib/PropTypeValues";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MotionImg = motion(Img);

export default function SavedCardGrid(item) {
  const { removeFromCart } = useShoppingCart();
  //   const item = responseResults.find((item) => item.id === i.id);
  //   if (item == null) return null;
  //   console.log(item);

  return (
    <Box>
      <Box
        // backgroundColor={cardColor}
        borderRadius={["sm", null, "md"]}
        borderWidth={1}
        borderColor="gray.200"
        boxShadow="dark-lg"
        // overflow="hidden"
      >
        <Box
          // onClick={() => onImageClick(post)}
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
            src={item.src}
          />
        </Box>
        <Flex px="4" py="2" align="center" justify="space-between" w="100%">
          <Text fontSize={["xs", null, "sm"]}>
            <Link
              fontWeight="semibold"
              // href={`https://www.reddit.com/user/${post.author}/`}
              isExternal
            >
              {item.name}
            </Link>
          </Text>
          <Button onClick={() => removeFromCart(item.id)} margin={2}>
            <ToastContainer></ToastContainer>
            remove
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
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
