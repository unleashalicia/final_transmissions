





var earthSceneObj = {
    assets: [
        {
            src: "./AR_Assets/dust.ogv",
            id: "dust",
            autoplay: "true",
            loop: "true"
        }
    ],
    marker: {
        preset: "hiro"
    },
    entities: [
        {
            type: "shape",
            shape: "box",
            dimensions: {
                height: "1",
                width: "1",
                depth: "1"
            },
            material: {
                opacity: "0.9"
            },
            otherAttr: {
                src: "#dust",
                position: "0 0.5 0",
                rotation: "0 0 0"
            },
            animations: [
                {
                    attribute: "rotation",
                    dur: "5000",
                    to: "0 0 360",
                    repeat: "indefinite"
                }
            ]
        }
    ]
};

var waterSceneObj = {
    assets: [
        {
            src: "./Rain%20-%2078.mp4",
            id: "water1",
            autoplay: "false",
            loop: "true"
        },
        {
            src: "./Rain%20-%2078.mp4",
            id: "water2",
            autoplay: "false",
            loop: "true"
        }
    ],
    marker: {
        preset: "hiro"
    },
    entities: [

        {
            type: "shape",
            shape: "octahedron",
            dimensions: {
                radius: "1"
            },
            material: {
                opacity: "0.9"
            },
            otherAttr: {
                src: "#water1",
                position: "-2 0.5 0",
                rotation: "0 0 0"
            },
            animations: [
                {
                    attribute: "rotation",
                    dur: "5000",
                    to: "360 360 360",
                    easing: "linear",
                    repeat: "indefinite"
                },
                {
                    attribute: "position",
                    dur: "3000",
                    from: "-2 0.5 0",
                    to: "-2 0.5 -3",
                    direction: "alternate-reverse",
                    easing: "linear",
                    repeat: "indefinite"
                }
            ]
        },
        {
            type: "shape",
            shape: "octahedron",
            dimensions: {
                radius: "1.5"
            },
            material: {
                opacity: "0.9"
            },
            otherAttr: {
                src: "#water2",
                position: "2 0.5 -3",
                rotation: "0 0 0"
            },
            animations: [
                {
                    attribute: "rotation",
                    dur: "5000",
                    to: "-360 -360 -360",
                    easing: "linear",
                    repeat: "indefinite"
                },
                {
                    attribute: "position",
                    dur: "3000",
                    from: "2 0.5 -3",
                    to: "2 0.5 0",
                    direction: "alternate-reverse",
                    easing: "linear",
                    repeat: "indefinite"
                }
            ]
        }
    ]
};


/*

Quickly set multiple attributes.  Takes in element and an object full or attributes made of key/value pairs.

 */


function setAttributes(el, attributeObj) {

    for (let item in attributeObj){
        el.setAttribute(item, attributeObj[item]);
    }

}


//creator function to dynamically render a-scenes with objects.

function createScene(object){

    var body = document.getElementById('BODY')[0];
    console.log("I'm here");

    var scene = document.createElement('a-scene');
    scene.setAttribute('embedded');
    scene.setAttribute('artoolkit', 'sourceType: webcam;');

    var assets = document.createElement('a-assets');


    body.appendChild(scene);
    scene.appendChild(assets);


    for (var assets_i=0; assets_i<object.assets.length; assets_i++){
        var assetItem = document.createElement('video');
        setAttributes(assetItem, object.assets[assets_i]);
        assets.appendChild(assetItem);
    }

    var marker = document.createElement('a-marker');
    marker.setAttribute("preset", object.marker.preset);
    scene.appendChild(marker);

    for (var entity_i=0; entity_i<object.entities.length; entity_i++) {

        var entity = document.createElement('a-entity');
        var shape = document.createElement(`a-${object.entities[entity_i].shape}`);

        setAttributes(shape, object.entities[entity_i].dimensions);
        shape.setAttribute("opacity", object.entities[entity_i].material.opacity);
        setAttributes(shape, object.entities[entity_i].otherAttr);


        for (var animation_i = 0; animation_i < object.entities[entity_i].animations.length; animation_i++) {
            var animation = document.createElement('a-animation');
            setAttributes(animation, object.entities[entity_i].animations[animation_i]);
            shape.appendChild(animation);
        }

        entity.appendChild(shape);
        marker.appendChild(entity);
    }
}


//Both of these are for testing.  Will be different in final version

window.addEventListener("load", function(){
    createScene(earthSceneObj);
});

window.addEventListener("markerFound", function(){
    console.log("markerFound!");
});