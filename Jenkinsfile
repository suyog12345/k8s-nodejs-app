pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        DOCKER_IMAGE = "suyog18/k8s-nodejs-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suyog12345/k8s-nodejs-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                      echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                      docker push %DOCKER_IMAGE%
                    """
                }
            }
        }

stage('Deploy using Ansible') {
    steps {
        withCredentials([sshUserPrivateKey(
            credentialsId: 'ec2-ssh-key',
            keyFileVariable: 'SSH_KEY'
        )]) {
            bat '''
              @echo off
              setlocal EnableDelayedExpansion

              REM Convert Windows SSH key path to WSL path
              for /f %%i in ('wsl wslpath "%SSH_KEY%"') do set WSL_KEY=%%i

              REM Copy key into Ubuntu filesystem with correct permissions
              wsl -d Ubuntu-22.04 bash -lc "cp !WSL_KEY! /tmp/jenkins_ec2_key.pem && chmod 600 /tmp/jenkins_ec2_key.pem"

              REM Run Ansible using the copied key
              wsl -d Ubuntu-22.04 bash -lc "ANSIBLE_PRIVATE_KEY_FILE=/tmp/jenkins_ec2_key.pem ansible-playbook \
                -i ansible/inventory.ini \
                ansible/deploy.yml \
                -e docker_image=%DOCKER_IMAGE%"

              endlocal
            '''
        }
    }
}
    }
}
