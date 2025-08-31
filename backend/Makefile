.PHONY: install-dev switch-dev dev lint fix

install-dev:
	poetry install

switch-dev:
	poetry env remove python && poetry install

dev:
	poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

lint:
	poetry run flake8 app

fix:
	poetry run black app
	make lint

