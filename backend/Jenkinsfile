pipeline {
    agent any

    // --- AÑADE ESTA SECCIÓN ---
    options {
        // Limpia el workspace antes de que el código sea descargado
        cleanWs()
    }
    // -------------------------

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Código descargado.'
            }
        }
        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo 'Construyendo la imagen Docker del backend...'
                    sh 'docker build -t athena-bank-backend:latest .'
                }
            }
        }
    }
}