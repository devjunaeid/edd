"use client";
import "./style.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  //useEffect(() => {
  //const getSearch = setTimeout(() => {
  // if (!search) {
  // router.push(`/status`);
  //} else {
  //  router.push(`/status?search=${search}`);
  //}
  //}, 1000);
  //
  //return () => clearTimeout(getSearch);
  //}, [search]);

 // useEffect(() => {
  //  if (!search) {
   //   router.push("/status");
   // }
  //}, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    router.push(`/status?search=${search}`);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search_cont">
      <div>
        <input
          type="text"
          name="search-field"
          value={search}
          onChange={(e) => handleChange(e)}
          maxLength={9}
          placeholder="Enter (8 char) project ID"
        />
      </div>
      <button disabled={search.length < 9} onClick={handleSubmit} type="submit">
        <FiSearch size={30} color="white" />
      </button>
    </form>
  );
}

export default Search;
