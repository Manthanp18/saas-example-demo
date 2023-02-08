import { Client } from "@notionhq/client";
export default async function Data() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const responseResults = response.results.map((page) => {
    return {
      // relationPageId: page.properties.Companies.relation,
      id: page.id,
      name: page.properties.Name.title[0].plain_text,
      tag: page.properties.Tags.select.name,
      src: page.properties.src.files[0].file.url,
    };
  });
  return responseResults;
}
