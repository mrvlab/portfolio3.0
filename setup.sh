#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use the Node.js version specified in .nvmrc
echo "Using Node.js version from .nvmrc..."
nvm use

# Install dependencies
echo "Installing dependencies with yarn..."
yarn install

echo "Setup complete! You can now run 'yarn dev' to start the development server."
