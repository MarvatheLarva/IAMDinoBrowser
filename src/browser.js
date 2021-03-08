const network = synaptic.Network.fromJSON(JSON.parse('{"neurons":[{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.4,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.2,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":0.25,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":0,"old":0,"activation":1,"bias":0,"layer":"input","squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.736568903637635,"old":3.1912886516004066,"activation":0.9767191702094018,"bias":1.530901205255847,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":4.200722666445403,"old":1.5327684900539424,"activation":0.9852364835781293,"bias":-0.8693348481523703,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":4.731223305649334,"old":2.1095434835127427,"activation":0.9912613569131169,"bias":0.6346718348550913,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":3.745683392684303,"old":3.2136958469911057,"activation":0.9769255250006962,"bias":1.5344318950847522,"layer":0,"squash":"LOGISTIC"},{"trace":{"elegibility":{},"extended":{}},"state":-6.1909217054378,"old":-5.935914379946464,"activation":0.002043752807625181,"bias":-0.5029626626971847,"layer":"output","squash":"LOGISTIC"}],"connections":[{"from":0,"to":5,"weight":0.33846486071875875,"gater":null},{"from":0,"to":6,"weight":-0.6279717229319235,"gater":null},{"from":0,"to":7,"weight":-0.32164937414952316,"gater":null},{"from":0,"to":8,"weight":0.356909354049873,"gater":null},{"from":1,"to":5,"weight":0.15329927106445826,"gater":null},{"from":1,"to":6,"weight":1.0504344950929794,"gater":null},{"from":1,"to":7,"weight":-1.9636237035283555,"gater":null},{"from":1,"to":8,"weight":0.06862704910332208,"gater":null},{"from":2,"to":5,"weight":0.8884445818588386,"gater":null},{"from":2,"to":6,"weight":0.7371241584952523,"gater":null},{"from":2,"to":7,"weight":-3.623187210185612,"gater":null},{"from":2,"to":8,"weight":0.9236468764284754,"gater":null},{"from":3,"to":5,"weight":0.24227248429328352,"gater":null},{"from":3,"to":6,"weight":-3.857023969342761,"gater":null},{"from":3,"to":7,"weight":12.004138409871434,"gater":null},{"from":3,"to":8,"weight":0.2683864015903632,"gater":null},{"from":4,"to":5,"weight":1.090597056384459,"gater":null},{"from":4,"to":6,"weight":5.338175696912339,"gater":null},{"from":4,"to":7,"weight":5.2402319385089955,"gater":null},{"from":4,"to":8,"weight":1.0640078466052718,"gater":null},{"from":5,"to":9,"weight":0.40037028792358204,"gater":null},{"from":6,"to":9,"weight":5.951459175925065,"gater":null},{"from":7,"to":9,"weight":-12.411266713579641,"gater":null},{"from":8,"to":9,"weight":0.36667973333719406,"gater":null}]}'));

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
