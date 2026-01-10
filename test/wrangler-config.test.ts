import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = join(import.meta.dir, "..");
const wranglerConfigPath = join(PROJECT_ROOT, "wrangler.jsonc");

// Simple JSONC parser that handles comments
function parseJsonc(content: string): Record<string, any> {
	// Remove single-line comments
	let cleaned = content.replace(/\/\/.*/g, "");
	// Remove multi-line comments
	cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");
	// Remove trailing commas
	cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");
	return JSON.parse(cleaned);
}

describe("Wrangler Configuration Tests", () => {
	it("should have correct project name in wrangler config", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.name).toBe("badreputation-org-uk");
	});

	it("should have correct compatibility date", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.compatibility_date).toBe("2025-09-27");
	});

	it("should have assets directory set to ./public", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.assets).toBeDefined();
		expect(config.assets.directory).toBe("./public");
	});

	it("should have observability enabled", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.observability).toBeDefined();
		expect(config.observability.enabled).toBe(true);
	});

	it("should have schema reference", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.$schema).toBeDefined();
		expect(config.$schema).toContain("wrangler/config-schema.json");
	});

	it("should have assets configured for serving static files", () => {
		const content = readFileSync(wranglerConfigPath, "utf-8");
		const config = parseJsonc(content);
		expect(config.assets).toBeDefined();
		expect(typeof config.assets.directory).toBe("string");
	});
});
