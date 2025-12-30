import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

/**
 * Scene 1 - Lobby
 * Alex arrives at INZO facility, walks through lobby past timeline wall
 */
export const sceneConfig = {
    // Define named events with absolute times
    events: {
        sceneStart: 0,
        alexEnters: 0,
        alexAtTimeline: 4000,
        alexTouchesTimeline: 5000,
        alexExits: 7000
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
                    startPosition: { x: 4.5, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: 3.5, y: CHARACTER_HEIGHT.WALKING, z: -1.5 },
                    rotation: { x: 0, y: ROTATION.NORTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Continue northwest, clearing desk area
                {
                    type: 'walk',
                    event: 'alexEnters',
                    delay: 1200,
                    startPosition: { x: 3.5, y: CHARACTER_HEIGHT.WALKING, z: -1.5 },
                    endPosition: { x: 0.5, y: CHARACTER_HEIGHT.WALKING, z: -3.5 },
                    rotation: { x: 0, y: ROTATION.NORTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Walk to SOF-TAK position on timeline wall
                {
                    type: 'walk',
                    event: 'alexEnters',
                    delay: 2800,
                    startPosition: { x: 0.5, y: CHARACTER_HEIGHT.WALKING, z: -3.5 },
                    endPosition: { x: -3, y: CHARACTER_HEIGHT.WALKING, z: -4.2 },
                    rotation: { x: 0, y: ROTATION.NORTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Stand and face timeline wall
                {
                    type: 'standing',
                    event: 'alexAtTimeline',
                    delay: 0,
                    startPosition: { x: -3, y: CHARACTER_HEIGHT.STANDING, z: -4.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Point at SOF-TAK milestone
                {
                    type: 'pointing',
                    event: 'alexTouchesTimeline',
                    delay: 0,
                    startPosition: { x: -3, y: CHARACTER_HEIGHT.STANDING, z: -4.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Return to standing after pointing
                {
                    type: 'standing',
                    event: 'alexTouchesTimeline',
                    delay: 1500,
                    startPosition: { x: -3, y: CHARACTER_HEIGHT.STANDING, z: -4.2 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Turn toward west door (southwest direction)
                {
                    type: 'standing',
                    event: 'alexExits',
                    delay: 0,
                    startPosition: { x: -3, y: CHARACTER_HEIGHT.STANDING, z: -4.2 },
                    rotation: { x: 0, y: ROTATION.SOUTHWEST, z: 0 }
                },
                // Walk to west exit (Food Science Lab door)
                {
                    type: 'walk',
                    event: 'alexExits',
                    delay: 300,
                    startPosition: { x: -3, y: CHARACTER_HEIGHT.WALKING, z: -4.2 },
                    endPosition: { x: -4.7, y: CHARACTER_HEIGHT.WALKING, z: -3 },
                    rotation: { x: 0, y: ROTATION.SOUTHWEST, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        }
    ],

    // Camera movements (pans, dolly shots)
    cameraMoves: [
        // Follow Alex as he approaches timeline
        {
            event: 'alexAtTimeline',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -1, y: 4, z: -1 },
            lookAt: { x: -3, y: 1.5, z: -4.2 },
            duration: 2000
        },
        // Close-up on SOF-TAK milestone
        {
            event: 'alexTouchesTimeline',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -3, y: 2.5, z: -1 },
            lookAt: { x: -3, y: 1.5, z: -4.5 },
            duration: 1500
        }
    ],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'alexAtTimeline', delay: 0, action: 'cameraFollowAlex' },
        { event: 'alexTouchesTimeline', delay: 0, action: 'focusOnTimeline' }
    ]
};
