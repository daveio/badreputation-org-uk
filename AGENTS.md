# Agent Guide for badreputation-org-uk

This document provides essential context and instructions for AI agents working in this repository.

## Project Overview

This project is a static website deployed via Cloudflare Workers. It uses **Bun** as the package manager and test runner, and **Trunk** for linting. The site content primarily consists of static HTML files in the `public/` directory, structured in a WordPress-style archive format.

## Tech Stack

- **Runtime/Package Manager**: Bun (`bun`)
- **Deployment**: Cloudflare Workers (via `wrangler`)
- **Linting/Formatting**: Trunk (managing Actionlint, Prettier, Markdownlint, etc.)
- **Alternative Serving**: Caddy (Dockerized)

## Key Commands

### Development

- **Install dependencies**: `bun install`
- **Start local dev server**: `bun run dev` (wraps `wrangler dev`)
- **Run tests**: `bun test`
- **Watch tests**: `bun run test:watch`

### Deployment

- **Deploy to Cloudflare**: `bun run deploy` (wraps `wrangler deploy`)

### Linting

- **Check code**: `trunk check`
- **Format code**: `trunk fmt`

## Project Structure

- `public/`: Static website content (HTML, images, assets). This is the source of truth for the site.
- `test/`: Unit tests validating configuration and asset integrity.
- `.trunk/`: Configuration for the Trunk linter.
- `wrangler.jsonc`: Cloudflare Workers configuration.
- `Caddyfile` & `Dockerfile`: Configuration for an alternative Caddy-based container deployment.

## Testing Strategy

Tests are written in TypeScript using Bun's native test runner. They focus on infrastructure and configuration validation rather than application logic.

- **Config Tests**: Verify `package.json` and `wrangler.jsonc` validity.
- **Asset Tests**: Ensure `public/` directory structure and key files (`index.html`) exist.
- **Gitignore Tests**: Verify sensitive or generated files are ignored.

## Conventions & Patterns

- **Package Management**: Always use `bun` instead of `npm` or `yarn`.
- **Configuration**: Cloudflare config is in `wrangler.jsonc` (JSON with comments).
- **Static Assets**: The site structure preserves legacy WordPress paths (e.g., `/2012/02/29/...`).
- **Docker**: The Docker build is a secondary deployment target using Caddy to serve the `public/` directory on port 8000.

## Gotchas

- **Static Content**: This is a static site; there is no dynamic backend application code in `src/`. Logic is handled by Cloudflare Workers configuration.
- **Trunk**: Linting is strict. If `trunk check` fails, run `trunk fmt` to auto-fix issues where possible.
