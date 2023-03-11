import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getNotionData(tag) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      select: {
        equals: tag,
      },
    },
  });

  return response.results;
}
