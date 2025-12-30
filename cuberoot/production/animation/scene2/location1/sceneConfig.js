import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

/**
 * Scene 2 - Hallway (Outside Edgar's Office)
 * Marcus waits in hallway, watches corporate video, Edgar greets him
 */
export const sceneConfig = {
    // Define named events with absolute times
    events: {
        sceneStart: 0,
        marcusWatching: 2000,
        marcusReacts: 5000,
        doorOpens: 8000,
        edgarGreetsMarcus: 10000,
        bothEnterOffice: 12000
    },

    characters: [
        {
            id: 'marcus',
            name: 'Marcus',
            scale: CHARACTER_SCALE,
            actions: [
                // Marcus standing in hallway, arms crossed
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Gesture reaction to video (shake head)
                {
                    type: 'waving',
                    event: 'marcusReacts',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Return to standing
                {
                    type: 'standing',
                    event: 'marcusReacts',
                    delay: 1500,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Turn to face Edgar when door opens
                {
                    type: 'standing',
                    event: 'doorOpens',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Walk toward office door
                {
                    type: 'walk',
                    event: 'bothEnterOffice',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -5 },
                    endPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -9 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        },
        {
            id: 'edgar',
            name: 'Edgar',
            scale: CHARACTER_SCALE,
            actions: [
                // Edgar appears when door opens
                {
                    type: 'standing',
                    event: 'doorOpens',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -9.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Wave/gesture greeting to Marcus
                {
                    type: 'waving',
                    event: 'edgarGreetsMarcus',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -9.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Return to standing
                {
                    type: 'standing',
                    event: 'edgarGreetsMarcus',
                    delay: 1500,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.STANDING, z: -9.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Turn and walk back into office
                {
                    type: 'walk',
                    event: 'bothEnterOffice',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -9.5 },
                    endPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING, z: -10 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        }
    ],

    // Camera movements (pans, dolly shots)
    cameraMoves: [
        // Pan to screen when Marcus is watching
        {
            event: 'marcusWatching',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 0, y: 4, z: -3 },
            lookAt: { x: 0, y: 3, z: -8 },
            duration: 2000
        },
        // Pan to Marcus when he reacts
        {
            event: 'marcusReacts',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 3, y: 3, z: -5 },
            lookAt: { x: 0, y: 1.5, z: -5 },
            duration: 1500
        },
        // Pan to door when it opens
        {
            event: 'doorOpens',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 0, y: 3, z: -4 },
            lookAt: { x: 0, y: 2, z: -9 },
            duration: 1500
        }
    ],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'marcusReacts', delay: 0, action: 'marcusReacts' },
        { event: 'doorOpens', delay: 0, action: 'doorOpens' },
        { event: 'edgarGreetsMarcus', delay: 0, action: 'edgarGreets' }
    ]
};
