class EventEmitter {
    constructor(configObj){
        this.settings = configObj
        /*
            configObjExample = {
                id: 102,
                activated: false,
                threshold: 25,
                pos: {
                    latitude: 63.245668,
                    longitude: -117.38574635
                },
                soundMap: {
                    [
                        {
                            source: '../assets/${this.id}/initSound.ogg',
                            threshold: 25,
                            playing: false,
                            played: false,
                            loops: true
                        },
                        {
                            source: '../assets/${this.id}/sound1.ogg',
                            threshold: 10,
                            playing: false,
                            played: false,
                            loops: true
                        },
                        {
                            source: '../assets/${this.id}/sound2.ogg',
                            threshold: 2,
                            playing: false,
                            played: false,
                            loops: true
                        }
                    ]
                }

            }
        */
    }

    checkStatus(userPosObj){
        if (this.activated){
            if (getDistanceFromLatLonInKm(userPosObj.latitude,userPosObj.longitude, this.pos.latitude,this.pos.longitude) <= this.threshold){
                //action
            }
        }


    }
}
