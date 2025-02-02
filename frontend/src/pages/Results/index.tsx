import type { GitHubVsBlueskyCardProps } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultPage from "../../components/DefaultPage";
import { useEffect } from "react";

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
        <div className="bg-white rounded-lg shadow max-w-md w-full p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Results
          </h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={data?.avatar}
                alt={data?.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {data?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  GitHub Followers: {data?.githubFollowersCount}
                </p>
                <p className="text-sm text-gray-600">
                  GitHub Commits: {data?.githubCommitsCount}
                </p>
                <p className="text-sm text-gray-600">
                  Bluesky Followers: {data?.blueskyFollowersCount}
                </p>
                <p className="text-sm text-gray-600">
                  Bluesky Posts: {data?.blueskyPostsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
}
