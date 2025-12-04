"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export interface Challenge {
    id: string;
    title: string;
    summary?: string;
    level?: string;
    duration_hours?: number;
    providers: string[];
    services: string[];
    tags: string[];
    created_at?: string;
}

interface ChallengeFiltersProps {
    challenges: Challenge[];
    allProviders: string[];
    allServices: string[];
    allTags: string[];
    allLevels: string[];
    onFilterChange: (filtered: Challenge[]) => void;
}

export function ChallengeFilters({
    challenges,
    allProviders,
    allServices,
    allTags,
    allLevels,
    onFilterChange,
}: ChallengeFiltersProps) {
    const [selectedProviders, setSelectedProviders] = React.useState<string[]>([]);
    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = React.useState<string[]>([]);
    const [providersOpen, setProvidersOpen] = React.useState(true);
    const [servicesOpen, setServicesOpen] = React.useState(false);
    const [tagsOpen, setTagsOpen] = React.useState(false);

    // Toggle helpers
    const toggleProvider = (provider: string) => {
        setSelectedProviders((prev) =>
            prev.includes(provider)
                ? prev.filter((p) => p !== provider)
                : [...prev, provider]
        );
    };

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const toggleLevel = (level: string) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    // Apply filters whenever selection changes
    // Uses intersection logic: challenge must match ALL selected filters within each category
    React.useEffect(() => {
        const filtered = challenges.filter((challenge) => {
            // For providers: challenge must include ALL selected providers
            const matchesProvider =
                selectedProviders.length === 0 ||
                selectedProviders.every((p) => challenge.providers.includes(p));
            // For services: challenge must include ALL selected services
            const matchesService =
                selectedServices.length === 0 ||
                selectedServices.every((s) => challenge.services.includes(s));
            // For tags: challenge must include ALL selected tags
            const matchesTag =
                selectedTags.length === 0 ||
                selectedTags.every((t) => challenge.tags.includes(t));
            // For levels: challenge level must be one of the selected levels (OR logic makes sense here)
            const matchesLevel =
                selectedLevels.length === 0 ||
                (challenge.level && selectedLevels.includes(challenge.level));

            return matchesProvider && matchesService && matchesTag && matchesLevel;
        });
        onFilterChange(filtered);
    }, [
        challenges,
        selectedProviders,
        selectedServices,
        selectedTags,
        selectedLevels,
        onFilterChange,
    ]);

    const hasActiveFilters =
        selectedProviders.length > 0 ||
        selectedServices.length > 0 ||
        selectedTags.length > 0 ||
        selectedLevels.length > 0;

    const clearAllFilters = () => {
        setSelectedProviders([]);
        setSelectedServices([]);
        setSelectedTags([]);
        setSelectedLevels([]);
    };

    const activeFilterCount =
        selectedProviders.length +
        selectedServices.length +
        selectedTags.length +
        selectedLevels.length;

    return (
        <div className="space-y-4">
            {/* Filter header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                        aria-hidden="true"
                    >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <span className="text-sm font-medium">Filters</span>
                    {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                            {activeFilterCount}
                        </Badge>
                    )}
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Clear all
                    </Button>
                )}
            </div>

            {/* Level filter - always visible since it's short */}
            {allLevels.length > 0 && (
                <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Difficulty
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {allLevels.map((level) => (
                            <Toggle
                                key={level}
                                pressed={selectedLevels.includes(level)}
                                onPressedChange={() => toggleLevel(level)}
                                variant="outline"
                                size="sm"
                                className="rounded-full px-3 text-xs capitalize"
                            >
                                {level}
                            </Toggle>
                        ))}
                    </div>
                </div>
            )}

            {/* Providers filter - collapsible */}
            {allProviders.length > 0 && (
                <Collapsible open={providersOpen} onOpenChange={setProvidersOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Cloud Providers
                            </span>
                            {selectedProviders.length > 0 && (
                                <Badge variant="outline" className="rounded-full px-1.5 py-0 text-[10px]">
                                    {selectedProviders.length}
                                </Badge>
                            )}
                        </div>
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
                            className={cn(
                                "text-muted-foreground transition-transform duration-200",
                                providersOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                            {allProviders.map((provider) => (
                                <Toggle
                                    key={provider}
                                    pressed={selectedProviders.includes(provider)}
                                    onPressedChange={() => toggleProvider(provider)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full px-3 text-xs uppercase"
                                >
                                    {provider}
                                </Toggle>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Services filter - collapsible */}
            {allServices.length > 0 && (
                <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Services
                            </span>
                            {selectedServices.length > 0 && (
                                <Badge variant="outline" className="rounded-full px-1.5 py-0 text-[10px]">
                                    {selectedServices.length}
                                </Badge>
                            )}
                        </div>
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
                            className={cn(
                                "text-muted-foreground transition-transform duration-200",
                                servicesOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                            {allServices.map((service) => (
                                <Toggle
                                    key={service}
                                    pressed={selectedServices.includes(service)}
                                    onPressedChange={() => toggleService(service)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full px-3 text-xs"
                                >
                                    {service}
                                </Toggle>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Tags filter - collapsible */}
            {allTags.length > 0 && (
                <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Tags
                            </span>
                            {selectedTags.length > 0 && (
                                <Badge variant="outline" className="rounded-full px-1.5 py-0 text-[10px]">
                                    {selectedTags.length}
                                </Badge>
                            )}
                        </div>
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
                            className={cn(
                                "text-muted-foreground transition-transform duration-200",
                                tagsOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <Toggle
                                    key={tag}
                                    pressed={selectedTags.includes(tag)}
                                    onPressedChange={() => toggleTag(tag)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full px-3 text-xs"
                                >
                                    {tag}
                                </Toggle>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}
        </div>
    );
}
