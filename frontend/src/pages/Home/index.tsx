import type { GitHubVsBlueskyCardProps } from "../../types";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import DefaultPage from "../../components/DefaultPage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { showErrorToast } from "../../utils";

function Home() {
  const navigate = useNavigate();
  const [githubUsername, setGithubUsername] = useState("");
  const [blueskyUsername, setBlueskyUsername] = useState("");

  const { data, isSuccess, isFetching, isError, refetch } =
    useQuery<GitHubVsBlueskyCardProps>({
      queryKey: [
        `/api/compare-github-and-bluesky-profiles?github=${githubUsername}&bluesky=${blueskyUsername.replace("@", "")}`,
        "GET",
      ],
      enabled: false,
      retry: false,
    });

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/results", { state: data });
    } else if (isError) {
      showErrorToast("An error has occurred. Please try again. 😢");
    }
  }, [isSuccess, isError, data]);

  const handleSubmit = (e: React.FormEvent) => {
    if (!githubUsername || !blueskyUsername) {
      return;
    }

    refetch();
    e.preventDefault();
  };

  return (
    <DefaultPage>
      <div className="flex flex-col w-full h-full justify-center items-center px-8">
        <div className="bg-white rounded-lg shadow max-w-md w-full p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Coder or Talker
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            {isFetching && (!isSuccess || !isError)
              ? "Fetching data, hold on a moment... 🕒"
              : "See if you really code or just talk on Bluesky. 🤔"}
          </p>
          {isFetching && (!isSuccess || !isError) && <Spinner size="lg" />}
          {!isFetching && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <FaGithub className="text-xl text-gray-700 mr-2" />
                  <input
                    type="text"
                    placeholder="GitHub Username"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    required
                    className="w-full focus:outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded p-2">
                  <SiBluesky className="text-xl text-blue-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Bluesky Username"
                    value={blueskyUsername}
                    onChange={(e) => setBlueskyUsername(e.target.value)}
                    required
                    className="w-full focus:outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-[#3498DB] text-white font-medium rounded hover:bg-blue-700 transition">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </DefaultPage>
  );
}

export default Home;
