import httpx
import re
from fastapi import HTTPException, status

GITHUB_API_URL = "https://api.github.com"


async def fetch_user_profile(username: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{GITHUB_API_URL}/users/{username}")
        response.raise_for_status()
        return response.json()


async def total_commits_fetcher(username: str) -> int:
    url = f"{GITHUB_API_URL}/search/commits"
    params = {"q": f"author:{username}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        total_count = data.get("total_count")
        return total_count


async def fetch_github_readme_stats_data(username: str) -> dict:
    github_stats_url = f"https://github-readme-stats.vercel.app/api?username={username}&include_all_commits=true"
    followers_url = f"{GITHUB_API_URL}/users/{username}/followers"

    async with httpx.AsyncClient() as client:
        try:
            stats_response = await client.get(github_stats_url)
            stats_response.raise_for_status()

            commits_pattern = r"Total Commits\s*:\s*(\d+)"
            commits_match = re.search(commits_pattern, stats_response.text)
            if commits_match:
                total_commits = int(commits_match.group(1))
            else:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Could not extract total commits.",
                )

            followers_response = await client.get(followers_url)
            followers_response.raise_for_status()
            followers_data = followers_response.json()
            total_followers = len(followers_data)

            return {"commits_count": total_commits, "followers": total_followers}

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error fetching GitHub data: {str(e)}",
            )
