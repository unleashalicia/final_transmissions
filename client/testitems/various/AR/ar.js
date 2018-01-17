
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

    var body = document.getElementsByTagName('BODY')[0];

    var scene = document.createElement('a-scene');
    scene.setAttribute('embedded', 'true');
    scene.setAttribute('artoolkit', 'sourceType: webcam;');

    var assets = document.createElement('a-assets');


    body.appendChild(scene);
    scene.appendChild(assets);

    //Create asset items and append to assets


    for (var assets_i=0; assets_i<object.assets.length; assets_i++){
        var assetItem = document.createElement('video');
        setAttributes(assetItem, object.assets[assets_i]);
        assets.appendChild(assetItem);
    } //end asset loop

    //Create marker and append

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

    /*
    Create light entities.
    This currently isn't working.  Come back to this.
     */

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
} //end createScene


//Both of these are for testing.  Will be different in final version

window.addEventListener("load", function(){
    createScene(waterSceneObj);
});

window.addEventListener("markerFound", function(){
    console.log("markerFound!");
});