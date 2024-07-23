pipeline {
  agent {
    docker {
      image 'node'
      args '-v /web-code/site-index:/web-code/site-index:rw'
    }

  }
  stages {
    stage('Set npm configure') {
        steps {
            sh 'npm config set registry https://registry.npmmirror.com'
        }
    }
    
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

    stage('Update file to nginx') {
      steps {
        sh 'rm -rf /web-code/site-index/* && cp -r ./dist/* /web-code/site-index'
      }
    }

    stage('Clean workspace') {
      steps {
        cleanWs(deleteDirs: true, cleanupMatrixParent: true, cleanWhenUnstable: true, cleanWhenSuccess: true, cleanWhenNotBuilt: true, cleanWhenFailure: true, cleanWhenAborted: true)
      }
    }

  }
}