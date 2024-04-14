/* eslint-disable react/prop-types */
import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tag from "./Tag";
import useSearchStore from "@/store/searchStore";
import { searchGithubUsers } from "../../services/githubService";
import { githubString } from "../../lib/constants/string.json";

//add contributors page 
const AddContributors = ({ contributors, onContributorsChange }) => {
  const { searchQuery, setSearchQuery, searchResults, setSearchResults } =
    useSearchStore();
 // Fetch users when the query changes
  const handleSearch = async (query) => {
    if (query.length > 2) {
      searchGithubUsers(query)
        .then((items) => setSearchResults(items))
        .catch((error) =>
          console.error("Error searching for GitHub users:", error)
        );
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addContributor = (user) => {
    if (typeof onContributorsChange === "function") {
      onContributorsChange([...contributors, user]);
      setSearchQuery("");
      setSearchResults([]);
    } else {
      console.error("onContributorsChange is not a function");
    }
  };

  const removeContributor = (index) => {
    const updatedContributors = [...contributors];
    updatedContributors.splice(index, 1);
    onContributorsChange(updatedContributors);
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  console.log("my contributors", contributors);

  return (
    <div>
      <div>
        <h2>{githubString.selectedContributor}</h2>
        <div>
          {contributors.map((contributor, index) => (
            <Tag
              key={index}
              text={contributor.login}
              onClose={() => removeContributor(index)}
            />
          ))}
        </div>
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search GitHub users"
        />
      </div>
      <div>
        <ul className="flex flex-col">
          {searchResults.map((user) => (
            <li key={user.id} className="flex items-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span>{user.login}</span>
              <p
                className="p-1 bg-slate-500 focus:outline-none w-5 rounded-full ml-2 cursor-pointer"
                onClick={() => addContributor(user)}
              >
                +
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddContributors;
