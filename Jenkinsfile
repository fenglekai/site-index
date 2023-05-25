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
        sh 'cp -r ./dist/* /web-code/site-index'
      }
    }

  }
}