import Head from "next/head";
import { getNotionAllData } from "../helpers/getNotionData";
import { useCallback, useState } from "react";
import { Box, Button, Input, InputGroup, InputLeftElement, Link, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Select, SimpleGrid, Stack, Tag, VStack } from "@chakra-ui/react";

import PreviewImage from "../components/PreviewImage";
import CardGrid from "../components/CardGrid";

const Home = ({ results }) => {
  const [query, setQuery] = useState('');
  const [filterValue, setFilterValue] = useState("All");
  const [currentImage, setCurrentImage] = useState(0);
  const [showComponent, setShowComponent] = useState(false);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [items, setItems] = useState();
  const [sortingValue, setSortingValue] = useState('Sort by Category');
  const uniquePage = [...new Set(results.map((item) => item.properties))];


  const data = uniquePage.map((page) => {
    return {
      id: page.id,
      name: page.Name.title[0].plain_text,
      tag: page.Tags?.select.name,
      src: page.src.files[0]?.file.url,
    };
  });

  const filteredData = data.filter((card) => card.tag !== 'User Onboarding');
  const filteredPageResults = filteredData.filter((item) => {
    const matchesTag = filterValue === "All" || item.name === filterValue;
    const matchesSearch = item.tag.toLowerCase().includes(query.toLowerCase());
    return matchesTag && matchesSearch;
  });


  const handleOptionSelect = (value) => {
    setSortingValue(value); // update the state variable for menu button text
  };

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
  const uniqueSaaSName = [...new Set(data.map((item) => item.name))];
  const uniqueTagsCatagory = [...new Set(data.map((item) => item.tag))].filter(tag => tag !== 'User Onboarding');
  console.log({ uniqueTagsCatagory })

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

          <Popover>
            <PopoverTrigger>
              <Button rightIcon={<i className="fa fa-caret-down"></i>} size="lg" textAlign="left">
                {sortingValue}
              </Button>
            </PopoverTrigger>
            <PopoverContent>

              <PopoverBody>
                {uniqueTagsCatagory.map((option, index) => (
                  <Button
                    key={index}
                    value={option}
                    onClick={(event) => { handleSearchChange(event); handleOptionSelect(option) }}
                    variant="ghost"
                    colorScheme="gray"
                    w="100%"
                    textAlign="left"
                  >
                    {option}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* 
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="fa fa-caret-down"></i>}
              size="lg"
              width={250}
              textAlign="left"
            >
              {sortingValue}
            </MenuButton>
            <MenuList minWidth={250} maxWidth={500}>
              {uniqueTagsCatagory.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  onClick={(event) => { handleSearchChange(event); handleOptionSelect(option) }}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}
          <Select placeholder="Filter by SaaS" size="lg" width={250} maxHeight="100px" value={filterValue}
            onChange={handleFilterChange}>
            <option value="All">All</option>
            {uniqueSaaSName.map((option, index) => (
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
            {filteredPageResults.map((post, index) => (
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
                  data={filteredPageResults}
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
    </div >
  );
}
export default Home;

export async function getServerSideProps({ query }) {

  const results = await getNotionAllData();
  return {
    props: {
      results,
    },
  };
}