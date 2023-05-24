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
      parallel {
        stage('test') {
          steps {
            sh 'pwd'
          }
        }

        stage('test1') {
          steps {
            sh 'ls /'
          }
        }

      }
    }

  }
}