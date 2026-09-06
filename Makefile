.PHONY: default
default:
	@echo "NOTHING TO RUN WITH DEFAULT"

.PHONY: dev
dev:
	pnpm dev

.PHONY: lint
lint:
	pnpm lint

.PHONY: compile
compile:
	pnpm compile

.PHONY: test
test:
	pnpm test

.PHONY: build
build:
	pnpm build

.PHONY: validate
validate:
	pnpm validate

.PHONY: validate-repository-boundaries
validate-repository-boundaries:
	pnpm validate-repository-boundaries

.PHONY: depcheck
depcheck:
	pnpm depcheck

.PHONY: ud
ud:
	pnpm ud

.PHONY: iud
iud:
	pnpm iud

.PHONY: update-all
update-all:
	pnpm update-all
