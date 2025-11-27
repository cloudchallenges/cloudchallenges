"use client";

import * as React from "react";
import { ChallengeFilters, type Challenge } from "./ChallengeFilters";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChallengeListProps {
    challenges: Challenge[];
    allProviders: string[];
    allServices: string[];
    allTags: string[];
    allLevels: string[];
}

const formatDuration = (hours: number) =>
    Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`;

function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const levelLabel = challenge.level
        ? `${challenge.level[0].toUpperCase()}${challenge.level.slice(1)}`
        : undefined;

    const durationLabel =
        typeof challenge.duration_hours === "number" && challenge.duration_hours > 0
            ? formatDuration(challenge.duration_hours)
            : undefined;

    const createdLabel = challenge.created_at
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(challenge.created_at))
        : undefined;

    const summaryText = challenge.summary?.trim();
    const highlightChips = [...challenge.providers, ...challenge.services];
    const tagList = challenge.tags ?? [];

    return (
        <a
            href={`/challenge/${challenge.id}`}
            className="group block h-full"
            aria-label={`View challenge details for ${challenge.title ?? challenge.id}`}
        >
            <Card className="h-full border-border/60 bg-card/80 shadow-md transition-all duration-300 hover:border-border hover:shadow-lg">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <Badge
                            variant="secondary"
                            className="w-fit rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em]"
                        >
                            {levelLabel ?? "Challenge"}
                        </Badge>
                        {durationLabel && (
                            <Badge
                                variant="outline"
                                className="rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest"
                            >
                                {durationLabel}
                            </Badge>
                        )}
                    </div>
                    <CardTitle className="mt-3 text-xl font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
                        {challenge.title ?? challenge.id}
                    </CardTitle>
                    {createdLabel && (
                        <p className="text-xs text-muted-foreground">{createdLabel}</p>
                    )}
                </CardHeader>

                {summaryText && (
                    <CardContent className="pt-0">
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                            {summaryText}
                        </CardDescription>
                    </CardContent>
                )}

                {highlightChips.length > 0 && (
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                            {highlightChips.map((chip) => (
                                <Badge
                                    key={chip}
                                    variant="outline"
                                    className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest"
                                >
                                    {chip}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                )}

                {tagList.length > 0 && (
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                            {tagList.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                )}

                <CardFooter className="mt-auto border-t border-border/50 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-primary">
                        View challenge
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </span>
                </CardFooter>
            </Card>
        </a>
    );
}

export function ChallengeList({
    challenges,
    allProviders,
    allServices,
    allTags,
    allLevels,
}: ChallengeListProps) {
    const [filteredChallenges, setFilteredChallenges] =
        React.useState<Challenge[]>(challenges);

    const handleFilterChange = React.useCallback((filtered: Challenge[]) => {
        setFilteredChallenges(filtered);
    }, []);

    return (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar filters */}
            <aside className="space-y-6">
                <div className="sticky top-24 rounded-lg border bg-card/50 p-4">
                    <ChallengeFilters
                        challenges={challenges}
                        allProviders={allProviders}
                        allServices={allServices}
                        allTags={allTags}
                        allLevels={allLevels}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </aside>

            {/* Challenge grid */}
            <div className="space-y-4">
                {/* Results count */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                            {filteredChallenges.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                            {challenges.length}
                        </span>{" "}
                        challenges
                    </p>
                </div>

                {/* Grid */}
                {filteredChallenges.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-16 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4 text-muted-foreground/50"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <h3 className="mb-1 text-lg font-semibold">No challenges found</h3>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your filters to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
