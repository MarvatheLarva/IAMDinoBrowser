const network = synaptic.Network.fromJSON(JSON.parse('{"neurons":[{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.4,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.2,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.25,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.525074221271658,"old":2.698217844242756,"activation":0.9713928482903985,"bias":1.2710237477536392,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":2.879820064480056,"old":1.3206882877946977,"activation":0.9468398074220795,"bias":0.7857364928946107,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.58483249187051,"old":1.6090055316114924,"activation":0.9730074934664366,"bias":0.9695590052554284,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.086382723848513,"old":1.913453876598358,"activation":0.9563275379911842,"bias":0.6606475127125301,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":-8.414718876415686,"old":-6.298835640851035,"activation":0.0002215326813778286,"bias":2.6111182021324026,"layer":"output","squash":"LOGISTIC"}],"connections":[{"from":0,"to":5,"weight":0.3564928683242447,"gater":null},{"from":0,"to":6,"weight":0.11069171294399638,"gater":null},{"from":0,"to":7,"weight":-0.03975573643438721,"gater":null},{"from":0,"to":8,"weight":0.00843653801604297,"gater":null},{"from":1,"to":5,"weight":0.11489961442098258,"gater":null},{"from":1,"to":6,"weight":-1.3414701276084307,"gater":null},{"from":1,"to":7,"weight":-1.5437436428265388,"gater":null},{"from":1,"to":8,"weight":0.3792244718274458,"gater":null},{"from":2,"to":5,"weight":0.7351099005907189,"gater":null},{"from":2,"to":6,"weight":-2.2663796410238284,"gater":null},{"from":2,"to":7,"weight":-2.7364032406914105,"gater":null},{"from":2,"to":8,"weight":0.6707848837027499,"gater":null},{"from":3,"to":5,"weight":-0.09963288433630092,"gater":null},{"from":3,"to":6,"weight":7.951154281777369,"gater":null},{"from":3,"to":7,"weight":9.540791072205955,"gater":null},{"from":3,"to":8,"weight":-1.1187429355811658,"gater":null},{"from":4,"to":5,"weight":1.3782638217776098,"gater":null},{"from":4,"to":6,"weight":2.596745823790237,"gater":null},{"from":4,"to":7,"weight":3.291164850685047,"gater":null},{"from":4,"to":8,"weight":1.9553975739890144,"gater":null},{"from":5,"to":9,"weight":1.9672079754863716,"gater":null},{"from":6,"to":9,"weight":-7.400039054857777,"gater":null},{"from":7,"to":9,"weight":-9.184445498442479,"gater":null},{"from":8,"to":9,"weight":3.1434927752611044,"gater":null}]}'));

function BOT() {
    if (BOT.instance_) { return BOT.instance_ }

    BOT.instance_ = this;
}

BOT.state = {
    jumping: false,
    ducking: false
};

BOT.prototype = {
    jump(jumping) {
        if (jumping || BOT.state.jumping) { return }

        BOT.state.ducking = false;
        document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));

        BOT.state.jumping = true;
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 38 }));
    },
    duck(ducking, jumping) {
        if (ducking || BOT.state.ducking && jumping) { return }

        BOT.state.jumping = false;
        document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));

        BOT.state.ducking = true;
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 40 }))
    },
    acquire(speed, obstacle) {
        if (!obstacle) { return [0, 0, 0, speed / Runner.config.MAX_SPEED, 0, 0]}
        const maxHeight = Runner.instance_.dimensions.HEIGHT - 50;

        return [
            obstacle.width / 100,                                                                           // width
            obstacle.typeConfig.height / 100,                                                               // height
            speed / Runner.config.MAX_SPEED,                                                                // speed
            (maxHeight - Math.min(obstacle.yPos, maxHeight))  / maxHeight,                                  // origin
            Math.min(obstacle.xPos, Runner.instance_.dimensions.WIDTH) / Runner.instance_.dimensions.WIDTH, // distance
        ];
    },
    play(speed, obstacles, tRex) {
        let obstacle = null;
        if (obstacles.length && obstacles[0].xPos > 35) { obstacle = obstacles[0] } 
        else if (obstacles.length > 1) { obstacle = obstacles[1] }

        const inputs = this.acquire(speed, obstacle);
        const output = network.activate(inputs)[0];

        if (output > 0.55) { this.jump(tRex.jumping) }
        if (output < 0.54) { this.duck(tRex.ducking, tRex.jumping) }
    }
}

BOT();

const protoUpdate = Runner.prototype.update;
Runner.config.SPEED = 13;
Runner.prototype.update = function() {
    if (this.activated) { BOT.prototype.play(this.config.SPEED, this.horizon.obstacles, this.tRex) }

    protoUpdate.bind(this)();
}
