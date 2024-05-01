FROM maven:3-openjdk-17 AS build
COPY ./TrueBackend .
RUN mvn clean package -DskipTests

## Stage 2: Install Node.js and npm
#FROM node:14 AS frontend
#WORKDIR /app/src/main/resources/static
#COPY ./TrueBackend/src/main/resources/package.json ./TrueBackend/src/main/resources/package-lock.json ./
#RUN npm install

FROM openjdk:17.0.1-jdk-slim
#COPY --from=frontend /app/src/main/resources/static/node_modules ./src/main/resources/static/node_modules
COPY --from=build target/TrueBackend-0.0.1-SNAPSHOT.jar TrueBackend.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","TrueBackend.jar"]