pipeline {
  agent {
    docker {
      image 'node'
      args 'latest'
    }

  }
  stages {
    stage('Initial') {
      steps {
        sh 'npm install'
      }
    }

  }
}