import { CHARACTER_HEIGHT, CHARACTER_SCALE, ANIMATION_SPEED, ROTATION } from '../../utils.js';

/**
 * Test Scene - Chen Climbing Through Two Cubes
 * Demonstrates climbing and crawling actions through cube doors
 */
export const sceneConfig = {
    // Define named events with absolute times
    events: {
        sceneStart: 0,
        chenWalksToLadder: 0,
        chenClimbsUp: 3000,
        chenCrawlsThrough: 8000,
        chenClimbsDown: 11000,
        chenWalksAway: 17000
    },

    characters: [
        {
            id: 'chen',
            name: 'Chen',
            scale: CHARACTER_SCALE,
            actions: [
                // Start in center of cube 1, walk to base of door on east wall
                {
                    type: 'walk',
                    event: 'chenWalksToLadder',
                    delay: 0,
                    startPosition: { x: 0, y: CHARACTER_HEIGHT.WALKING - 5, z: 0 },
                    endPosition: { x: 4, y: CHARACTER_HEIGHT.WALKING - 5, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                },
                // Climb up to door level (movement handled by climbTo)
                // Door opening: bottom at y=-2.5, top at y=0.5, center at y=-1
                // Crawl at y=-2.35 (very close to bottom of opening)
                {
                    type: 'climbing',
                    event: 'chenClimbsUp',
                    delay: 0,
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    endPosition: { x: 4.5, y: -3, z: 0 },
                    distancePerCycle: 0.7
                },
                // Crawl through door opening (horizontal movement at bottom of opening)
                {
                    type: 'crawling',
                    event: 'chenCrawlsThrough',
                    delay: 0,
                    startPosition: { x: 4.5, y: -3, z: 0 },
                    rotation: { x: 0, y: ROTATION.WEST, z: 0 },
                    endPosition: { x: 5.5, y: -2.35, z: 0 },
                    distancePerCycle: 0.3
                },
                // Climb down to floor level (climbing down west wall of cube 2)
                {
                    type: 'climbing',
                    event: 'chenClimbsDown',
                    delay: 0,
                    startPosition: { x: 5.5, y: -3, z: 0 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 },
                    endPosition: { x: 6, y: CHARACTER_HEIGHT.STANDING - 5, z: 0 },
                    distancePerCycle: 0.7
                },
                // Stand on floor in cube 2
                {
                    type: 'standing',
                    event: 'chenClimbsDown',
                    delay: 5500,
                    startPosition: { x: 6, y: CHARACTER_HEIGHT.STANDING - 5, z: 0 },
                    rotation: { x: 0, y: ROTATION.EAST, z: 0 }
                },
                // Walk away into cube 2
                {
                    type: 'walk',
                    event: 'chenWalksAway',
                    delay: 0,
                    startPosition: { x: 6, y: CHARACTER_HEIGHT.WALKING - 5, z: 0 },
                    endPosition: { x: 10, y: CHARACTER_HEIGHT.WALKING - 5, z: 0 },
                    distancePerCycle: ANIMATION_SPEED.WALK_DISTANCE_PER_CYCLE
                }
            ]
        }
    ],

    // Camera movements - Testing all camera move types at maximum distance within cube
    // Cube 1: x=-5 to 5, y=-5 to 5, z=-5 to 5 (centered at 0,0,0)
    // Cube 2: x=5 to 15, y=-5 to 5, z=-5 to 5 (centered at 10,0,0)
    // Character floor at y=-5, head at y=-3.4
    cameraMoves: [
        // 1. cutToPosition - Wide establishing shot from far back corner of cube 1
        {
            event: 'sceneStart',
            delay: 0,
            type: 'cutToPosition',
            targetPos: { x: -4.9, y: -3.5, z: 4.9 },
            lookAt: { x: 2, y: -3.5, z: 0 }
        },
        // 2. panToPosition - Smooth pan following Chen to ladder, staying far back
        {
            event: 'chenWalksToLadder',
            delay: 500,
            type: 'panToPosition',
            targetPos: { x: -4.5, y: -3.5, z: 4.9 },
            lookAt: { x: 4, y: -3.5, z: 0 },
            duration: 2000
        },
        // 3. panKeepAngle - Dolly shot maintaining angle during climb up, far back
        {
            event: 'chenClimbsUp',
            delay: 0,
            type: 'panKeepAngle',
            targetPos: { x: -4.5, y: -2.5, z: 4.9 },
            lookAt: { x: 4.5, y: -2.8, z: 0 },
            duration: 2500
        },
        // 4. cutToPosition - Cut to inside cube 1 viewing door from west side (DON'T track during crawls)
        {
            event: 'chenCrawlsThrough',
            delay: 1000,
            type: 'cutToPosition',
            targetPos: { x: 2, y: -2.5, z: 4.5 },
            lookAt: { x: 5, y: -2.35, z: 0 }
        },
        // 5. trackCharacter - Track Chen during climb down (shoots through door opening - OK for climbing/crawling)
        {
            event: 'chenClimbsDown',
            delay: 1000,
            type: 'trackCharacter',
            characterId: 'chen',
            offsetX: -3.5,
            offsetZ: -4.0,
            height: -3.5
        },
        // 6. stopTracking - MUST stop before walking starts (shooting through walls only allowed for climbing/crawling)
        {
            event: 'chenClimbsDown',
            delay: 5000,
            type: 'stopTracking'
        },
        // 7. cutToPosition - Cut to far back corner of cube 2 after tracking stops
        {
            event: 'chenWalksAway',
            delay: -500,
            type: 'cutToPosition',
            targetPos: { x: 6.5, y: -3.5, z: 4.9 },
            lookAt: { x: 6, y: -3.5, z: 0 }
        },
        // 8. panToPosition - Pan to follow Chen walking away, staying far back in cube 2
        {
            event: 'chenWalksAway',
            delay: 0,
            type: 'panToPosition',
            targetPos: { x: 14.5, y: -3.5, z: 4.9 },
            lookAt: { x: 10, y: -3.5, z: 0 },
            duration: 3000
        }
    ],

    timeline: [
        { event: 'sceneStart', delay: 0, action: 'sceneStart' },
        { event: 'chenWalksToLadder', delay: 1500, action: 'openDoorCube1' },
        { event: 'chenClimbsUp', delay: 0, action: 'logClimbing' },
        { event: 'chenCrawlsThrough', delay: 0, action: 'logCrawling' },
        { event: 'chenClimbsDown', delay: 0, action: 'logClimbingDown' },
        { event: 'chenClimbsDown', delay: 3000, action: 'closeDoorCube1' },
        { event: 'chenWalksAway', delay: 0, action: 'logWalkingAway' }
    ]
};
