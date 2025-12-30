// Act 1 Scene 3 - Team Meeting (Conference Room Section, line 132-365)
// Location: Conference Room
// Characters: 11 total (Food Team: 4, Quantum Team: 5, Leadership: 2)

import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

export const sceneConfig = {
    // Key timeline moments (absolute times in ms)
    events: {
        sceneStart: 0,
        marcusWelcomes: 14000,
        foodTeamSeated: 25000,
        marcusIntroductions: 30000,
        alexIntroduces: 52000,
        morrisRambles: 73000,
        marcusIntroQuantum: 98000,
        leaAcknowledges: 104000,
        edgarStands: 118000,
        marcusNDA: 127000,
        peopleSigning: 144000,
        alexAsks: 149000,
        edgarExplains: 152000,
        foodTeamReacts: 174000,
        marcusSlideshow: 186000,
        focusOnScreen: 216000,
        dariusQuestions: 228000,
        ninaQuestions: 240000,
        edgarCallsBreak: 267000,
        peopleStanding: 270000,
        leaAndAlexExit: 280000,
        morrisOffersSoftak: 294000
    },

    // Characters present in this scene
    characters: [
        // FOOD TEAM - Entering the room
        {
            id: 'alex',
            name: 'Alex',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 9, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 1500,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 4500,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 6800,
                    startPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING, z: -2.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 7900,
                    startPosition: { x: 4, y: CHARACTER_HEIGHT.SITTING, z: -2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },
        {
            id: 'morris',
            name: 'Morris',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: ANIMATION_SPEED.DEFAULT_STAGGER,
                    startPosition: { x: 9, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 1700,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 4700,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 2, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 8500,
                    startPosition: { x: 2, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 2, y: CHARACTER_HEIGHT.WALKING, z: -2.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 9600,
                    startPosition: { x: 2, y: CHARACTER_HEIGHT.SITTING, z: -2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },
        {
            id: 'darius',
            name: 'Darius',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: ANIMATION_SPEED.DEFAULT_STAGGER * 2,
                    startPosition: { x: 9, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 1900,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 4900,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 10200,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -2.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 11300,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.SITTING, z: -2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },
        {
            id: 'sofia',
            name: 'Sofia',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: ANIMATION_SPEED.DEFAULT_STAGGER * 3,
                    startPosition: { x: 9, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 2100,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 5100,
                    startPosition: { x: 7, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 11900,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: -4 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: -2.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 13000,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.SITTING, z: -2 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                }
            ]
        },

        // QUANTUM TEAM - Already seated on south side of table
        // Chair positions: x = [-4, -2, 0, 2, 4], z = 2
        {
            id: 'lea',
            name: 'Lea',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 4, y: CHARACTER_HEIGHT.SITTING, z: 2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'nina',
            name: 'Nina',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 2, y: CHARACTER_HEIGHT.SITTING, z: 2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'rashid',
            name: 'Rashid',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.SITTING, z: 2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'chen',
            name: 'Chen',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.SITTING, z: 2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'yuki',
            name: 'Yuki',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: -4, y: CHARACTER_HEIGHT.SITTING, z: 2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },

        // LEADERSHIP
        {
            id: 'marcus',
            name: 'Marcus',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }  // Face toward wall (west/-X direction)
                },
                {
                    type: 'waving',
                    event: 'marcusWelcomes',
                    delay: 1000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'marcusWelcomes',
                    delay: 3000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'pointing',
                    event: 'marcusIntroductions',
                    delay: 30000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'marcusIntroductions',
                    delay: 32000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'pointing',
                    event: 'alexAsks',
                    delay: 1000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'edgarExplains',
                    delay: 0,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'pointing',
                    event: 'marcusSlideshow',
                    delay: 24000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'marcusSlideshow',
                    delay: 26000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'pointing',
                    event: 'leaAndAlexExit',
                    delay: 20000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'leaAndAlexExit',
                    delay: 22000,
                    startPosition: { x: -7, y: CHARACTER_HEIGHT.STANDING, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                }
            ]
        },
        {
            id: 'edgar',
            name: 'Edgar',
            scale: CHARACTER_SCALE,
            actions: [
                {
                    type: 'sitting',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.SITTING, z: 6.5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'edgarStands',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },  // Step forward from chair
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'waving',
                    event: 'edgarStands',
                    delay: 500,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'edgarStands',
                    delay: 2500,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'pointing',
                    event: 'ninaQuestions',
                    delay: 10000,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'edgarCallsBreak',
                    delay: -15000,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'waving',
                    event: 'edgarCallsBreak',
                    delay: 73000,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                {
                    type: 'standing',
                    event: 'edgarCallsBreak',
                    delay: 74500,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: 6 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        }
    ],

    // Camera movements (pans, dolly shots)
    // NOTE: Keep camera 6-8 units from subjects to avoid sickening rotation
    // NOTE: Pans should be slow - typically 4500-9000ms for natural movement
    // NOTE: panKeepAngle should move significant distance (5+ units) to look natural
    cameraMoves: [
        // MARCUS INTRODUCTIONS - dolly from wide east view toward table center
        // Start looking at Marcus (-7, 1.5, 0), then dolly 8.9 units toward center
        {
            event: 'marcusIntroductions',
            delay: 0,
            type: 'panKeepAngle',
            targetPos: { x: 0, y: 2, z: 0 },      // Move to center, 8 units from start (8,2,0)
            lookAt: { x: -7, y: 1.5, z: 0 },      // Look at Marcus before panning
            duration: 6000
        },
        // ALEX INTRODUCES - pan to focus on Alex (food team north side)
        // Alex at (4, 1.5, -2), camera at 5.9 units distance
        {
            event: 'alexIntroduces',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 9, y: 2, z: -5 },
            lookAt: { x: 4, y: 1.5, z: -2 },
            duration: 4500
        },
        // MORRIS RAMBLES - dolly from Alex area along north side
        // Look at Morris (2, 1.5, -2), then dolly 7.1 units along table
        {
            event: 'morrisRambles',
            delay: 0,
            type: 'panKeepAngle',
            targetPos: { x: 2, y: 2, z: -6 },     // Move west along north side, 7.1 units
            lookAt: { x: 2, y: 1.5, z: -2 },      // Look at Morris before panning
            duration: 9000
        },
        // MARCUS INTRO QUANTUM - pan to quantum team (south side)
        // Quantum team around (0, 1, 2), camera at 7.2 units distance
        {
            event: 'marcusIntroQuantum',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 7, y: 2.5, z: 2 },
            lookAt: { x: 0, y: 1, z: 2 },
            duration: 6000
        },
        // LEA ACKNOWLEDGES - dolly from quantum team center to Lea's area
        // Look at Lea (4, 1.5, 2), then dolly 7.1 units east along south side
        {
            event: 'leaAcknowledges',
            delay: 0,
            type: 'panKeepAngle',
            targetPos: { x: 0, y: 2, z: 6 },      // Move toward south wall, 7.2 units
            lookAt: { x: 4, y: 1.5, z: 2 },       // Look at Lea before panning
            duration: 3000
        },
        // EDGAR STANDS - pan to Edgar (south wall chair)
        // Edgar at (0, 1.5, 6.5), camera at 7.6 units distance
        {
            event: 'edgarStands',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 0, y: 2.5, z: -1 },
            lookAt: { x: 0, y: 1.5, z: 6.5 },
            duration: 5400
        },
        // FOCUS ON SCREEN - pan to projection screen (west wall)
        // Screen at (-9, 2, 0), camera at 14 units distance
        {
            event: 'focusOnScreen',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 5, y: 2, z: 0 },
            lookAt: { x: -9, y: 2, z: 0 },
            duration: 6000
        }
    ],

    // Scene timeline events (based on screenplay lines 132-365)
    // Total duration: ~6 minutes (360000ms)
    timeline: [
        // OPENING - Food team enters
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'sceneStart', delay: 0, action: 'cameraWide' },

        // MARCUS WELCOMES
        { event: 'marcusWelcomes', delay: 0, action: 'cameraToMarcus' },
        { event: 'marcusWelcomes', delay: 0, action: 'marcusWelcomes' },

        // FOOD TEAM SETTLING
        { event: 'marcusWelcomes', delay: 9000, action: 'foodTeamSits' },
        { event: 'foodTeamSeated', delay: 0, action: 'cameraToWide' },

        // INTRODUCTIONS BEGIN
        { event: 'marcusIntroductions', delay: 0, action: 'marcusIntroductions' },

        // ALEX INTRODUCES FOOD TEAM
        { event: 'alexIntroduces', delay: 0, action: 'cameraToFoodTeam' },
        { event: 'alexIntroduces', delay: 0, action: 'alexIntroduces' },

        // MORRIS RAMBLES
        { event: 'morrisRambles', delay: 0, action: 'morrisRambles' },

        // MARCUS INTRODUCES QUANTUM TEAM
        { event: 'marcusIntroQuantum', delay: 0, action: 'cameraToMarcus' },
        { event: 'marcusIntroQuantum', delay: 0, action: 'marcusIntroQuantum' },

        // LEA ACKNOWLEDGES
        { event: 'leaAcknowledges', delay: 0, action: 'cameraToFoodTeam' },
        { event: 'leaAcknowledges', delay: 0, action: 'leaAcknowledges' },
        { event: 'leaAcknowledges', delay: 12000, action: 'cameraToMarcus' },

        // EDGAR STANDS
        { event: 'edgarStands', delay: 0, action: 'cameraToEdgar' },
        { event: 'edgarStands', delay: 0, action: 'edgarStands' },

        // MARCUS NDA EXPLANATION
        { event: 'marcusNDA', delay: 0, action: 'cameraToMarcus' },
        { event: 'marcusNDA', delay: 0, action: 'marcusNDA' },
        { event: 'peopleSigning', delay: 0, action: 'peopleSigning' },

        // ALEX ASKS QUESTION
        { event: 'peopleSigning', delay: 0, action: 'cameraToFoodTeam' },
        { event: 'alexAsks', delay: 0, action: 'alexAsks' },

        // EDGAR EXPLAINS REASSIGNMENT
        { event: 'edgarExplains', delay: 0, action: 'cameraToEdgar' },
        { event: 'edgarExplains', delay: 0, action: 'edgarExplains' },

        // FOOD TEAM REACTION
        { event: 'foodTeamReacts', delay: 0, action: 'cameraToFoodTeam' },
        { event: 'foodTeamReacts', delay: 0, action: 'foodTeamReacts' },

        // MARCUS SLIDESHOW
        { event: 'marcusSlideshow', delay: 0, action: 'cameraToMarcus' },
        { event: 'marcusSlideshow', delay: 0, action: 'marcusSlideshow' },
        { event: 'focusOnScreen', delay: 0, action: 'focusOnScreen' },

        // DARIUS QUESTIONS
        { event: 'dariusQuestions', delay: 0, action: 'cameraToFoodTeam' },
        { event: 'dariusQuestions', delay: 0, action: 'dariusQuestions' },
        { event: 'dariusQuestions', delay: 6000, action: 'focusOnScreen' },

        // NINA QUESTIONS
        { event: 'ninaQuestions', delay: 0, action: 'cameraToWide' },
        { event: 'ninaQuestions', delay: 0, action: 'ninaQuestions' },
        { event: 'ninaQuestions', delay: 10000, action: 'cameraToMarcus' },

        // EDGAR CALLS BREAK
        { event: 'edgarCallsBreak', delay: -15000, action: 'cameraToEdgar' },
        { event: 'edgarCallsBreak', delay: 0, action: 'edgarCallsBreak' },

        // PEOPLE STANDING
        { event: 'peopleStanding', delay: 0, action: 'cameraToWide' },
        { event: 'peopleStanding', delay: 0, action: 'peopleStanding' },

        // LEA AND ALEX EXIT
        { event: 'leaAndAlexExit', delay: 0, action: 'leaAndAlexExit' },
        { event: 'morrisOffersSoftak', delay: 0, action: 'morrisOffersSoftak' }
    ]
};
