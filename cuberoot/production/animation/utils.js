/**
 * Animation utility constants
 */

// Character height positions
export const CHARACTER_HEIGHT = {
    SITTING: -0.25,
    STANDING: 0.1,
    WALKING: 0.1
};

// Character scale (for Mixamo models)
export const CHARACTER_SCALE = 0.01;

// Animation speeds
export const ANIMATION_SPEED = {
    WALK_DISTANCE_PER_CYCLE: 2,
    DEFAULT_STAGGER: 200  // ms between character actions
};

// Rotation constants
export const ROTATION = {
    NORTH: Math.PI,           // Face north (toward negative Z)
    SOUTH: 0,                 // Face south (toward positive Z)
    EAST: -Math.PI / 2,       // Face east (toward positive X)
    WEST: Math.PI / 2,        // Face west (toward negative X)
    NORTHEAST: -Math.PI * 3/4, // Face northeast
    NORTHWEST: Math.PI * 3/4,  // Face northwest
    SOUTHEAST: -Math.PI / 4,   // Face southeast
    SOUTHWEST: Math.PI / 4     // Face southwest
};

// Action types
export const ACTION_TYPE = {
    WALK: 'walk',
    SITTING: 'sitting',
    STANDING: 'standing',
    WAVING: 'waving',
    POINTING: 'pointing'
};
