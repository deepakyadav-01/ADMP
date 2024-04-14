/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchGitHubProfile } from "@/services/githubService";
import { githubString, common } from "@/lib/constants/string.json";

//fetch github profile 
const GitHubProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubProfile(username)
      .then((data) => {
        setProfileData(data);
        setLoading(false); 
      })
      .catch(() => { 
        setError(githubString.gitProfile);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div>
        {/* Scalaton image */}

        <div className="animate-pulse">
          <div className="w-48 h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {common.error} {error}
      </div>
    );
  }

  if (!profileData) {
    return <div>{githubString.profileDataNotFound}</div>;
  }

  return (
    <div>
      <img
        src={profileData.avatar_url}
        alt="Profile"
        style={{ width: 200, height: "auto" }}
      />
    </div>
  );
};

export default GitHubProfile;
