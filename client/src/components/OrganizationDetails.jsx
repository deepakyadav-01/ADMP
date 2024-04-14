import { useEffect } from "react";
import axios from "axios";
import { useOrganizationDetailsStore } from "@/store/organizationStore";

//organization page details
// eslint-disable-next-line react/prop-types
const OrganizationDetails = ({ username }) => {
  const { orgDetails, loading, error, setLoading, setError, setOrgDetails } =
    useOrganizationDetailsStore();

  useEffect(() => {
    const fetchOrgDetails = () => {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((response) => {
          setOrgDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching organization details:", error);
          setError("Error fetching organization details");
          setLoading(false);
        });
    };

    fetchOrgDetails();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orgDetails) {
    return <div>No organization details available</div>;
  }

  return (
    <div className="flex justify-center w-auto h-auto max-w-lg">
      <div className="bg-white shadow-md p-4 w-full">
        {/* <p className="text-gray-600 mb-2">Bio: {orgDetails.bio}</p> 
          <p className="text-gray-600 mb-2">Location: {orgDetails.location}</p> */}
        <p className="text-gray-600 mb-2">
          Public Repositories: {orgDetails.public_repos}
        </p>
        <p className="text-gray-600 mb-2">Followers: {orgDetails.followers}</p>
      </div>
    </div>
  );
};

export default OrganizationDetails;
