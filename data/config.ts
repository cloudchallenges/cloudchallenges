import setupImage from "@/assets/setup.png";
import type { NavItem } from "@/lib/types";

export const SITE = {
    website: "https://cloudchallenges.hyperoot.dev",
    author: "Rajesh",
    repo: "https://github.com/cloudchallenges/cloudchallenges",
    branch: "main",
    title: "Cloud Challenges",
    description:
        "CloudChallenges is a collection of real-world cloud scenarios that help you learn by solving practical, hands-on projects.",
    image: setupImage,
    imageAlt: "Check out cloudchallenges.hyperoot.dev",
    twitterHandle: "@HYP3R00T",
};

export const LOCALE = {
    lang: "en",
};

export const navItems: NavItem[] = [
    { href: "/challenge", label: "Challenges", special: true },
];

