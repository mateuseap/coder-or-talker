import httpx

BSKY_API_URL = "https://public.api.bsky.app"


async def fetch_user_profile(actor: str) -> dict:
    url = f"{BSKY_API_URL}/xrpc/app.bsky.actor.getProfile"
    params = {"actor": actor}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()
