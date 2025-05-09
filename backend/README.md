# 💬 Chat App Backend

## 🛠️ Công nghệ sử dụng

- **Spring Boot 3.4.4**: Framework chính của ứng dụng
- **Spring Data JPA**: Tương tác cơ sở dữ liệu
- **Spring Web**: Tạo các API RESTful
- **PostgreSQL**: Cơ sở dữ liệu lưu thông tin người dùng và tin nhắn
- **Docker/Docker Compose**: Đóng gói và chạy ứng dụng (tuỳ chọn)

---

## 🚀 Bắt đầu

### ⚙️ Yêu cầu môi trường

- Java 21
- Maven
- Docker và Docker Compose (tuỳ chọn)

---

### ▶️ Cách chạy ứng dụng

#### 🧪 Chạy bằng Maven

```bash
./mvnw spring-boot:run

```

#### 🐳 Chạy bằng Docker Compose

```bash
docker-compose up --build

```

> Lệnh này sẽ khởi chạy cả backend và PostgreSQL theo file `compose.yaml`.

----------

## 🗄️ Cấu hình cơ sở dữ liệu

Khai báo kết nối trong `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/privateChat-app-project
spring.datasource.username=postgres
spring.datasource.password=1234

```

> Khi dùng Docker Compose, URL sẽ được thiết lập tự động dùng container PostgreSQL.

----------

## 🧩 Cấu trúc Entity

Ứng dụng hiện tại bao gồm các thực thể chính:

-   `User`: Đại diện người dùng, chứa thông tin xác thực và hồ sơ


(Các entity khác sẽ được cập nhật sau: `Chat`, `Message`, `Media`, ...)

----------

## 📡 Tài liệu API

Hệ thống cung cấp các API REST để frontend tương tác:

-   Đăng ký / đăng nhập người dùng

-   Gửi tin nhắn

-   Quản lý nhóm Private Chat

## 📚 Swagger API Documentation

Ứng dụng này sử dụng **Swagger UI** (OpenAPI 3) để tự động sinh tài liệu REST API.

```
http://localhost:8081/swagger-ui/index.html
```
----------

## 📁 Cấu trúc thư mục

```
src/main/java/com/lgdlong/backend
├── controller   # Lớp điều khiển API
├── dto          # Các lớp DTO (Data Transfer Object)
├── entity       # Các class Entity (JPA)
├── enums        # Các enum dùng trong ứng dụng
├── id           # Các constraint về primary key
├── repo         # Giao diện Repository (Spring Data JPA)
├── service      # Xử lý logic nghiệp vụ
└── config       # Các lớp cấu hình

```

----------

## 🏗️ Đóng gói cho production

```bash
./mvnw clean package

```
## Sau khi sửa code, build lại image khi đứng ở ./backend

```bash
docker build -t backend .

```
## Chạy container trên localhost://8080 sau khi build xong
```bash
docker run -p 8080:8080 backend

```