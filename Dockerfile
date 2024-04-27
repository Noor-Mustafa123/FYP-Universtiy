FROM maven:3-openjdk-17 AS build
COPY ./TrueBackend .
RUN mvn clean package -DskipTests

# Stage 2: Install Node.js and npm
FROM node:14 AS frontend
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

FROM openjdk:17.0.1-jdk-slim
COPY --from=build target/TrueBackend-0.0.1-SNAPSHOT.jar TrueBackend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","TrueBackend.jar"]