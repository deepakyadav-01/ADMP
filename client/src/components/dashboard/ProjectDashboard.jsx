/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TopContributors from "../TopContributors";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressAnimation from "../progress/Progress";
import {
  fetchRepositories,
  fetchPullRequests,
  fetchContributors,
  fetchCommits,
} from "@/services/githubService";
import { projectDashboard, common } from "../../lib/constants/string.json";

//project dashboard for admin page
const ProjectDashboard = ({ username, repo }) => { 
  const [repository, setRepository] = useState(null);
  const [pullRequests, setPullRequests] = useState(null);
  const [contributors, setContributors] = useState(null);
  const [commits, setCommits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  console.log("my username", username);
  console.log("my repo", repo);

  useEffect(() => {
    const fetchData = () => {
      fetchRepositories(username, repo)
        .then((repositoriesResponse) => {
          //const repository = repositoriesResponse.find(repo => repo.name === repo);
          fetchPullRequests(username, repo)
            .then((pullRequestsResponse) => {
              fetchContributors(username, repo)
                .then((contributorsResponse) => {
                  fetchCommits(username, repo)
                    .then((commitsResponse) => {
                      console.log("my commit response", commitsResponse);

                      setRepository(repositoriesResponse);
                      setPullRequests(pullRequestsResponse);
                      setContributors(contributorsResponse);
                      setCommits(commitsResponse);

                      setLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error fetching commits:", error);
                      setError("Error fetching commits connect to github");
                      setLoading(false);
                    });
                })
                .catch((error) => {
                  console.error("Error fetching contributors:", error);
                  setError("Error fetching contributors connect to github");
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.error("Error fetching pull requests:", error);
              setError("Error fetching pull requests connect to github");
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          setError("Error fetching repositories connect to github");
          setLoading(false);
        });
    };

    fetchData();
  }, [username, repo]);

  if (loading) {
    return (
      <div>
        <ProgressAnimation />
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

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Card className="cursor-pointer ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {projectDashboard.totalContributors}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contributors.length}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {projectDashboard.totalCommits}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commits.length}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {projectDashboard.totalPr}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pullRequests.length}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {projectDashboard.totalForks}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repository.forks}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {projectDashboard.totalIssues}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repository.open_issues}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5 mb-10">
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>{projectDashboard.contributorList}</CardTitle>
          </CardHeader>
          <CardContent>
            <TopContributors
              contributors={contributors}
              commits={commits}
              pullRequests={pullRequests}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
