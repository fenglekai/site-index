pipeline {
  agent {
    docker {
      image 'node'
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
        sh 'id -un'
        sh 'scp -P 2233 -r ./dist/* root@devkai.site:/web-code/site-index'
      }
    }

  }
}