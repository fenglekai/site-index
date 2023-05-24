pipeline {
  agent {
    docker {
      image 'node:latest'
    }

  }
  stages {
    stage('Initial') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('test') {
      steps {
        sh 'ls'
      }
    }

  }
  environment {
    MAVEN_OPTS = '-Xmx4096m -Xms4096m'
  }
}