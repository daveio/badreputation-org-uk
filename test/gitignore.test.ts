import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = join(import.meta.dir, "..");
const gitignorePath = join(PROJECT_ROOT, ".gitignore");

describe("Gitignore Tests", () => {
  const getGitignoreContent = (): string => {
    return readFileSync(gitignorePath, "utf-8");
  };

  const hasEntry = (entry: string): boolean => {
    const content = getGitignoreContent();
    const lines = content.split("\n").map((line) => line.trim());
    return lines.includes(entry) || lines.includes(`${entry}/`);
  };

  it("should exist", () => {
    expect(getGitignoreContent()).toBeTruthy();
  });

  it("should ignore node_modules", () => {
    expect(hasEntry("node_modules")).toBe(true);
  });

  it("should ignore npm debug logs", () => {
    const content = getGitignoreContent();
    expect(content).toContain("npm-debug.log");
  });

  it("should ignore yarn debug logs", () => {
    const content = getGitignoreContent();
    expect(content).toContain("yarn-debug.log");
  });

  it("should ignore .env files", () => {
    const content = getGitignoreContent();
    expect(content).toContain(".env");
  });

  it("should ignore .dev.vars files", () => {
    const content = getGitignoreContent();
    expect(content).toContain(".dev.vars");
  });

  it("should ignore .wrangler directory", () => {
    const content = getGitignoreContent();
    expect(content).toContain(".wrangler");
  });

  it("should ignore coverage directory", () => {
    expect(hasEntry("coverage")).toBe(true);
  });

  it("should ignore dist directory", () => {
    expect(hasEntry("dist")).toBe(true);
  });

  it("should ignore .next directory", () => {
    expect(hasEntry(".next")).toBe(true);
  });

  it("should ignore typescript cache files", () => {
    const content = getGitignoreContent();
    expect(content).toContain(".tsbuildinfo");
  });

  it("should ignore pnpm debug logs", () => {
    const content = getGitignoreContent();
    expect(content).toContain(".pnpm-debug.log");
  });

  it("should ignore build output", () => {
    const content = getGitignoreContent();
    expect(content).toContain("build/Release");
  });

  it("should allow .env.example", () => {
    const content = getGitignoreContent();
    expect(content).toContain("!.env.example");
  });

  it("should allow .dev.vars.example", () => {
    const content = getGitignoreContent();
    expect(content).toContain("!.dev.vars.example");
  });

  it("should not be empty", () => {
    const content = getGitignoreContent();
    expect(content.length).toBeGreaterThan(0);
  });
});
