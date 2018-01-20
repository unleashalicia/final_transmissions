
/*

setAttributes function:
Input: element and an object with key/value pairs for attributes.
Output:

 */


function setAttributes(element, attributeObj) {

    for (let item in attributeObj){
        element.setAttribute(item, attributeObj[item]);
    }

}


//creator function to dynamically render a-scenes with objects.

function createScene(object){

    //Create body variable, scene, and assets and append

    var ARcontainer = document.getElementById('camera');

    var scene = document.createElement('a-scene');
    scene.setAttribute('embedded', 'true');
    scene.setAttribute('artoolkit', 'sourceType: webcam;');

    var assets = document.createElement('a-assets');


    ARcontainer.appendChild(scene);
    scene.appendChild(assets);

    //Create asset items and append to assets


    for (var assets_i=0; assets_i<object.assets.length; assets_i++){
        var assetItem = document.createElement('video');
        setAttributes(assetItem, object.assets[assets_i]);
        assets.appendChild(assetItem);
    } //end asset loop


    var marker = document.createElement('a-marker');
    marker.setAttribute("preset", object.marker.preset);
    scene.appendChild(marker);

    //Create entities and set attributes

    for (var shape_i=0; shape_i < object.entities[0].shapes.length; shape_i++) {
        var entityShape = document.createElement('a-entity');
        var shapeObj = object.entities[0].shapes[shape_i];
        var shape = document.createElement(`a-${shapeObj.shape}`);

        setAttributes(shape, shapeObj.dimensions);
        shape.setAttribute("opacity", shapeObj.material.opacity);
        setAttributes(shape, shapeObj.otherAttr);
        shape.classList.add('appearingShape');
        shape.classList.add('hide');


        //Create Animations and add to shapes

        for (var animation_i = 0; animation_i < shapeObj.animations.length; animation_i++) {
            var animation = document.createElement('a-animation');
            setAttributes(animation, shapeObj.animations[animation_i]);
            shape.appendChild(animation);
        } //end animation loop

        //Append shape to entity and entity to marker

        entityShape.appendChild(shape);
        marker.appendChild(entityShape);
    } //end shape loop


    if (object.entities.length>1){

        for(var light_i=0; light_i < object.entities[1].lights.length; light_i++){
            var entityLight = document.createElement('a-entity');
            var lightAttr = object.entities[1].lights[light_i].attributes;


            //Set light attributes

            entityLight.setAttribute("light", `type: ${lightAttr.type}; angle: ${lightAttr.angle}; color: ${lightAttr.color}; intensity: ${lightAttr.intensity}`);


            //Append lights to marker

            marker.appendChild(entityLight);
        } //end light for loop

    } //end lights conditional

    //Program more specific JS at creation.  Come back to this at the end.

    // switch (object.id){
    //     case "earth":
    //         console.log("Earth video: ", object.assets[0].src);
    //
    //         //Add these if more time.
    //
    //         // const water1 = document.getElementById("water1");
    //         // const water2 = document.getElementById("water2");
    //         //
    //         // water1.currentTime = 1000;
    //         // water1.play();
    //         // water2.currentTime = 6000;
    //         // water2.playbackRate = 1.3;
    //         // water2.play();
    //
    //         break;
    //     case "water":
    //         console.log("Water video: ", object.assets[0].src);
    //         break;
    //     case "air":
    //         console.log("Air video: ", object.assets[0].src);
    //         break;
    //     case "fire":
    //         console.log("Fire video: ", object.assets[0].src);
    //         break;
    //     case "finale":
    //         console.log("Finale img: ", object.assets[0].src);
    //         break;
    //     default:
    //         console.log("I don't know what you're talking about.");
    // }

} //end createScene






//Both of these are for testing.  Will be different in final version

//Commented out so it doesn't immediately activate.

window.addEventListener("load", function(){
    createScene(storyObject[1]);
});

window.addEventListener("markerFound", function(){

    console.log("markerFound!");

    if(distance < target.talkThreshold) {
        //trigger next chapter modal.
    }

});

///////    Given to backend ///////
//function takes in object and opacity to 0.9 and give to Brian.
//give them all classes and add here.

// function makeVisible(class_name, number){
//
//     const shapeArray = document.getElementsByClassName(class_name);
//
//     for (let i=0; i<shapeArray.length; i++){
//         if(number > 0){
//             shapeArray[i].classList.remove('hide');
//         }else {
//             shapeArray[i].classList.add('hide');
//         }
//     }
//
// }
//
// makeVisible("appearingShape", 1);