#!/bin/bash

# LeoLilly Care International Deployment Script
# This script builds the React app and deploys it to the production server

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== LeoLilly Care International Deployment Script ===${NC}"
echo "Starting deployment process..."

# Configuration
FTP_USER="admin@leolilly.org"
FTP_SERVER="ftp.leolilly.org"
FTP_PORT="21"
REMOTE_DIR="/"
BUILD_DIR="build"
TEMP_DIR="deploy_temp"

# Step 1: Build the React application
echo -e "\n${YELLOW}Step 1: Building React application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed! Aborting deployment.${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Step 2: Prepare server files
echo -e "\n${YELLOW}Step 2: Preparing server files...${NC}"

# Create temp directory for deployment
mkdir -p $TEMP_DIR

# Copy server files to build directory
cp -r server $BUILD_DIR/
mkdir -p $BUILD_DIR/server/logs

# Remove development files from server directory
rm -f $BUILD_DIR/server/*.log
rm -f $BUILD_DIR/server/test_*.php
rm -f $BUILD_DIR/server/direct_test.php

echo -e "${GREEN}Server files prepared!${NC}"

# Step 3: Create deployment package
echo -e "\n${YELLOW}Step 3: Creating deployment package...${NC}"
cp -r $BUILD_DIR/* $TEMP_DIR/

echo -e "${GREEN}Deployment package created!${NC}"

# Step 4: Deploy to server
echo -e "\n${YELLOW}Step 4: Deploying to production server...${NC}"
echo "Please enter your FTP password:"
read -s FTP_PASSWORD

echo "Uploading files to $FTP_SERVER..."
echo "This may take a few minutes depending on your connection speed."

# Create a temporary script for lftp
cat > lftp_script.txt << EOF
open -u $FTP_USER,$FTP_PASSWORD -p $FTP_PORT $FTP_SERVER
set ssl:verify-certificate no
mirror -R $TEMP_DIR $REMOTE_DIR
bye
EOF

# Execute lftp with the script
lftp -f lftp_script.txt

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed! Please check your FTP credentials and connection.${NC}"
    rm lftp_script.txt
    exit 1
fi

# Clean up
rm lftp_script.txt
rm -rf $TEMP_DIR

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}"
echo "Your application has been successfully deployed to production."
echo "Visit https://leolilly.org to see your live site."
