# 🎯 Chat App Project

Ứng dụng chat thời gian thực dành cho sinh viên, bao gồm chức năng nhắn tin, đăng nhập, và nhóm chat.

## 🧠 Tính năng chính

- Đăng nhập / đăng ký người dùng
- Chat real-time (WebSocket)
- Chat nhóm
- Giao diện thân thiện với sinh viên

## 🔧 Công nghệ sử dụng

### Frontend
- ReactJS + Vite
- Bootstrap / TailwindCSS

### Backend
- Java Spring Boot
- Spring Security, WebSocket
- PostgreSQL
- REST API

## 🗂️ Cấu trúc thư mục

```
/chat-app-project 
├── backend/ # Spring Boot backend 
├── frontend/ # ReactJS frontend 
└── README.md # File này
```

## 🚀 Cách chạy project

### 1. Clone repo

```bash
git clone https://github.com/lgdlong/chat-app-project.git
cd chat-app-project
```

### 2. Chạy backend

```bash
cd backend
./mvnw spring-boot:run
```

> Yêu cầu Java 17+, Maven

### 3. Chạy frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Yêu cầu Node.js >= 18

## 👨‍💻 Nhóm phát triển

- SE190377 Phùng Lưu Hoàng Long
- SE192024 Dương Quốc Thái

## 👉 Branch naming convention prefixes
| Tiền tố     | Mục đích                                                                                  | Ví dụ                                 |
|-------------|---------------------------------------------------------------------------------------------|---------------------------------------|
| `feature/`  | Phát triển tính năng mới                                                                    | `feature/add-login-page`              |
| `bugfix/`   | Sửa lỗi trong quá trình phát triển                                                          | `bugfix/fix-header-css`               |
| `hotfix/`   | Sửa lỗi nghiêm trọng trên môi trường production                                             | `hotfix/cors-error`                   |
| `release/`  | Chuẩn bị cho phiên bản phát hành                                                            | `release/v1.0.0`                      |
| `docs/`     | Cập nhật hoặc bổ sung tài liệu                                                              | `docs/update-readme`                  |
| `chore/`    | Thực hiện các công việc lặt vặt như cập nhật thư viện, cấu hình, dọn dẹp mã nguồn, v.v.     | `chore/update-dependencies`           |
| `test/`     | Thử nghiệm hoặc kiểm tra các ý tưởng mới                                                    | `test/try-new-ui-layout`              |

### 4. Run with Docker Compose

Ensure you have Docker and Docker Compose installed on your system.

```bash
docker-compose up --build

```

### 5.Run Backend with Docker

```bash
docker-compose up --build backend
```