# Verial Blog — Developer Makefile
# Run `make help` to see all targets.

.DEFAULT_GOAL := help

ESSAY_CLI := cd packages/essay-manager && npm run essay --

# ─────────────────────────────────────────────────────────────────────────────
# Help
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: help
help:
	@printf "\n  \033[1mVerial Blog\033[0m — make targets\n\n"
	@printf "  \033[90m── Dev ─────────────────────────────────────────────────────────\033[0m\n"
	@printf "  \033[36m%-26s\033[0m %s\n" "make dev"            "Start blog-site dev server"
	@printf "  \033[36m%-26s\033[0m %s\n" "make build"          "Build all packages (turbo)"
	@printf "  \033[36m%-26s\033[0m %s\n" "make email-preview"  "Preview email templates on port 3001"
	@printf "  \033[36m%-26s\033[0m %s\n" "make email-draft"    "Push a Buttondown draft (needs .env)"
	@printf "\n"
	@printf "  \033[90m── Essays ───────────────────────────────────────────────────────\033[0m\n"
	@printf "  \033[36m%-26s\033[0m %s\n" "make essay-new"      "Scaffold a new essay     SLUG=my-slug"
	@printf "  \033[36m%-26s\033[0m %s\n" "make essay-status"   "Show section progress   [SLUG=my-slug]"
	@printf "  \033[36m%-26s\033[0m %s\n" "make essay-publish"  "Render essay → .mdx      SLUG=my-slug"
	@printf "\n"
	@printf "  \033[90mEssay workflow: essay-new → write → essay-status → essay-publish\033[0m\n\n"

# ─────────────────────────────────────────────────────────────────────────────
# Dev
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: dev
dev: ## Start the blog-site dev server
	npm run dev

.PHONY: build
build: ## Build all packages (turbo)
	npm run build

.PHONY: email-preview
email-preview: ## Preview email templates on port 3001
	npm run email:preview

.PHONY: email-draft
email-draft: ## Push a Buttondown draft (requires .env)
	npm run email:draft

# ─────────────────────────────────────────────────────────────────────────────
# Essay writing workflow
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: essay-new
essay-new: ## Scaffold a new essay — SLUG=my-essay-slug (required)
ifndef SLUG
	$(error SLUG is required. Example: make essay-new SLUG=legibility)
endif
	$(ESSAY_CLI) new $(SLUG)
	@printf "\n  Created: packages/essay-manager/essays/$(SLUG)/\n\n"

.PHONY: essay-status
essay-status: ## Show section status — [SLUG=my-essay-slug] or all essays
	@if [ -n "$(SLUG)" ]; then \
		$(ESSAY_CLI) status $(SLUG); \
	else \
		$(ESSAY_CLI) status; \
	fi

.PHONY: essay-publish
essay-publish: ## Render essay → .mdx with footnotes — SLUG=my-essay-slug (required)
ifndef SLUG
	$(error SLUG is required. Example: make essay-publish SLUG=legibility)
endif
	$(ESSAY_CLI) publish $(SLUG)
	@printf "\n  Next: move packages/essay-manager/essays/$(SLUG)/$(SLUG).mdx\n"
	@printf "        → packages/blog-site/content/essays/$(SLUG).mdx\n\n"
