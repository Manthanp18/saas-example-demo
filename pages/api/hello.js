// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Client } from "@notionhq/client";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import userAuth from "../../config/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async (req, res) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const data = await userAuth();
  console.log(data);
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "userId",
      multi_select: {
        contains: "ZCYYPEXh7Nhdu92BBTSePJxHCeo1",
      },
    },
  });
  res.json({ response });
  // revalidate: 100,

  // res.status(200).json({ name: "kkk" });
};
