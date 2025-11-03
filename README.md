# Docker-cicd-docker-demo
# Jenkins CI/CD Pipeline with Docker Integration

## Overview
This project demonstrates a **Continuous Integration and Continuous Deployment (CI/CD)** pipeline using **Jenkins** and **Docker**.  
The pipeline automatically fetches code from GitHub, builds a Docker image, pushes it to Docker Hub, and optionally deploys it on a server.

---

## Workflow Summary

Here’s what happens when code is pushed to GitHub:

1. Jenkins automatically triggers a build (via webhook or manual trigger).  
2. Jenkins pulls the latest source code from GitHub.  
3. The application is built or tested (if required).  
4. Jenkins builds a Docker image using the project’s `Dockerfile`.  
5. The built Docker image is pushed to **Docker Hub**.  
6. (Optional) Jenkins deploys the container on the server.

---

## Pipeline Stages Explained

### 1️⃣ Checkout (Source Code)
- Jenkins pulls the source code from GitHub using stored credentials.  
- Command used internally:
  ```bash
  git clone https://github.com/<your-username>/<your-repo>.git
2️⃣ Build Application
If the app requires compilation or dependency installation, it’s done here.

Example:

npm install     # Node.js app

mvn package     # Java app

pip install -r requirements.txt  # Python app

3️⃣ Build Docker Image
Jenkins builds the Docker image using the provided Dockerfile.

Command:

docker build -t <dockerhub-username>/<image-name>:latest .

4️⃣ Push to Docker Hub
Jenkins logs into Docker Hub using saved credentials and pushes the built image.

Command:

docker push <dockerhub-username>/<image-name>:latest

5️⃣ Deploy (Optional)
After pushing, Jenkins can automatically run the new container on the server.

Example:

docker run -d -p 8080:80 <dockerhub-username>/<image-name>:latest

Tools and Technologies Used
Tool	Purpose

Jenkins -> Automate the CI/CD workflow

GitHub -> Store and version control source code

Docker -> Containerize the application

Docker -> Hub	Store built Docker images

Linux (Ubuntu/RHEL)	-> Jenkins host and deployment environment

Jenkins Credentials Required
Credential ID	Type	Used For
github-cred	Username + Personal Access Token	To fetch code from GitHub
dockerhub-cred	Username + Password	To push images to Docker Hub


  Step       Tool                  Action               Output             
| ---- | --------------- | --------------------- | -------------------|
| 1️  | GitHub          | Developer pushes code | Updated repo        |
| 2️  | Jenkins         | Triggers pipeline     | Starts build        |
| 3️  | Jenkins + Git   | Clones repo           | Local copy of code  |
| 4️  | Jenkins         | Builds app            | Compiled code       |
| 5️  | Docker          | Builds Docker image   | App container image |
| 6️  | Docker Hub      | Pushes image          | Image stored online |
| 7️  | Docker / Server | Deploys image         | Running container   |
| 8️  | Jenkins         | Shows result          | Success or failure  |
          ┌──────────────┐
          │   Developer  │
          │   pushes code│
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │   GitHub     │
          │ (Repo + Hook)│
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │   Jenkins    │
          │  (Pipeline)  │
          └──────┬───────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
   Build App         Build Docker Image
                          │
                          ▼
                 Push to Docker Hub
                          │
                          ▼
                    Deploy Container
                          │
                          ▼
                 ✅ Application Live
Summary

This project shows how to integrate Jenkins, GitHub, and Docker to create an automated CI/CD workflow.
Every code change triggers a new Docker image build and pushes it to Docker Hub — enabling faster releases and greater consistency across environments.
