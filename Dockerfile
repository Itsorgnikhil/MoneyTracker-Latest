# ---- Stage 1: Build the JAR ----
FROM maven:3.9.0-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven files for dependency caching
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies only
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built JAR
COPY --from=build /app/target/moneymanager-0.0.1-SNAPSHOT.jar money-manager-v1.0.jar

# Expose port
EXPOSE 9090

# Run the app (Render will inject env variables automatically)
ENTRYPOINT ["java", "-jar", "money-manager-v1.0.jar"]
