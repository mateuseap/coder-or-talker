import base64
import requests
from fastapi import APIRouter, HTTPException
from starlette import status
from ..services import github_service, bluesky_service

router = APIRouter()


@router.get("/compare-github-and-bluesky-profiles")
async def compare_github_and_bluesky_profiles(github: str, bluesky: str):
    try:
        github_profile_data = await github_service.fetch_user_profile(github)
        github_commits_count = await github_service.total_commits_fetcher(github)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching GitHub data.",
        )

    try:
        bluesky_profile_data = await bluesky_service.fetch_user_profile(bluesky)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching Bluesky data.",
        )

    response = requests.get(bluesky_profile_data["avatar"])
    avatar_image_bytes = response.content
    avatar_image_base64 = base64.b64encode(avatar_image_bytes).decode("utf-8")

    return {
        "name": bluesky_profile_data["displayName"],
        "avatar": avatar_image_base64,
        "githubUsername": github,
        "githubFollowersCount": github_profile_data["followers"],
        "githubCommitsCount": github_commits_count,
        "blueskyUsername": "@" + bluesky,
        "blueskyFollowersCount": bluesky_profile_data["followersCount"],
        "blueskyPostsCount": bluesky_profile_data["postsCount"],
    }
