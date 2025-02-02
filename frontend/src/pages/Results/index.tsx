import type { GitHubVsBlueskyCardProps } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultPage from "../../components/DefaultPage";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as GitHubVsBlueskyCardProps | undefined;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  if (!data) {
    return (
      <DefaultPage>
        <div className="flex flex-col w-full h-full justify-center items-center px-8">
          <div className="bg-white rounded-lg shadow max-w-md w-full p-8">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Coder or Talker
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Nothing to see here. Redirecting you back to the home page. 🏠
            </p>
          </div>
        </div>
      </DefaultPage>
    );
  }

  return (
    <DefaultPage>
      <div className="flex flex-col w-full h-full justify-center items-center px-8">
        <div className="bg-white rounded-lg shadow max-w-sm w-full p-8 space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={data.avatar}
              alt={data.name}
              className="w-32 h-32 rounded-full mb-4 shadow-md"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {data.name}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around w-full border-t pt-4">
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <div className="flex items-center mb-1">
                <FaGithub className="text-xl text-gray-800 mr-1" />
                <a 
                  href={`https://github.com/${data.githubUsername}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-bold text-gray-700 hover:underline"
                >
                  {data.githubUsername}
                </a>
              </div>
              <p className="text-xs text-gray-600">
                {data.githubFollowersCount} followers
              </p>
              <p className="text-xs text-gray-600">
                {data.githubCommitsCount} commits
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <SiBluesky className="text-xl text-blue-500 mr-1" />
                <a 
                  href={`https://bsky.app/profile/${data.blueskyUsername.replace("@", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-bold text-gray-700 hover:underline"
                >
                  {data.blueskyUsername}
                </a>
              </div>
              <p className="text-xs text-gray-600">
                {data.blueskyFollowersCount} followers
              </p>
              <p className="text-xs text-gray-600">
                {data.blueskyPostsCount} posts
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
}
