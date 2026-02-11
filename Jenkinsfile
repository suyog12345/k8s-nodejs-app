// pipeline {
//     agent any

//     tools {
//         nodejs 'Node18'
//     }

//     environment {
//         DOCKER_IMAGE = "suyog18/k8s-nodejs-app:latest"
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/suyog12345/k8s-nodejs-app.git'
//             }
//         }

//         stage('Build') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Unit Test') {
//             steps {
//                 bat 'npm test'
//             }
//         }

//         stage('Archive Artifact') {
//             steps {
//                 archiveArtifacts artifacts: '**/*.js, package.json, Dockerfile, deployment*.yaml', fingerprint: true
//             }
//         }

//         stage('Docker Build') {
//             steps {
//                 bat "docker build -t ${DOCKER_IMAGE} ."
//             }
//         }

//         stage('Docker Push') {
//     steps {
//         withCredentials([usernamePassword(
//             credentialsId: 'dockerhub-creds',
//             usernameVariable: 'DOCKER_USER',
//             passwordVariable: 'DOCKER_PASS'
//         )]) {
//             bat '''
//               echo Logging into Docker Hub...
//               docker logout
//               echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin

//               echo Pushing image...
//               docker push %DOCKER_IMAGE%

//               echo Docker push completed.
//             '''
//         }
//     }
// }

//         stage('Deploy to Kubernetes (Minikube)') {
//             steps {
//                 bat '''
//                   kubectl apply -f deployment.yaml 
//                   kubectl apply -f deploymentservice.yaml 
//                   kubectl get pods
//                   kubectl get svc
//                 '''
//             }
//         }
//     }
// }

//for ansible
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
        bat '''
        wsl -d Ubuntu-22.04 bash -lc "cd /home/suyg/k8s-nodejs-app && \
        ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
        -e docker_image=%DOCKER_IMAGE%"
        '''
    }
}


    }
}
