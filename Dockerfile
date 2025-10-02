# ---- Stage 1: Build the JAR ----
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and src from the subfolder
COPY moneymanager/pom.xml .
RUN mvn dependency:go-offline -B

COPY moneymanager/src ./src
RUN mvn clean package -DskipTests

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:21.0.8_7-jre

WORKDIR /app

COPY --from=build /app/target/moneymanager-0.0.1-SNAPSHOT.jar money-manager-v1.0.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "money-manager-v1.0.jar"]
