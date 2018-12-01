# Project CodeBattle
## Description
CodeBattle let's you compete with other people in solving coding related problems. 
The game involves solving a task, for example, sorting a list. 
The task should be solved by writing code in an IDE that is on the website. 
When the task is resolved, the solution is submitted and the time it took is compared against the opponent's time. 
The shortest time wins the competition. If you want to play, you must register via the application. 
There will be a simple scoring system. You will be able to add friends. 
First of all, the tasks will be manually specified by us. 
As time goes by, users should be able to create tasks themselves.

## Live demo
A live demo of the project can be found [here](http://130.240.200.87:8080/)


## Dependencies
Install nodejs 
```
sudo apt install nodejs
```

Install npm 
```
sudo apt install npm
```
Install dependencies 
```
cd 2018-project-codebattle/
npm install
```

Install docker 
```
sudo apt install docker.io
```

Add the user to the docker group 
```
sudo usermod -a -G docker $USER
```
Reboot the host.

## Run the server

To run the server just type 
```
nodemon
```

Because a docker container is used to run the (possibly unsafe) code from the user, the docker must be started. To build the Docker image:
```
cd code_environment/
docker build -t codeenv .
```

To run the app that evaluates the javascript code type:
```
docker run -d -p 4000:80 codeenv
```
