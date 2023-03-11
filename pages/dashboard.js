import Card from "./components/Card";
import Head from "next/head";
import router from "next/router";
import { getNotionAllData } from "../helpers/getNotionData";

export default function Home({ results }) {



  const uniqueNames = [...new Set(results.map((item) => item.properties.Tags?.select.name))];
  const filteredArray = uniqueNames.filter(value => value !== undefined);
  console.log(filteredArray)
  return (
    <div className="w-full">
      <Head>
        <title>SaaS examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="w-full">
          <div className="text-xl font-extrabold leading-6 mx-24 mt-10 w-fit p-2 px-6 bg-gradient-to-r from-green-200 to-blue-400 rounded-lg">
            Web Pages
          </div>
          <div className="grid gap-y-10 grid-cols-3 grid-flow-row-dense px-14 ml-10 py-7">
            {filteredArray.map((name) => (
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
            ))}

          </div>

        </div>
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