var storyObject = {
    1: {
        id: "earth",
        assets: [
            {
                src: "./assets/video/dust.ogv",
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
                shapes:  [
                    {
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
            }

        ]
    },
    2: {
        id: "water",
        assets: [
            {
                src: "/assets/video/Rain%20-%2078.mp4",
                id: "water1",
                autoplay: "false",
                loop: "true"
            },
            {
                src: "/assets/video/Rain%20-%2078.mp4",
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
                shapes: [
                    {
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
            },
            {
                lights: [
                    {
                        attributes: {
                            type: "ambient",
                            angle: "0",
                            color: "#ccc",
                            intensity: "3.0"
                        }

                    },
                    {
                        attributes: {
                            type: "spot",
                            angle: "45",
                            color: "#3A43D4",
                            intensity: "3.0"
                        }

                    }
                ]
            }



        ]
    },
    3: {
        id: "air",
        assets: [
            {
                src: "/assets/video/sky.mp4",
                id: "air1",
                autoplay: "true",
                loop: "true"
            },
            {
                src: "/assets/video/sky.mp4",
                id: "air2",
                autoplay: "true",
                loop: "true"
            },
            {
                src: "/assets/video/sky.mp4",
                id: "air3",
                autoplay: "true",
                loop: "true"
            }

        ],
        marker: {
            preset: "hiro"
        },
        entities: [
            {
                shapes: [
                    //1
                    {
                        shape: "icosahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#air1",
                            position: "-1 0.5 0",
                            rotation: "0 90 0"
                        },
                        animations: [
                            {
                                attribute: "position",
                                dur: "3000",
                                from: "-1 0.5 0",
                                to: "-1 3 0",
                                direction: "alternate-reverse",
                                easing: "ease-in-out-circ",
                                repeat: "indefinite"
                            },
                            {
                                attribute: "rotation",
                                dur: "10000",
                                to: "360 0 0",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    },
                    //2
                    {
                        shape: "icosahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#air2",
                            position: "1 3 0",
                            rotation: "0 90 0"
                        },
                        animations: [
                            {
                                attribute: "position",
                                dur: "3500",
                                from: "1 3 0",
                                to: "1 0.5 0",
                                direction: "alternate-reverse",
                                easing: "ease-in-out-circ",
                                repeat: "indefinite"
                            },
                            {
                                attribute: "rotation",
                                dur: "10000",
                                to: "-360 0 0",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    },
                    //3
                    {
                        shape: "icosahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#air3",
                            position: "0 4 0",
                            rotation: "0 90 0"
                        },
                        animations: [
                            {
                                attribute: "position",
                                dur: "2500",
                                from: "0 4 0",
                                to: "0 0.5 0",
                                direction: "alternate-reverse",
                                easing: "ease-in-out-circ",
                                repeat: "indefinite"
                            },
                            {
                                attribute: "rotation",
                                dur: "10000",
                                to: "-360 0 0",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    }

                ]

            }


        ]
    },
    4: {
        id: "fire",
        assets: [
            {
                src: "/assets/video/fire.ogv",
                id: "fire1",
                autoplay: "false",
                loop: "false"
            },
            {
                src: "/assets/video/fire.ogv",
                id: "fire2",
                autoplay: "false",
                loop: "true"
            },
            {
                src: "/assets/video/fire.ogv",
                id: "fire3",
                autoplay: "false",
                loop: "true"
            },
            {
                src: "/assets/video/fire.ogv",
                id: "fire4",
                autoplay: "false",
                loop: "true"
            }
        ],
        marker: {
            preset: "hiro"
        },
        entities: [
            {
                shapes: [
                    //1
                    {
                        shape: "tetrahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#fire1",
                            position: "-2 0.5 0",
                            rotation: "0 0 0"
                        },
                        animations: [
                            {
                                attribute: "rotation",
                                dur: "3000",
                                to: "0 360 -360",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    },
                    //2
                    {
                        shape: "tetrahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#fire2",
                            position: "0 2 1",
                            rotation: "0 0 0"
                        },
                        animations: [
                            {
                                attribute: "rotation",
                                dur: "2000",
                                to: "360 360 360",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    },
                    //3
                    {
                        shape: "tetrahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#fire3",
                            position: "0 1 2",
                            rotation: "0 0 0"
                        },
                        animations: [
                            {
                                attribute: "rotation",
                                dur: "2500",
                                to: "0 360 0",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    },
                    //4
                    {
                        shape: "tetrahedron",
                        dimensions: {
                            radius: "0.5"
                        },
                        material: {
                            opacity: "0.9"
                        },
                        otherAttr: {
                            src: "#fire4",
                            position: "2 0.5 0",
                            rotation: "0 0 0"
                        },
                        animations: [
                            {
                                attribute: "rotation",
                                dur: "4000",
                                to: "-360 -360 -360",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    }
                ]

            }

        ]
    },
    "5": {
        id: "finale",
        assets: [
            {
                src: "./assets/images/wood.jpg",
                id: "#wood",
                autoplay: "false",
                loop: "false"
            }
        ],
        marker: {
            preset: "hiro"
        },
        entities: [
            {
                shapes: [
                    {
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
                            src: "#wood",
                            position: "0 0 -3.5",
                            rotation: "0 90 0"
                        },
                        animations: [
                            {
                                attribute: "rotation",
                                from: "15 90 -15",
                                to: "-15 90 15",
                                dur: "80",
                                direction: "alternate-reverse",
                                easing: "linear",
                                repeat: "indefinite"
                            }
                        ]
                    }
                ]
            },
            {
                lights: [
                    {
                        attributes: {
                            type: "directional",
                            angle: "0",
                            color: "white",
                            intensity: "1.0"
                        },
                        directionalAttr: {
                            position: "0 0 9",
                            rotation: "0 0 90",
                            target: "0 0 -3.5"
                        }

                    },
                    {
                        attributes: {
                            type: "directional",
                            angle: "0",
                            color: "white",
                            intensity: "1.0"
                        },
                        directionalAttr: {
                            position: "0 0 -9",
                            rotation: "180 0 0",
                            target: "0 0 -3.5"
                        }

                    },
                    {
                        attributes: {
                            type: "directional",
                            angle: "0",
                            color: "white",
                            intensity: "1.0"
                        },
                        directionalAttr: {
                            position: "-9 0 0",
                            rotation: "270 0 0",
                            target: "0 0 -3.5"
                        }

                    },
                ]
            }

        ]
    }
};



