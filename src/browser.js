const network = synaptic.Network.fromJSON(JSON.parse('{"neurons":[{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.4,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.4,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.25,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.6820754393225803,"old":3.09394954573568,"activation":0.9754473271141785,"bias":1.1588240233843936,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.4927380226300926,"old":3.0327483885937703,"activation":0.9704804362544189,"bias":1.4664612657136025,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.4238584212639216,"old":2.6192247604622056,"activation":0.9684419067624377,"bias":0.7874899816695642,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":4.734711289038335,"old":2.663246074026004,"activation":0.991291519085284,"bias":1.042531126192814,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":2.438165984634767,"old":1.309398125899897,"activation":0.9196917337868126,"bias":0.7088842966646925,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.6375854202107076,"old":3.0521123040297793,"activation":0.9743589558832311,"bias":1.2778470846860757,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":-9.347761297241082,"old":-8.012073573759862,"activation":0.00008715273064649183,"bias":1.2142631221498792,"layer":"output","squash":"LOGISTIC"}],"connections":[{"from":0,"to":6,"weight":0.4190001058318385,"gater":null},{"from":0,"to":7,"weight":0.31129870898094175,"gater":null},{"from":0,"to":8,"weight":0.2832202741436451,"gater":null},{"from":0,"to":9,"weight":-1.2267597208584562,"gater":null},{"from":0,"to":10,"weight":-0.7481566210285211,"gater":null},{"from":0,"to":11,"weight":0.4397856424803618,"gater":null},{"from":1,"to":6,"weight":0.43527381506175494,"gater":null},{"from":1,"to":7,"weight":0.4277996616422259,"gater":null},{"from":1,"to":8,"weight":0.4192729707739415,"gater":null},{"from":1,"to":9,"weight":-1.1357900247469785,"gater":null},{"from":1,"to":10,"weight":-0.6517615465385826,"gater":null},{"from":1,"to":11,"weight":0.4448190894948385,"gater":null},{"from":2,"to":6,"weight":1.0650612703671134,"gater":null},{"from":2,"to":7,"weight":0.726609748427456,"gater":null},{"from":2,"to":8,"weight":0.9196358593333231,"gater":null},{"from":2,"to":9,"weight":-2.985748052995315,"gater":null},{"from":2,"to":10,"weight":-1.8026685735907297,"gater":null},{"from":2,"to":11,"weight":0.8758181440340547,"gater":null},{"from":3,"to":6,"weight":-0.23921166752504916,"gater":null},{"from":3,"to":7,"weight":0.33611781667401985,"gater":null},{"from":3,"to":8,"weight":-0.6943659941400235,"gater":null},{"from":3,"to":9,"weight":13.921132562694696,"gater":null},{"from":3,"to":10,"weight":7.33906538407875,"gater":null},{"from":3,"to":11,"weight":-0.16358949731142577,"gater":null},{"from":4,"to":6,"weight":1.1762805991865315,"gater":null},{"from":4,"to":7,"weight":0.9199962663107392,"gater":null},{"from":4,"to":8,"weight":1.6093221931103168,"gater":null},{"from":4,"to":9,"weight":4.142671223884578,"gater":null},{"from":4,"to":10,"weight":2.2571784241745814,"gater":null},{"from":4,"to":11,"weight":1.1709729746516315,"gater":null},{"from":5,"to":6,"weight":0.027818226112445055,"gater":null},{"from":5,"to":7,"weight":0.08937747038937466,"gater":null},{"from":5,"to":8,"weight":-0.03857576554761031,"gater":null},{"from":5,"to":9,"weight":0.06617911833364917,"gater":null},{"from":5,"to":10,"weight":-0.035459928893083734,"gater":null},{"from":5,"to":11,"weight":0.08798495444617155,"gater":null},{"from":6,"to":12,"weight":2.050139535854987,"gater":null},{"from":7,"to":12,"weight":1.1484248911638086,"gater":null},{"from":8,"to":12,"weight":2.5460307871907286,"gater":null},{"from":9,"to":12,"weight":-12.28062427982615,"gater":null},{"from":10,"to":12,"weight":-6.2557788073776885,"gater":null},{"from":11,"to":12,"weight":1.8318887460922448,"gater":null}]}'));

const state = {
    jumping: false,
    ducking: false
};

function jump(jumping) {
    if (jumping || state.jumping) { return }

    state.ducking = 0;
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));
    
    state.jumping = true;
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 38 }));
}

function duck(ducking, jumping) {
    if (ducking || state.ducking && jumping) { return }
    
    state.jumping = false;
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
    
    state.ducking = true;
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 40 }))
}

function acquire(obstacle) {
    if (!obstacle) { return [0, 0, 0, 0, 0, 0]}

    return [
        obstacle.width / 100, // width,
        obstacle.typeConfig.height / 100, // height,
        1, // speed,
        (100 - Math.min(obstacle.yPos, 100))  / 100, // origin,
        Math.min(obstacle.xPos, 500) / 500, // distance
        0, // dino position
    ];
}

function play(obstacles, tRex) {
    let obstacle = null;
    if (obstacles.length && obstacles[0].xPos > 40) {
        obstacle = obstacles[0];
    } else if (obstacles.length > 1) {
        obstacle = obstacles[1]
    }

    const inputs = acquire(obstacle)
    const output = network.activate(inputs)[0];

    if (output > 0.55) { jump(tRex.jumping) }
    if (output < 0.54) { duck(tRex.ducking, tRex.jumping) }
}

const protoUpdate = Runner.prototype.update;

Runner.config.SPEED = 13;
Runner.prototype.update = function() {
    // console.log(Object.assign({}, this));
    if (this.activated) { play(this.horizon.obstacles, this.tRex) }

    protoUpdate.bind(this)();
}