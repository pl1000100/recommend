.PHONY: dev-backend

dev-backend:
	cd backend && make dev

dev-frontend:
	cd frontend/app && npm run dev

