# public experiment #1

* clone the repo 

* create `.env` file using `.env.example` and add your chatGPT API key

* `npm install && npm start`

everything in the `public` repo is used by p5.js client (it has to be there for it to be useable)

everything in the `src` repo is used by the server

![first](https://github.com/nworb999/public-experiment-1/assets/20407156/7b9ec7ab-5116-4a2d-82dc-9e6db3b3a5eb)

![software-diagram](https://github.com/nworb999/public-experiment-1/assets/20407156/bb48c43a-dc0a-4d88-ac6b-689be801abe3)

<img width="1512" alt="broken-state-1" src="https://github.com/nworb999/public-experiment-1/assets/20407156/1cab66a9-c965-4815-822e-2ec30e1c3245">

![broken-state-2](https://github.com/nworb999/public-experiment-1/assets/20407156/28bd9914-25a5-47b9-80cb-02390075b4c5)

## debugging

if you get 

```
node:internal/modules/cjs/loader:1078
  throw err;
  ^

Error: Cannot find module '../lib/cli'
```

remove the `node_modules/` repo and rerun `npm install`