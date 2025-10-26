.PHONY: install-dev switch-dev dev fix

install-dev:
	poetry install

switch-dev:
	poetry env remove python && poetry install

dev:
	poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

fix:
	poetry run black app
	poetry run flake8 app
