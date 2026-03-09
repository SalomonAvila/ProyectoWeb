#!/bin/bash
set -e
cd backend/vigilapp
mvn clean package -DskipTests
cd ../..
docker compose up --build backend
