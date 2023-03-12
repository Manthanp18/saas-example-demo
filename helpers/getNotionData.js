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
const PAGE_SIZE = 100; // number of records to fetch per page

export async function getNotionAllData() {
  let results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      page_size: PAGE_SIZE,
    });

    results = [...results, ...response.results];
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  return results;
}



