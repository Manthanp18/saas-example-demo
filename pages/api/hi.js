import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
export default async (req, res) => {
  // const uid = req.body.joke;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  // const { name, email, purpose, message } = JSON.parse(req.body);
  const { userId } = JSON.parse(req.body);
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "kiijjjkjsxjknxjsn",
              },
            },
          ],
        },
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
// import { Client } from "@notionhq/client";

// export async function getStaticProps() {
//   const notion = new Client({ auth: process.env.NOTION_API_KEY });
//   // user = "897728899992888288";
//   // const databaseId = process.env.NOTION_DATABASE_ID;
//   const databaseId = process.env.NOTION_DATABASE_ID;
// const response = await notion.pages.create({
//   parent: {
//     database_id: databaseId,
//   },
//   properties: {
//     ki: {
//       title: [
//         {
//           text: {
//             content: "manthan",
//           },
//         },
//       ],
//     },
//   },
// });
// }
