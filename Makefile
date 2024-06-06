build-prod:
	docker buildx build --no-cache -t docuchain-frontend:latest .
