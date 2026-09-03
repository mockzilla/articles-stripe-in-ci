SPEC_URL := https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml

.PHONY: spec serve test

# Trims the published Stripe spec down to the endpoints in codegen.yml. The
# result is never committed, so serve builds it first.
spec:
	mockzilla simplify \
		--config services/stripe/codegen.yml \
		--output services/stripe/openapi.yml \
		$(SPEC_URL)

serve: spec
	mockzilla ./

test:
	node --test test/*.test.mjs
