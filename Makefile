build-prod:
	docker buildx build --no-cache --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY} -t docuchain-frontend:latest .
