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
        sh 'cp -r ./dist/* /web-code/site-index'
      }
    }

    stage('Clean workspace') {
      steps {
        cleanWs(deleteDirs: true, cleanupMatrixParent: true, cleanWhenUnstable: true, cleanWhenSuccess: true, cleanWhenNotBuilt: true, cleanWhenFailure: true, cleanWhenAborted: true)
      }
    }

  }
}