import base64
import httpx
from fastapi import APIRouter, HTTPException
from starlette import status
from ..services import github_service, bluesky_service

router = APIRouter()


@router.get("/compare-github-and-bluesky-profiles")
async def compare_github_and_bluesky_profiles(github: str, bluesky: str):
    try:
        github_profile_data = await github_service.fetch_user_profile(github)
        github_commits_count = await github_service.total_commits_fetcher(github)
    except Exception as e:
        try:
            github_data = await github_service.fetch_github_readme_stats_data(github)
            github_profile_data = {}
            github_profile_data["followers"] = github_data["followers"]
            github_commits_count = github_data["commits_count"]
        except Exception as fallback_error:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error fetching GitHub data: {str(e)}, and fallback also failed: {str(fallback_error)}",
            )

    try:
        bluesky_profile_data = await bluesky_service.fetch_user_profile(bluesky)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching Bluesky data: {str(e)}",
        )

    try:
        async with httpx.AsyncClient() as client:
            avatar_response = await client.get(bluesky_profile_data["avatar"])
            avatar_response.raise_for_status()
            avatar_image_bytes = avatar_response.content
            avatar_image_base64 = base64.b64encode(avatar_image_bytes).decode("utf-8")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching Bluesky avatar: {str(e)}",
        )

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
