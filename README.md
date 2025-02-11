

# Karas Frontend

The frontend server for the Karas

## Getting Started
The app can be run locally. Follow the instructions below

### Prequisites
Requirements to deploy and run this project
- [Node.js v17 or higher.](https://nodejs.org/en/about/previous-releases)
- [Npm latest release](https://www.npmjs.com/)

### Extension Requirement
Please use the following extension in order to comply to the project's stand
- [Tailwind Sorter](https://marketplace.visualstudio.com/items?itemName=dejmedus.tailwind-sorter)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Installation
First, enter your working repository/folder and clone the repository
```bash
git clone git@github.com:Indraneers/karas-frontend.git
```

Then enter directory and install the dependencies
```bash
cd karas-frontend
npm install
```

### Environment Variable
Use the following env template or the one found `.env.example`.
```
# frontend port
PORT=5173

# backend api url
VITE_BACKEND_API_URL=
VITE_KEYCLOAK_URL=
VITE_MINIO_URL=
VITE_BUCKET_NAME=
VITE_CLIENT_ID=
VITE_AUTHORITY=

VITE_SHOW_DEV_TOOLS=
```

### Running the app locally
To start a local server, run
```bash
npm run dev
```


## Live Deployment
TBA
