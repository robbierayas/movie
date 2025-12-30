import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

/**
 * Scene 1 - Food Science Lab
 * Alex enters lab, works with Morris on sof-tak, the sneeze incident occurs
 */
export const sceneConfig = {
    // Define named events with absolute times
    events: {
        sceneStart: 0,
        alexEnters: 0,
        alexAtStation: 3000,
        morrisGreeting: 3500,
        alexWorkingOnSoftak: 6000,
        morrisSneeze: 10000,
        alexAppliesGrowDrop: 12000,
        softakExpands: 14000,
        alexAndMorrisReact: 15000
    },

    characters: [
        {
            id: 'alex',
            name: 'Alex',
            scale: CHARACTER_SCALE,
            actions: [
                // Enter from east door
                {
                    type: 'walk',
                    event: 'alexEnters',
                    delay: 0,
                    startPosition: { x: 6.5, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING, z: -2 },
                    rotation: { x: 0, y: ROTATION.NORTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Walk to northeast table
                {
                    type: 'walk',
                    event: 'alexEnters',
                    delay: 1500,
                    startPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING, z: -2 },
                    endPosition: { x: 3.5, y: CHARACTER_HEIGHT.WALKING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Arrive at station and stand facing table
                {
                    type: 'standing',
                    event: 'alexAtStation',
                    delay: 0,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Wave greeting to Morris (turn west)
                {
                    type: 'waving',
                    event: 'morrisGreeting',
                    delay: 0,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 }
                },
                // Return to standing facing table
                {
                    type: 'standing',
                    event: 'morrisGreeting',
                    delay: 1500,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Point at sof-tak on table
                {
                    type: 'pointing',
                    event: 'alexAppliesGrowDrop',
                    delay: 0,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Return to standing after sof-tak expands
                {
                    type: 'standing',
                    event: 'softakExpands',
                    delay: 0,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        },
        {
            id: 'morris',
            name: 'Morris',
            scale: CHARACTER_SCALE,
            actions: [
                // Morris already at his station (northwest table)
                {
                    type: 'standing',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: -3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Wave back at Alex (turn east)
                {
                    type: 'waving',
                    event: 'morrisGreeting',
                    delay: 500,
                    startPosition: { x: -3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Return to standing facing table
                {
                    type: 'standing',
                    event: 'morrisGreeting',
                    delay: 2000,
                    startPosition: { x: -3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Wave hands (sneeze gesture)
                {
                    type: 'waving',
                    event: 'morrisSneeze',
                    delay: 0,
                    startPosition: { x: -3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Return to standing after sneeze
                {
                    type: 'standing',
                    event: 'morrisSneeze',
                    delay: 1000,
                    startPosition: { x: -3.5, y: CHARACTER_HEIGHT.STANDING, z: -3 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                }
            ]
        }
    ],

    // Camera movements (pans, dolly shots)
    cameraMoves: [
        // Follow Alex to her station
        {
            event: 'alexAtStation',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 5.5, y: 3.5, z: 0 },
            lookAt: { x: 3.5, y: 1.5, z: -3 },
            duration: 2000
        },
        // Pull back to show both scientists working
        {
            event: 'alexWorkingOnSoftak',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 0, y: 5, z: 2 },
            lookAt: { x: 0, y: 1.5, z: -3 },
            duration: 2000
        },
        // Focus on Morris when he sneezes
        {
            event: 'morrisSneeze',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -5.5, y: 3.5, z: 0 },
            lookAt: { x: -3.5, y: 1.5, z: -3 },
            duration: 1000
        },
        // Focus on Alex applying grow drop
        {
            event: 'alexAppliesGrowDrop',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 5.5, y: 3, z: -1 },
            lookAt: { x: 3, y: 1.2, z: -3 },
            duration: 1500
        }
    ],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'alexAtStation', delay: 0, action: 'cameraToAlex' },
        { event: 'morrisGreeting', delay: 0, action: 'alexGreetsMorris' },
        { event: 'alexWorkingOnSoftak', delay: 0, action: 'alexWorksSoftak' },
        { event: 'morrisSneeze', delay: 0, action: 'morrisSneeze' },
        { event: 'alexAppliesGrowDrop', delay: 0, action: 'alexAppliesGrowDrop' },
        { event: 'softakExpands', delay: 0, action: 'softakExpands' }
    ]
};
