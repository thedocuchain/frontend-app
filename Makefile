build-prod:
ifeq ($(strip $(RECAPTCHA_SITE_KEY)),)
	$(error RECAPTCHA_SITE_KEY is unset or empty. Export it before invoking make: `export RECAPTCHA_SITE_KEY=...` or use the inline form `RECAPTCHA_SITE_KEY=... make build-prod`)
endif
	docker buildx build --no-cache --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY} --build-arg NEXT_PUBLIC_API_URL=${API_URL} -t docuchain-frontend:latest .
