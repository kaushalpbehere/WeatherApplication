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

## Stopping the application 
- If running in a node environment, navigate to command prompt (from where you were running the app), ``` CTRL+C ```
- If running in a docker environment, 
  -- Run ``` docker ps ``` to list all available containers
  -- Run ```docker stop <the-container-id> ``` Note: first 2 characters are enough.
  
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

graph TD     subgraph External Users & Systems         A[Users/Admins] --> B(Web/CLI Client)         C[Applications/Services] --> B     end      subgraph User & API Facing Layer         B --> D(API Gateway)         D -- JWT/API Key --> E[Authentication Service]         D -- Authz Request --> F[Authorization Service]     end      subgraph Core PAM Microservices         E -- User Info --> G[User Directory Service]         F -- Policy Check --> H[Policy Management Service]         D --> I[Secrets Management Service]         D --> J[Session Management Service]         I -- Uses --> K[External KMS (e.g., Vault, AWS KMS)]         J -- Connects via --> L[Target System Connector Services]         L --> M[Target Systems (Servers, DBs, Cloud APIs)]     end      subgraph Supporting Services         J --> N[Audit Logging Service]         I --> N         H --> N         E --> N         F --> N         N --> O[Reporting & Analytics Service]         P[Workflow Engine Service] -- Orchestrates --> I         P -- Orchestrates --> J         P -- Notifies --> Q[Notification Service]         Q -- Sends alerts to --> R[Alerting Channels (Email, PagerDuty)]         S[Health Monitoring & Alerting Service] --> T[Monitoring Dashboards & Alerting]     end      subgraph Data Stores         U[PostgreSQL Database] -- Auth Service Data --> F         U -- Secrets Data --> I         U -- Session Data --> J         U -- Policy Data --> H         V[NoSQL / Data Lake] -- Audit Logs --> N         W[User Directory (e.g., LDAP/AD)] <-- Sync --> G     end      subgraph Infrastructure         X[Service Mesh (e.g., Istio)] -- Secures & Manages --> E & F & I & J & H & P & Q & S & N & O & G & L         Y[Kubernetes Cluster] -- Hosts & Orchestrates --> E,F,I,J,H,P,Q,S,N,O,G,L     end      %% Data Flow Arrows     D -- API Calls --> I     D -- API Calls --> J     D -- API Calls --> H     D -- API Calls --> P      I -- Audit --> N     J -- Audit --> N      N --> O      P --> Q      X -- Observability Data --> S     S --> T      F -- Data --> U     I -- Data --> U     J -- Data --> U     H -- Data --> U      N -- Data --> V      G -- Data --> W 

