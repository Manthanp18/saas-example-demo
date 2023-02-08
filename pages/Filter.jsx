import React from "react";
import { useState } from "react";
import CardGrid from "./components/CardGrid";
import SavedCardGrid from "./components/SavedCardGrid";
function Filter({ data }) {
  const [query, setQuery] = useState("");

  const responseResults = data.filter((i) =>
    i.name.toLowerCase().includes(query)
  );
  console.log(responseResults);
  return (
    <div>
      Filter
      <div>
        <input
          type="text"
          placeholder="search"
          className=""
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* {data.map.filter((i) =>
    i.name.toLowerCase().includes(query)((results) => (
          <CardGrid post={results} />
        ))} */}
      </div>
    </div>
  );
}

export default Filter;
