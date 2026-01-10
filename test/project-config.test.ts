import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = join(import.meta.dir, "..");
const packageJsonPath = join(PROJECT_ROOT, "package.json");

describe("Project Configuration Tests", () => {
	it("should have correct package name", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.name).toBe("badreputation-org-uk");
	});

	it("should have correct package version", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.version).toBe("0.0.0");
	});

	it("should mark package as private", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.private).toBe(true);
	});

	it("should have deploy script", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.scripts.deploy).toBe("wrangler deploy");
	});

	it("should have dev script", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.scripts.dev).toBe("wrangler dev");
	});

	it("should have start script as alias for dev", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.scripts.start).toBe("wrangler dev");
	});

	it("should have wrangler as dev dependency", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		expect(packageJson.devDependencies.wrangler).toBeDefined();
		expect(packageJson.devDependencies.wrangler).toMatch(/^\^4\./);
	});

	it("should have all expected scripts defined", () => {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
		const expectedScripts = ["deploy", "dev", "start"];
		const actualScripts = Object.keys(packageJson.scripts);
		expectedScripts.forEach((script) => {
			expect(actualScripts).toContain(script);
		});
	});
});
