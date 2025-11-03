pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-cred'
    IMAGE_NAME = 'yourdockerhubusername/myapp'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/yourusername/docker-ci-demo.git'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CRED}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
          sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
          sh "docker push ${IMAGE_NAME}:latest"
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker stop myapp || true
          docker rm myapp || true
          docker run -d --name myapp -p 8080:80 ${IMAGE_NAME}:latest
        '''
      }
    }
  }

  post {
    success { echo "✅ Deployment Successful!" }
    failure { echo "❌ Build Failed" }
  }
}
