pipeline {
  agent {
    docker {
      image 'node'
      args '-v /web-code/site-index:/var/jenkins_home/web-code/site-index:rw'
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
        sh 'cp -r ./dist/* /var/jenkins_home/web-code/site-index'
      }
    }

  }
}