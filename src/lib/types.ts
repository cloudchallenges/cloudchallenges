import type { ImageMetadata, MarkdownHeading, Page } from "astro";
import type { CollectionEntry } from "astro:content";

// For HeadSEO.astro
export interface HeadSEOProps {
    title: string;
    description: string;
    image: string | ImageMetadata;
    imageAlt: string;
    contentType: string;
    noIndex?: boolean;
}

// For src/layouts/BaseLayout.astro
export interface BaseLayoutProps extends Partial<HeadSEOProps> {
}

// For navigation items (config.ts)
export interface NavItem {
    href: string;
    label: string;
    special?: boolean;
    blank?: boolean;
}

// For src/pages/challenges/[...page].astro
export interface ChallengesPageProps {
    page: Page<CollectionEntry<"challenges">>;
    totalPages: number;
}

// Reusable types for challenges collections
export type ChallengeEntry = CollectionEntry<"challenges">;
export type Challenges = ChallengeEntry[];

// Challenge data and headings
export type ChallengeData = ChallengeEntry["data"];
export type ChallengeHeadings = MarkdownHeading[];

// For src/pages/post/[...slug].astro
export interface ChallengeDetailPageProps {
    entry: ChallengeEntry;
    headings?: ChallengeHeadings;
}

export interface ChallengePath {
    params: { slug: string };
    props: { entry: ChallengeEntry; headings?: ChallengeHeadings };
}

// Solution types
export type SolutionEntry = CollectionEntry<"solutions">;
export type Solutions = SolutionEntry[];
export type SolutionData = SolutionEntry["data"];

export interface SolutionDetailPageProps {
    challenge: ChallengeEntry;
    solution: SolutionEntry | null;
}

export interface SolutionPath {
    params: { slug: string };
    props: SolutionDetailPageProps;
}