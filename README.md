## React Native Calculator App 
A simple cross platform (iOS and Android) React Native calculator app.

### Installation and running
```bash
  # Clone project
  git clone https://github.com/duypd1309/react-native-calculator.git
```
#### Running directly on local machine has Node.js 
```bash
  # Install node_modules by node package manager
  npm install
  
  # Run app
  npm start
```

#### Running in Docker Container
```bash
  # Pull node v16.17.1 image
  docker pull node:16.17.1-alpine3.15
  
  # Run container with node.js image
  docker run --rm -it -p 19000:19000 -p 19006:19006 --name react-native -v "$(pwd)":/app node:16.17-alpine3.15 sh
  # On Windows shell: ["$(pwd)"] should be replaced with absolute path. E.g: //c/react-native-calculator 
  
  # After entering shell of container
  cd app
  npm install
  
  # Run npm start with REACT_NATIVE_PACKAGER_HOSTNAME=[real-host-machine-ip]
  REACT_NATIVE_PACKAGER_HOSTNAME=[real-host-machine-ip] npm start
  # E.g: REACT_NATIVE_PACKAGER_HOSTNAME=192.168.x.x npm start



