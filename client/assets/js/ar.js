
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

            if (object.entities[1].lights[light_i].attributes.type === "directional"){
                setAttributes(entityLight, object.entities[1].lights[light_i].directionalAttr);
            };


            //Append lights to marker

            marker.appendChild(entityLight);
        } //end light for loop

    } //end lights conditional


//next chapter button

    var fragment = document.createDocumentFragment();
    var span = document.createElement('span');
    var img = document.createElement('img');
    img.src="./assets/images/icons/gobeige.png";
    span.className= "next-event landscape";
    span.textContent="Next Chapter";
    span.appendChild(img);
    span.onclick=moveToNextChapter;
    fragment.append(span);
    ARcontainer.appendChild(scene);
    ARcontainer.appendChild(fragment);
    
    //extra js functionality


    switch (object.id){
        case "earth":

            var earth = document.getElementById("dust");

            earth.play();

            break;

        case "water":

            var water1 = document.getElementById("water1");
            var water2 = document.getElementById("water2");

            water1.currentTime = 1000;
            water1.play();
            water2.currentTime = 6000;
            water2.playbackRate = 1.3;
            water2.play();

            break;

        case "air":

            var air1 = document.getElementById("air1");
            var air2 = document.getElementById("air2");
            var air3 = document.getElementById("air3");

            air1.currentTime = 1000;
            air1.playbackRate = 4.0;
            air1.play();
            air2.currentTime = 2000;
            air2.playbackRate = 2.0;
            air2.play();
            air3.currentTime = 4000;
            air3.playbackRate = -2.0;
            air3.play();

            break;

        case "fire":

            var videos = document.querySelectorAll(".video");

            for (i=0; i<videos.length; i++) {
                (function(i) {
                    window.addEventListener("load", function () {
                        videos[i].currentTime = 1000;
                        videos[i].play();
                        setInterval(function () {
                            videos[i].currentTime = 1000;
                        }, 4000);
                    });
                })(i)
            };

            break;
        case "finale":

            for (var creator = 0; creator < 200; creator++) {
                var entity = document.createElement('a-entity');
                var sphere = document.createElement('a-sphere');
                var move = document.createElement('a-animation');
                var fade = document.createElement('a-animation');
                var random = Math.random();
                var posXdest = null;
                var color = null;
                var posYdest = findRange(5, 7);
                var dur = findRange(200, 3000);
                var radius = findRange(0.025, 0.07);

                if (random < .2) {
                    posXdest = findRange(-1, 1);
                    color = "black";
                } else if (random < .7) {
                    posXdest = findRange(-2, 2);
                    color = "white";
                } else if (random < .95) {
                    posXdest = findRange(-3, 3);
                    color = "white";
                } else {
                    posXdest = findRange(-4, 4);
                    color = "white";
                }

                var sphereAttr = {
                    material: {
                        color: color
                    },
                    otherAttr: {
                        opacity: "0.7",
                        radius: radius
                    }
                };

                var moveAttr = {
                    attribute: "position",
                    dur: dur,
                    from: "0 0.5 -3.5",
                    to: `${posXdest} ${posYdest} -3.5`,
                    easing: 'linear',
                    repeat: 'indefinite'
                };

                var fadeAttr = {
                    attribute: "opacity",
                    dur: dur,
                    from: "0.7",
                    to: "0",
                    easing: "linear",
                    repeat: "indefinite"
                };


                sphere.setAttribute('material', sphereAttr.material);
                setAttributes(sphere, sphereAttr.otherAttr);

                setAttributes(move, moveAttr);
                setAttributes(fade, fadeAttr);

                entity.appendChild(move);
                sphere.appendChild(fade);
                entity.appendChild(sphere);
                marker.appendChild(entity);


            }

            break;

        default:
            console.log("There was an error making this work.");
    } //end of extra functionality switch statement

    //#################################################################################
    //##  Axios call for state/chapter assets and data handler functions  #############
    //#################################################################################
    function moveToNextChapter(){
        const storyID = sessionStorage.getItem('story_id');

        axios.post('/action',{story: Number(storyID), action: 'proceed'}).then(() => {
            window.location.href = '/play';
        }).catch( error => {
            window.location.href = "/story/id/" + axiosOptions.params.story;
        });
    }
    //++
    //++



} //end createScene

//Seen will need to reset to false at the start of each chapter.

window.addEventListener("markerFound", function(){
    if(distance < target.talkThreshold && !seen) {
        console.log("markerFound!");
        seen = true;
        let nextBtn = document.getElementsByClassName('next-event');
        for (let x in nextBtn){
            if (!isNaN(x)){
        		nextBtn[x].classList.toggle('hide');
            }
        }
    }
});

