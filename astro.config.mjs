// @ts-check
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import AutoImport from "astro-auto-import";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
//   site: "https://cloudchallenges.hyperoot.dev",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          bypassInlineCode: false,
          keepBackground: false,
          defaultLang: "txt",
          showLineNumbers: true,
        },
      ],
    ],
    shikiConfig: {
      theme: "css-variables",
      defaultColor: false,
    },
  },
  integrations: [
    AutoImport({
      imports: ["./src/components/core/Video.astro"],
    }),
    mdx(),
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
