import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

/**
 * Scene 2 - Edgar's Office
 * Marcus and Edgar discuss team transition and upcoming meeting
 */
export const sceneConfig = {
    // Define named events with absolute times
    events: {
        sceneStart: 0,
        edgarToDesk: 2000,
        marcusStands: 3000,
        edgarSits: 5000,
        conversationBegins: 6000,
        marcusExplainsTechnical: 8000,
        edgarInterrupts: 12000,
        marcusExplainsTeam: 15000,
        edgarStandsUp: 25000,
        bothLeave: 28000
    },

    characters: [
        {
            id: 'marcus',
            name: 'Marcus',
            scale: CHARACTER_SCALE,
            actions: [
                // Enter from door (south)
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 0,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 4.5 },
                    endPosition: { x: -1, y: CHARACTER_HEIGHT.WALKING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Stand in front of desk
                {
                    type: 'standing',
                    event: 'marcusStands',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Gesture while explaining technical details
                {
                    type: 'pointing',
                    event: 'marcusExplainsTechnical',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Return to standing after gesture
                {
                    type: 'standing',
                    event: 'marcusExplainsTechnical',
                    delay: 2000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Gesture while explaining team integration
                {
                    type: 'pointing',
                    event: 'marcusExplainsTeam',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Return to standing
                {
                    type: 'standing',
                    event: 'marcusExplainsTeam',
                    delay: 2000,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.STANDING, z: -1 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 }
                },
                // Walk toward door to leave
                {
                    type: 'walk',
                    event: 'bothLeave',
                    delay: 0,
                    startPosition: { x: -1, y: CHARACTER_HEIGHT.WALKING, z: -1 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 4 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        },
        {
            id: 'edgar',
            name: 'Edgar',
            scale: CHARACTER_SCALE,
            actions: [
                // Enter from door
                {
                    type: 'walk',
                    event: 'sceneStart',
                    delay: 500,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 4.5 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Walk around desk to chair
                {
                    type: 'walk',
                    event: 'edgarToDesk',
                    delay: 0,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 0 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: -1.5 },
                    rotation: { x: 0, y: ROTATION.NORTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Sit down at desk
                {
                    type: 'sitting',
                    event: 'edgarSits',
                    delay: 0,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.SITTING, z: -0.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Stand up from desk
                {
                    type: 'standing',
                    event: 'edgarStandsUp',
                    delay: 0,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.STANDING, z: -0.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Wave/gesture while talking
                {
                    type: 'waving',
                    event: 'edgarStandsUp',
                    delay: 1000,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.STANDING, z: -0.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Return to standing
                {
                    type: 'standing',
                    event: 'edgarStandsUp',
                    delay: 2500,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.STANDING, z: -0.5 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 }
                },
                // Walk toward door to leave
                {
                    type: 'walk',
                    event: 'bothLeave',
                    delay: 500,
                    startPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: -0.5 },
                    endPosition: { x: -2, y: CHARACTER_HEIGHT.WALKING, z: 4 },
                    rotation: { x: 0, y: ROTATION.SOUTH, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        }
    ],

    // Camera movements (pans, dolly shots)
    cameraMoves: [
        // Wide shot when Edgar sits
        {
            event: 'edgarSits',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 4, y: 4, z: 2 },
            lookAt: { x: -2, y: 1.5, z: -1 },
            duration: 2000
        },
        // Focus on Edgar as he asks for update
        {
            event: 'conversationBegins',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 1, y: 2.5, z: -1 },
            lookAt: { x: -2, y: 1.2, z: -0.5 },
            duration: 1500
        },
        // Focus on Marcus explaining technical details
        {
            event: 'marcusExplainsTechnical',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -4, y: 2.5, z: -1 },
            lookAt: { x: -1, y: 1.5, z: -1 },
            duration: 1500
        },
        // Back to Edgar as he interrupts
        {
            event: 'edgarInterrupts',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 1, y: 2.5, z: -1 },
            lookAt: { x: -2, y: 1.2, z: -0.5 },
            duration: 1000
        },
        // Back to Marcus explaining team
        {
            event: 'marcusExplainsTeam',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: -4, y: 2.5, z: -1 },
            lookAt: { x: -1, y: 1.5, z: -1 },
            duration: 1500
        },
        // Wide shot as Edgar stands
        {
            event: 'edgarStandsUp',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 4, y: 4, z: 2 },
            lookAt: { x: -2, y: 1.5, z: -1 },
            duration: 1500
        }
    ],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'conversationBegins', delay: 0, action: 'edgarAsksUpdate' },
        { event: 'marcusExplainsTechnical', delay: 0, action: 'marcusExplainsTechnical' },
        { event: 'edgarInterrupts', delay: 0, action: 'edgarInterrupts' },
        { event: 'marcusExplainsTeam', delay: 0, action: 'marcusExplainsTeam' },
        { event: 'edgarStandsUp', delay: 0, action: 'edgarStands' }
    ]
};
