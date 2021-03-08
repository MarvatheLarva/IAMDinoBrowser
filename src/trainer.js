const { Architect, Trainer } = require('synaptic');

const set = [
    {"input": [0,0,0,0,0,0],"output": [0]},

    // jump obstacle
    {"input": [0.4, 0.4, 1, 0, 1], "output": [0]},
    {"input": [0.4, 0.4, 1, 0, 0.8], "output": [0]},
    {"input": [0.4, 0.4, 1, 0, 0.5], "output": [1]},

    // duck obstacle
    {"input": [0.4, 0.4, 1, 0.25, 0], "output": [0]},
    {"input": [0.4, 0.4, 1, 0.25, 0.5], "output": [0]},
    {"input": [0.4, 0.4, 1, 0.25, 1], "output": [0]},

];

const network = new Architect.Perceptron(5, 6, 1);
var trainer = new Trainer(network);

const results = trainer.train(set);
console.log(results);
console.log(JSON.stringify(network));
