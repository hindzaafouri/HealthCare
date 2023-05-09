FROM openjdk:11-jdk-slim
ADD target/healthcare-0.0.1-SNAPSHOT.jar /target/
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/target/healthcare-0.0.1-SNAPSHOT.jar"]