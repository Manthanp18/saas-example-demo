import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer } from "react-toastify";
import { Context } from "../../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

export default function PreviewImage({
  data,
  closeLightbox,
  viewerIsOpen,
  currentImage,
  id,
}) {
  const { state } = useContext(Context);
  let ImageData = data.map((a) => a.src);
  const imageMarginTop = !data.length ? 5 : 0;
  const renderItem = data.map((src, index) => (
    <Image key={index} src={src.src} />
  ));

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
          <Button margin={2}>
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
