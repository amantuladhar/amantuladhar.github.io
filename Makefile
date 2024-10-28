create-tag:
	@echo "\nEnter tag: "
	@read TAG; \
	mkdir -p tag/$$TAG; \
	printf "%s\n" "---" "layout: tag" "tag: $$TAG" "---" > tag/$$TAG/index.html

.PHONY: create-tag
