import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const PAGE_SIZE = 100; // number of records to fetch per page

export async function getNotionData(tag) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      select: {
        equals: tag,
      },
    },
    page_size: PAGE_SIZE,
  });

  return response.results;
}

export async function getNotionAllData() {
  const results = [];

  const firstResponse = await notion.databases.query({
    database_id: databaseId,
    page_size: PAGE_SIZE,
  });

  results.push(...firstResponse.results);

  const remainingPages = Math.ceil(firstResponse.total / PAGE_SIZE) - 1;
  const remainingPageNumbers = Array.from({ length: remainingPages }, (_, i) => i + 2);

  const pageRequests = remainingPageNumbers.map(async (pageNumber) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: PAGE_SIZE,
      start_cursor: firstResponse.next_cursor,
    });

    return response;
  });

  const remainingResponses = await Promise.all(pageRequests);

  for (const response of remainingResponses) {
    results.push(...response.results);
  }

  return results;
}
