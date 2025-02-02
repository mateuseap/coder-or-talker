import React from "react";

export type Sizes =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl";

export interface CenterProps {
  children: ReactNode;
  className?: string;
}

export interface DefaultPageProps {
  className?: string;
  childrenClassName?: string;
  children?: React.ReactNode;
  HtmlTag?: keyof JSX.IntrinsicElements;
  starfield?: boolean;
}

export interface SpinnerProps {
  size?: Sizes | string;
  color?: string;
  centered?: boolean;
  hiddenLabel?: string;
  containerClassName?: string;
}

export interface GitHubVsBlueskyCardProps {
  name: string;
  avatar: string;
  blueskyUsername: string;
  blueskyFollowersCount: number;
  blueskyPostsCount: number;
  githubUsername: string;
  githubFollowersCount: number;
  githubCommitsCount: number;
}
