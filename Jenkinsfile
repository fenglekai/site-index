pipeline {
  agent {
    docker {
      image 'node'
      args '-v /web-code/site-index:/web-code/site-index:rw'
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
        sh '''ls /web-code/site-index
cp -r ./dist/* /web-code/site-index'''
      }
    }

  }
}