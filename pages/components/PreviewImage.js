import "react-responsive-carousel/lib/styles/carousel.min.css";

// import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Img,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Client } from "@notionhq/client";
// import { createCartHandler } from "../api/hello";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import { useState, useCallback } from "react";
// import Carousel from "react-images";
import image from "next/image";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
// import { PostPropTypes } from "../lib/PropTypeValues";

// const MotionImage = motion(Image);

export default function PreviewImage({
  isOpen,
  onClose,
  post,
  data,
  openLightbox,
  closeLightbox,
  viewerIsOpen,
  currentImage,
  id,
}) {
  let ImageData = data.map((a) => a.src);
  // console.log(items.id);
  const { user, login } = useAuth();
  const userId = user.uid;
  const imageMarginTop = !data.length ? 5 : 0;
  // const [userId, setUserId] = useState();
  const renderItem = data.map((src, index) => (
    <Image key={index} src={src.src} />
  ));
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const arrowStylesRight = {
    position: "fixed",
    zIndex: 2,
    top: "350px",
    left: "83%",
    width: 50,
    height: 50,

    cursor: "pointer",
    borderWidth: 2,
    borderRadius: "50%",
  };

  const arrowStylesleft = {
    position: "fixed",
    zIndex: 2,
    top: "350px",
    right: "83%",
    width: 50,
    height: 50,
    cursor: "pointer",
    borderWidth: 2,
    borderRadius: "50%",
  };

  const indicatorStyles = {
    background: "#fff",
    width: 15,
    height: 15,
    display: "inline-block",
    margin: "0 8px",
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/hi", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    // Success if status code is 201
    if (res.status === 201) {
      toast("Thank you for contacting us!", { type: "success" });
    } else {
      toast("Please re-check your inputs.", { type: "error" });
    }
  };

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      size="6xl"
      isOpen={viewerIsOpen}
      onClose={closeLightbox}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={2}></HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {viewerIsOpen ? (
            <Box w="100%" mt={imageMarginTop}>
              <Carousel
                autoFocus={true}
                showThumbs={false}
                showStatus={false}
                useKeyboardArrows
                dynamicHeight={false}
                selectedItem={currentImage}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{ ...arrowStylesleft }}
                    >
                      {"<"}
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{ ...arrowStylesRight }}
                    >
                      {">"}
                    </button>
                  )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        style={{ ...indicatorStyles, background: "#fffff" }}
                        aria-label={`Selected: ${label} ${index + 1}`}
                        title={`Selected: ${label} ${index + 1}`}
                      />
                    );
                  }
                  return (
                    <li
                      style={indicatorStyles}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  );
                }}
              >
                {renderItem}
              </Carousel>
            </Box>
          ) : (
            <Image mt={imageMarginTop} src={ImageData} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitForm} margin={2}>
            <ToastContainer></ToastContainer>
            Save
          </Button>

          <Button onClick={closeLightbox}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export const withCustomStatusArrowsAndIndicators = () => {
  return (
    <Carousel
      statusFormatter={(current, total) =>
        `Current slide: ${current} / Total: ${total}`
      }
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            -
          </button>
        )
      }
    >
      {baseChildren.props.children}
    </Carousel>
  );
};
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // user = "897728899992888288";
  // const databaseId = process.env.NOTION_DATABASE_ID;
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      ki: {
        title: [
          {
            text: {
              content: "manthan",
            },
          },
        ],
      },
    },
  });
}
