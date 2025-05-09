# ========================
# Stage 1: Build with Maven
# ========================
FROM eclipse-temurin:21-jdk-alpine AS build

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml separately to cache dependencies
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies (for better caching)
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline

# Now copy the source code (only triggers rebuild if code changes)
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# ========================
# Stage 2: Runtime Image
# ========================
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy only the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables (optional: best for docker-compose or .env file)
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/privateChat-app-project \
    SPRING_DATASOURCE_USERNAME=postgres \
    SPRING_DATASOURCE_PASSWORD=1234

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
