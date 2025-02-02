import type { GitHubVsBlueskyCardProps } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultPage from "../../components/DefaultPage";
import { useEffect, useMemo, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { toPng } from "html-to-image";
import { formatImageUrl } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Results() {
  const navigate = useNavigate();
  const elementRef = useRef(null);
  const location = useLocation();
  const data = location.state as GitHubVsBlueskyCardProps | undefined;

  useEffect(() => {
    if (!data) {
      navigate("/", { replace: true });
    }
  }, [data, navigate]);

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

  const chartData = useMemo(
    () => ({
      labels: ["Commits", "Posts"],
      datasets: [
        {
          data: [data.githubCommitsCount, data.blueskyPostsCount],
          backgroundColor: ["#26A641", "#3498DB"],
          hoverBackgroundColor: ["#006D32", "#2B6CB0"],
        },
      ],
    }),
    [data]
  );

  const shareMessage = useMemo(() => {
    if (data.githubCommitsCount === 0 && data.blueskyPostsCount === 0) {
      return "No activity data available.";
    }

    if (data.githubCommitsCount === data.blueskyPostsCount) {
      return `${data.name} spends an equal amount of time coding and posting on Bluesky. ☯️`;
    }

    if (data.githubCommitsCount > data.blueskyPostsCount) {
      const percentage =
        data.blueskyPostsCount === 0
          ? 100
          : Math.round(
              ((data.githubCommitsCount - data.blueskyPostsCount) /
                data.githubCommitsCount) *
                100
            );
      return `${data.name} spends ${percentage}% more time coding than posting on Bluesky. 😎`;
    } else {
      const percentage =
        data.githubCommitsCount === 0
          ? 100
          : Math.round(
              ((data.blueskyPostsCount - data.githubCommitsCount) /
                data.blueskyPostsCount) *
                100
            );
      return `${data.name} spends ${percentage}% more time posting on Bluesky than coding. 🥴`;
    }
  }, [data.githubCommitsCount, data.blueskyPostsCount, data.name]);

  const htmlToImageConvert = () => {
    if (elementRef.current) {
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "coder-or-talker.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <DefaultPage>
      <div className="flex flex-col w-full h-full justify-center items-center px-8">
        <div
          className="relative bg-white rounded-lg shadow max-w-4xl w-full p-8 space-y-6 md:space-y-0 md:flex md:gap-8"
          ref={elementRef}
        >
          <div className="absolute top-2 right-2 flex gap-2">
            <a
              className="text-xs font-semibold hover:underline text-[#3498DB] hover:text-blue-700"
              href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                shareMessage + " " + "https://mateuseap.com/coder-or-talker"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on Bluesky
            </a>
            <button
              onClick={htmlToImageConvert}
              className="text-xs font-semibold hover:underline text-[#3498DB] hover:text-blue-700 focus:outline-none"
            >
              Download
            </button>
          </div>
          <div className="flex flex-col flex-1 space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={formatImageUrl(data.avatar)}
                alt={data.name}
                className="w-32 h-32 rounded-full mb-4 shadow-md"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {data.name}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-around w-full border-t pt-4">
              <div className="flex flex-col items-center cursor-pointer hover:opacity-90 transition">
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
                <p
                  className="text-xs text-gray-600"
                  title="Only public commits are counted"
                >
                  {data.githubCommitsCount} commits
                </p>
              </div>
              <div className="flex flex-col items-center cursor-pointer mt-4 sm:mt-0 hover:opacity-90 transition">
                <div className="flex items-center mb-1">
                  <SiBluesky className="text-xl text-blue-500 mr-1" />
                  <a
                    href={`https://bsky.app/profile/${data.blueskyUsername.replace(
                      "@",
                      ""
                    )}`}
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

          <div className="flex flex-col flex-1 items-center justify-center space-y-4">
            {(data.githubCommitsCount !== 0 ||
              data.blueskyPostsCount !== 0) && (
              <div className="w-48 h-48">
                <Pie data={chartData} />
              </div>
            )}
            <p className="text-center text-sm text-gray-700 font-semibold">
              {shareMessage}
            </p>
          </div>
        </div>
      </div>
    </DefaultPage>
  );
}
