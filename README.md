#Protect my community
This is a application which will help the english learners to practice hyphenation, the project is divided into three modules "Word List", "Game" and "Ranking list". Several word list which is made of a list of word entry will be presented at "Word List" module, each word entry contains two parameter, a original word and its corresponding hyphenated word, for example, the original word is "rejoice", so the corresponding hyphenated word is "re-joice". A game will be embedded at this project at "game" module. Moreover the player's record after finishing each game will be saved at "ranking list" module.
##Getting start
These instructions will get you a copy of the project up and running on your local machine for development and testing purpose. See deployment for notes on how to deploy the project on a live system.
###Prerequisites
For building and running the application you need:
- [Intellij IDEA](https://www.jetbrains.com/idea/download/)
- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)
- [Mysql 8](https://www.mysql.com/downloads/)
### Running the application locally
Before running the application locally, several steps need to be followed：

1.Import the data source "protect_my_community.sql" from current directory.

2.Change the Mysql password according to yours at application.yml. 

3.Import the maven dependencies at pom.xml (You can use auto-import if you use IDEA to open the project)

4.There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the 'com.xiaozijian.protectmycommunity.ProtectmycommunityApplication' class from your IDE.
  
  Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

##Enter the project
After you run the project locally, you can open your browser and input the website http://localhost:8080 to enter the main page of the application.

##Author
* **Qiu Mengke** -[See more at github](https://github.com/epicure1998)
