# WeatherApplication

Sample application to build application using latest tools. Application to check location based weather details.

# Dependencies 
- [git](https://git-scm.com/downloads)  
- [Node js](https://nodejs.org/en/download/)   
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 

# Running application 
- This application can be run in node or in docker. Follow the process to get the application started. 

## Clone Repository 
- Create a directory, named 'codebase' in D drive (or any other drive) 
- Navigate to the directory i.e ```D:\codebase\```
- Run the command ```git clone https://github.com/kaushalpbehere/WeatherApplication.git```
- Navigate to the root directory of the application - for example  'D:\codebase\WeatherApplication'


## Running as a node application
- Run the command in command prompt as ``` node src/server.js``` 

## Running as a containerized application
Note: Dockerfile is present at the same location.
![1](https://user-images.githubusercontent.com/15343632/220413894-c0c10a7b-72a4-416b-ae48-a76825db6d5e.png)

- Build docker image using following command 
```docker build -t getting-started .```

- Run docker image
```docker run -dp 3000:3000 getting-started ```

- Irrespective of where you run it, in the browser, navigate to [localhost at port 3000](http://localhost:3000/)
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
