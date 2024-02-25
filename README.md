# public experiment #1

[![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg

a node.js-powered p5.js sketch simulating cafeteria dynamics for nine characters with different personalities

## background

**“public experiment #1"** is a multi-agent system inspired by the memory architecture in [this paper](https://arxiv.org/pdf/2304.03442.pdf).  My ultimate goal is to recreate believable human behavior in generative agents, with a focus on adding emotional and psychological mechanisms to the “reflect” process which could generate “irrational” emergent behavior from the agents. I think of this project as the first step in that direction.  It was my final project for MAT200C.

I ended up focusing a lot more on the underlying architecture than the actual p5.js visualization. I created a turn-based game where agents of nine different alignments (think Chaotic Good, Lawful Evil) pick seats in a cafeteria and converse. They arrange themselves in groups of four at two tables while one leftover sits in the bathroom, and then converse about one of ten different topics, each of which they have a different affinity to. Their past relationships with each other are considered when conversation outcomes are calculated.
Ultimately, this served as a reintroduction to writing solo software, and my first time working closely with ChatGPT.  On the one hand, the project was more work than I expected, but on the other I was able to work far faster and more efficiently than ever before thanks to AI. Even the time spent on difficult errors from hundreds of lines of unfamiliar code were outweighed by the overall productivity boost.  

With more time I would like to work on the visuals. The first thing I would do is make the characters stop walking through tables on the way to their seats. The next thing I would do is compress it to look like a retro video game, with a more interesting background. I was thinking of adding a popout text bubble with summaries for each table conversation and stat bars for different relationships.


## setup

* clone the repo 

* create `.env` file using `.env.example` and add your chatGPT API key

* `npm install && npm start`

everything in the `public` repo is used by p5.js client (it has to be there for it to be useable)

everything in the `src` repo is used by the server

### early diagram
![first](https://github.com/nworb999/public-experiment-1/assets/20407156/7b9ec7ab-5116-4a2d-82dc-9e6db3b3a5eb)

### software diagram
![software-diagram](https://github.com/nworb999/public-experiment-1/assets/20407156/bb48c43a-dc0a-4d88-ac6b-689be801abe3)

## known issues

not working with any chat services other than simple service

## reflections

* debugging was a pain with unfamiliar code
* I should have started with all layers stubbed out (api, domain model, frontend/backend services) then added game logic + p5.js draw logic
* I should have realized sooner that chatGPT was not going to be an option without $$$ or setting up ollama on the shared server (which required a lot of cleanup)
* I created issues with async handling + p5.js that never got resolved but will have to be considered (waiting to store memories for the conversation results)

## debugging

if you get 

```
node:internal/modules/cjs/loader:1078
  throw err;
  ^

Error: Cannot find module '../lib/cli'
```

remove the `node_modules/` repo and rerun `npm install`
