import httpx

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
