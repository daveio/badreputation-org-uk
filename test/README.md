# Unit Tests

This directory contains comprehensive unit tests for the badreputation-org-uk Cloudflare Workers project.

## Test Files

### project-config.test.ts
Tests for `package.json` configuration:
- Package name and version verification
- Script definitions (deploy, dev, start)
- Wrangler dependency version validation
- Private package marking

**Test Count: 8**

### wrangler-config.test.ts
Tests for `wrangler.jsonc` configuration:
- Project name in Wrangler config
- Compatibility date setting
- Assets directory path
- Observability configuration
- Schema reference validation

**Test Count: 6**

### static-assets.test.ts
Tests for static asset directory structure:
- Public directory existence and validity
- index.html presence and content validation
- Expected subdirectories (page, tag, category)
- WordPress content directories (wp-content, wp-includes)

**Test Count: 8**

### gitignore.test.ts
Tests for `.gitignore` file entries:
- Node.js related files (node_modules, npm-debug.log, yarn logs)
- Environment files (.env, .dev.vars)
- Wrangler specific files (.wrangler)
- Build output (dist, build/Release)
- TypeScript cache files
- Example file exceptions (.env.example, .dev.vars.example)

**Test Count: 15**

## Running Tests

### Run all tests
```bash
bun test
```

### Watch mode (re-run on file changes)
```bash
bun test --watch
```

### Generate coverage report
```bash
bun test --coverage
```

### Run specific test file
```bash
bun test test/project-config.test.ts
```

## Test Framework

Tests are written using Bun's native test runner, which provides:
- No additional dependencies required
- Built-in expect() assertions
- describe/it test organization
- Watch mode support
- Coverage reporting

## Total Test Coverage

- **Total Tests: 37**
- **All Passing: ✓**
- **Coverage Areas:**
  1. Project configuration (package.json)
  2. Wrangler deployment configuration
  3. Static asset availability and structure
  4. Git ignore rules for development workflow
