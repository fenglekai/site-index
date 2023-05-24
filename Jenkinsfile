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

    stage('Copy file to nginx') {
      steps {
        sh 'scp -P 2233 -r ./dist/* root@devkai.site:/web-code/site-index'
      }
    }

  }
}