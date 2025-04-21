# Use Java 21 as the base image
FROM eclipse-temurin:21-jdk-alpine as build

# Set working directory
WORKDIR /app

# Copy maven wrapper files
COPY mvnw .
COPY .mvn .mvn

# Copy project files
COPY pom.xml .
COPY src src

# Make mvnw executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/chat-app-project
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=1234

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]