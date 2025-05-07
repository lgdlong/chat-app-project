# 🎯 Chat App Project

Ứng dụng chat thời gian thực dành cho sinh viên, bao gồm chức năng nhắn tin, đăng nhập, và nhóm chat.

---

## 📚 Mục lục

- [🧠 Tính năng chính](#-tính-năng-chính)
- [🔧 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [🗂️ Cấu trúc thư mục](#️-cấu-trúc-thư-mục)
- [🚀 Workflow](#-workflow)
- [📜 Makefile Commands](#-makefile-commands)
- [👉 Branch naming convention prefixes](#-branch-naming-convention-prefixes)
- [📝 Commit Message Convention](#-commit-message-convention)
- [👨‍💻 Nhóm phát triển](#-nhóm-phát-triển)

---

## 🧠 Tính năng chính

- Đăng nhập / đăng ký người dùng
- Chat real-time (WebSocket)
- Chat nhóm
- Giao diện thân thiện với sinh viên

---

## 🔧 Công nghệ sử dụng

### Frontend
- ReactJS + Vite
- Bootstrap / TailwindCSS

### Backend
- Java Spring Boot
- Spring Security, WebSocket
- PostgreSQL
- REST API

---

## 🗂️ Cấu trúc thư mục


```

chat-app-project/ 
├── backend/ # Spring Boot service (REST API, DB) 
├── frontend/ # React + Vite client (UI) 
├── database/ # init.sql file (schema + seed data) 
├── docs/
├── docker-compose.yml 
├── Makefile 
└── README.md

```

----------

## 🚀 Workflow

### 🧩 1. Khi bắt đầu làm việc (sau khi clone / pull)

```bash
make project-restart

```

> Xoá volume cũ, rebuild và khởi chạy lại toàn bộ project (DB sẽ được khởi tạo từ `init.sql`)

----------

### 💻 2. Code feature, fix bug, thêm data vào DB

> Làm việc bình thường trên frontend/backend, test API, thêm dữ liệu...

----------

### 💾 3. Sau khi đã cập nhật database (schema hoặc data)

```bash
make db-backup

```

> Backup lại toàn bộ database vào `./database/init.sql` để người khác dùng lại

----------

### ✅ 4. (Tuỳ chọn) Kiểm tra lại DB init mới có dùng được không

```bash
make project-restart

```

> Xác nhận rằng `init.sql` có thể reset lại đúng database từ đầu

----------


### 🚀 5. Commit & Push

```bash
git add .
git commit -m "✨ Update init.sql + tính năng mới"
git push origin main

```

> 📝 **Lưu ý:** Trước khi commit, hãy đảm bảo bạn đang làm việc trên **branch có tên đúng chuẩn**.  
> Xem quy tắc đặt tên tại [👉 Branch naming convention prefixes](#-branch-naming-convention-prefixes)

----------

📌 **Lưu ý:** Không cần phải dùng toàn bộ lệnh trong Makefile mỗi lần làm việc.  
Chỉ sử dụng theo đúng mục đích của từng bước trong quy trình phía trên là đủ.

----------

## 📜 Makefile Commands


| Lệnh | Tác dụng |
|------|----------|
| `make db-dump`           | Dump database vào file `database/init.sql` |
| `make db-backup`         | Alias của `db-dump`, dễ nhớ hơn |
| `make project-restart`   | Xoá volume, rebuild và run toàn bộ project |
| `make backend-only`      | Chạy project mỗi backend và db không cần frontend | 
| `make start`             | Khởi động các container foreground (hiện log) |
| `make start-detached`    | Khởi động container ở chế độ nền |
| `make stop`              | Dừng container nhưng giữ dữ liệu |
| `make rebuild`           | Build lại image, giữ volume hiện tại |

----------

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

Bên dưới là cách viết commit message chuẩn theo [Conventional Commits](https://www.conventionalcommits.org/).

----------

## 📝 Commit Message Convention

> ✅ **Mục tiêu**: Ghi lại lịch sử thay đổi dễ đọc, dễ sinh changelog, hỗ trợ CI/CD.

### Cấu trúc chuẩn:

```
<type>(<scope>): <short message>

```

| Type        | Ý nghĩa |
|-------------|----------------------------------|
| `feat`      | Thêm tính năng mới |
| `fix`       | Sửa lỗi |
| `docs`      | Cập nhật tài liệu |
| `style`     | Format/style code, không ảnh hưởng logic |
| `refactor`  | Refactor code (không thêm tính năng hoặc fix bug) |
| `test`      | Thêm hoặc sửa test |
| `chore`     | Việc phụ trợ: CI, config, dọn dẹp, cập nhật lib |

----------

### 🧪 Ví dụ:

```bash
git commit -m "feat(user): add user service"
git commit -m "fix(login): prevent null password"
git commit -m "docs(readme): update workflow section"
git commit -m "refactor(chat): extract socket logic"

```

----------

📌 **Gợi ý:** Cài plugin [Conventional Commit](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) cho VS Code để auto suggest commit message cho chuẩn.

----------

## 👨‍💻 Nhóm phát triển

-   SE190377 Phùng Lưu Hoàng Long

-   SE192024 Dương Quốc Thái
