# Dump database vào init.sql
db-dump:
	docker exec -t postgres-db pg_dump -U postgres -d chat-app-project -F p > ./database/init.sql

# Alias cho người quen "backup"
db-backup: db-dump

# Reset toàn bộ project, build lại và chạy foreground để theo dõi log
project-restart:
	docker-compose down -v
	docker-compose up --build

# Chạy project mỗi backend và db không cần frontend
backend-only:
	docker-compose up --build backend db pgadmin

# Chạy project từ volume/data hiện tại (foreground log theo dõi)
start:
	docker-compose up

# Chạy nền (nếu muốn terminal rảnh)
start-detached:
	docker-compose up -d

# Stop tất cả containers nhưng giữ volumes
stop:
	docker-compose down

# Rebuild tất cả services nhưng giữ volumes/data
rebuild:
	docker-compose build
	docker-compose up
