FROM maven:3-openjdk-17 AS build
COPY ./TrueBackend .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build TrueBackend/target/TrueBackend-0.0.1-SNAPSHOT.jar TrueBackend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","TrueBackend.jar"]