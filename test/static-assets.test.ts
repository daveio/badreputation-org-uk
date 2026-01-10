import { describe, it, expect } from "bun:test";
import { existsSync, statSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = join(import.meta.dir, "..");
const publicDir = join(PROJECT_ROOT, "public");

describe("Static Assets Tests", () => {
  it("should have public directory", () => {
    expect(existsSync(publicDir)).toBe(true);
  });

  it("public directory should be a directory", () => {
    const stats = statSync(publicDir);
    expect(stats.isDirectory()).toBe(true);
  });

  it("should have index.html in public directory", () => {
    const indexPath = join(publicDir, "index.html");
    expect(existsSync(indexPath)).toBe(true);
  });

  it("index.html should be a file", () => {
    const indexPath = join(publicDir, "index.html");
    const stats = statSync(indexPath);
    expect(stats.isFile()).toBe(true);
  });

  it("index.html should have content", () => {
    const indexPath = join(publicDir, "index.html");
    const stats = statSync(indexPath);
    expect(stats.size).toBeGreaterThan(0);
  });

  it("public directory should contain expected subdirectories", () => {
    const expectedDirs = ["page", "tag", "category"];
    expectedDirs.forEach((dir) => {
      const dirPath = join(publicDir, dir);
      expect(existsSync(dirPath)).toBe(true);
      const stats = statSync(dirPath);
      expect(stats.isDirectory()).toBe(true);
    });
  });

  it("should have WordPress content directories", () => {
    const wpDirs = ["wp-content", "wp-includes"];
    wpDirs.forEach((dir) => {
      const dirPath = join(publicDir, dir);
      expect(existsSync(dirPath)).toBe(true);
      const stats = statSync(dirPath);
      expect(stats.isDirectory()).toBe(true);
    });
  });
});
