import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { getNotionData } from "../../../helpers/getNotionData";
import CardGrid from "../../components/CardGrid";
import PreviewImage from "../../components/PreviewImage";



export default function Pages({ results }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();
  const [query, setQuery] = useState('');

  const { name } = router.query;
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


  return (
    <div className="flex">
      <head>
        <title>{name}</title>
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
            {name} Pages
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
      </Box>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { name } = query;
  const results = await getNotionData(name);
  return {
    props: {
      results,
    },
  };
}
