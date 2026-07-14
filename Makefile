build-prod:
	docker buildx build --no-cache --build-arg NEXT_PUBLIC_API_URL=${API_URL} -t docuchain-frontend:latest .
