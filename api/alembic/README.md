Generic single-database configuration.

# Manage migrations

```bash
# Add migration
cd api;
export PYTHONPATH=.
alembic revision --autogenerate -m "migration description"
alembic upgrade head

```
