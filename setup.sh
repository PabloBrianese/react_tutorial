# Compiler basics
apt install build-essential

# Node.js LTS (v14.x):
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash
apt install nodejs

# Starting with create-react-app
npx create-react-app my-app
cd my-app

cd src
rm -f *
touch index.css  # add contents
touch index.js  # add contents
cd ..

# Handles virtual machine communication when using WSL
touch .env
echo "CHOKIDAR_USEPOLLING=true" >> .env

npm start  # this takes an incredible amount of time
# Open localhost in incognito mode to keep the browser from caching the contents