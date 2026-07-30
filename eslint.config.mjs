import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "reference/**", "qa/**", "public/**", "scripts/**"]),
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "widgets", pattern: "src/widgets/**" },
        { type: "features", pattern: "src/features/**" },
        { type: "entities", pattern: "src/entities/**" },
        { type: "content", pattern: "src/content/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
      "boundaries/include": ["src/**/*.*"],
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { type: "app" },
              allow: {
                to: [
                  { type: "widgets" },
                  { type: "features" },
                  { type: "entities" },
                  { type: "content" },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "widgets" },
              allow: {
                to: [
                  { type: "features" },
                  { type: "entities" },
                  { type: "content" },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "features" },
              allow: {
                to: [
                  { type: "entities" },
                  { type: "content" },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "entities" },
              allow: { to: [{ type: "content" }, { type: "shared" }] },
            },
            {
              from: { type: "content" },
              allow: { to: [{ type: "shared" }] },
            },
            {
              from: { type: "shared" },
              allow: { to: [{ type: "shared" }] },
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.tsx", "src/features/**/*.ts"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "document",
          message: "Use refs and React state instead of document.querySelector in features.",
        },
      ],
    },
  },
  {
    files: ["src/widgets/interactive/**/*.tsx"],
    rules: {
      "no-restricted-globals": "off",
    },
  },
  {
    files: ["src/widgets/sections/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
