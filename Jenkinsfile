pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        DOCKER_IMAGE = "suyog18/k8s-nodejs-app:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/suyog12345/k8s-nodejs-app.git'
            }
        }

        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: '**/*.js, package.json, Dockerfile, deployment*.yaml', fingerprint: true
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                      echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                      docker push %DOCKER_IMAGE%

                    '''
                }
            }
        }

        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                bat '''
                  kubectl apply -f deployment.yaml
                  kubectl apply -f deploymentservice.yaml
                  kubectl get pods
                  kubectl get svc
                '''
            }
        }
    }
}
