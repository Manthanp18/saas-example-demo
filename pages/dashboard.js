import Card from "./components/Card";
import Head from "next/head";
import router from "next/router";
import { getNotionAllData } from "../helpers/getNotionData";
import { useCallback, useState } from "react";
import { Box, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import PreviewImage from "./components/PreviewImage";
import CardGrid from "./components/CardGrid";

export default function Home({ results }) {
  const [query, setQuery] = useState('');
  const [filterValue, setFilterValue] = useState("All");
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();
  const uniqueNames = [...new Set(results.map((item) => item.properties))];


  const data = uniqueNames.map((page) => {
    return {
      // relationPageId: page.properties.Companies.relation,
      id: page.id,
      name: page.Name.title[0].plain_text,
      tag: page.Tags?.select.name,
      src: page.src.files[0]?.file.url,
    };
  });

  const filteredResults = data.filter((item) => {
    const matchesTag = filterValue === "All" || item.name === filterValue;
    const matchesSearch = item.tag.toLowerCase().includes(query.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  }
  // const userOnboardingData = uniqueNames.filter((item) => item.Tags?.select.name === 'User Onboarding');
  // const ImageData = userOnboardingData.map((page) => {
  //   return {
  //     src: page.src.files,
  //   };
  // });

  // const mapArr = ImageData.map((item) => item.src);

  // var doubledArray = mapArr.map((nested) =>
  //   nested.map((element) => element.file.url)
  // );
  const uniqueData = [...new Set(data.map((item) => item.name))];


  const openLightbox = useCallback((index) => {
    // console.log(index)
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <div>
      <Head>
        <title>SaaS examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Stack direction="row" spacing={4} paddingX={32} paddingTop={100}>
          <InputGroup size="lg" flex={1} width={100}>
            <InputLeftElement pointerEvents="none" />
            <Input
              type="text"
              placeholder="Search by Pages"
              border="1px"
              borderColor="gray.400"
              borderRadius="lg"
              px={12}
              py={2}
              value={query}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Select placeholder="Sort by Catagory" size="lg" width={250}>
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="size">Size</option>
          </Select>
          <Select placeholder="Filter by SaaS" size="lg" width={250} maxHeight="100px" value={filterValue}
            onChange={handleFilterChange}>
            <option value="All">All</option>
            {uniqueData.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Stack>

        {/* <div className="grid gap-y-10 gap-x-10 grid-cols-3 grid-flow-row-dense py-7 px-6"> */}
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
            {filteredResults.map((post, index) => (
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
            {viewerIsOpen &&
              (
                <PreviewImage
                  id={items.id}
                  data={data}
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
        {/* </div> */}


      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {

  const results = await getNotionAllData();
  return {
    props: {
      results,
    },
  };
}