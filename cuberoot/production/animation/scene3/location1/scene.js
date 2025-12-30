import { BaseScene } from '../../../../../production/animation/BaseScene.js';
import { ConferenceRoom } from '../../ConferenceRoom.js';
import { sceneConfig } from './sceneConfig.js';

export class TeamMeetingScene extends BaseScene {
    constructor() {
        super(sceneConfig);
        this.conferenceRoom = null;
    }

    setupBackground() {
        // Add conference room
        this.conferenceRoom = new ConferenceRoom({
            width: 20,
            height: 10,
            depth: 15,
            wallColor: 0x808080,
            floorColor: 0x404040
        });

        this.scene.add(this.conferenceRoom.getGroup());

        // Camera Position 1: Wide shot from east showing entrance and table
        this.camera.position.set(8, 2, 0);
        this.camera.lookAt(0, 1, 0);

        // Define static camera positions (all inside room bounds)
        this.cameraPositions = {
            wide: { pos: { x: 8, y: 2, z: 0 }, lookAt: { x: 0, y: 1, z: 0 } },            // Wide from east (inside room)
            marcus: { pos: { x: 0, y: 1.8, z: 0 }, lookAt: { x: -7, y: 1.5, z: 0 } },     // Focus on Marcus (west)
            foodTeam: { pos: { x: 0, y: 2, z: 5 }, lookAt: { x: 0, y: 1, z: -2 } },       // Focus on food team (view from south)
            edgar: { pos: { x: 0, y: 1.8, z: 3 }, lookAt: { x: 0, y: 1.5, z: 6.5 } },     // Focus on Edgar (south)
            screen: { pos: { x: 5, y: 2, z: 0 }, lookAt: { x: -9, y: 2, z: 0 } }          // Screen on west wall
        };
    }


    // Timeline actions (based on screenplay)
    sceneStart() {
        console.log('Scene started - Food team entering conference room');
    }

    marcusWelcomes() {
        console.log('Marcus: "Ah, perfect timing. Come in, please. Find a seat."');
    }

    foodTeamSits() {
        console.log('Food team takes their seats');
        // Food team sitting actions are now triggered automatically via their action timings
    }

    marcusIntroductions() {
        console.log('Marcus facilitates introductions');
    }

    alexIntroduces() {
        console.log('Alex: "I\'m Alex, team lead. We\'re the Food Experimentation team"');
    }

    morrisRambles() {
        console.log('Morris: "I\'ve been working on the molecular bonding side..."');
    }

    marcusIntroQuantum() {
        console.log('Marcus introduces quantum team');
    }

    leaAcknowledges() {
        console.log('Lea gives Alex a knowing look');
    }

    edgarStands() {
        console.log('Edgar stands and does synergy gesture');
    }

    marcusNDA() {
        console.log('Marcus: "I need everyone to sign a confidentiality agreement"');
    }

    peopleSigning() {
        console.log('People signing NDAs');
    }

    alexAsks() {
        console.log('Alex: "What do you mean integration?"');
    }

    edgarExplains() {
        console.log('Edgar: "Sof-tak has hit profit maximization. Food Experimentation doesn\'t exist"');
    }

    foodTeamReacts() {
        console.log('Food team sits in shocked silence');
        // Could add head movements or gestures
    }

    marcusSlideshow() {
        console.log('Marcus shows tesseract slideshow');
    }

    focusOnScreen() {
        console.log('Camera focuses on projection screen');
    }

    dariusQuestions() {
        console.log('Darius: "Wait, n=0? That\'s—"');
    }

    ninaQuestions() {
        console.log('Nina: "If there\'s a safety issue, shouldn\'t we address that before—"');
    }

    edgarCallsBreak() {
        console.log('Edgar: "Actually, why don\'t we break?"');
    }

    peopleStanding() {
        console.log('People start standing up');
        // Everyone except Marcus and Edgar stand
        ['lea', 'nina', 'rashid', 'chen', 'yuki', 'alex', 'morris', 'darius', 'sofia'].forEach((id, index) => {
            setTimeout(() => {
                const char = this.characters[id];
                if (char) {
                    char.playAnimation('standing');
                }
            }, index * 150);
        });
    }

    leaAndAlexExit() {
        console.log('Lea and Alex head for exit together');
        // Animate Lea and Alex walking to door
        const lea = this.characters.lea;
        const alex = this.characters.alex;

        if (lea) {
            this.characterWalk(lea, {
                startPosition: { x: 4, y: 0.1, z: 2 },
                endPosition: { x: 9, y: 0.1, z: 0 },
                distancePerCycle: 2
            });
        }

        if (alex) {
            setTimeout(() => {
                this.characterWalk(alex, {
                    startPosition: { x: 5, y: 0.1, z: -2 },
                    endPosition: { x: 9, y: 0.1, z: 0 },
                    distancePerCycle: 2
                });
            }, 300);
        }
    }

    morrisOffersSoftak() {
        console.log('Morris: "Sof-tak?" *offers to Chen*');
    }

    // Camera control methods - instant cuts
    cameraWide() {
        console.log('[CAMERA] Cut to: Wide shot');
        this.cutToPosition('wide');
    }

    cameraToMarcus() {
        console.log('[CAMERA] Cut to: Marcus');
        this.cutToPosition('marcus');
    }

    cameraToFoodTeam() {
        console.log('[CAMERA] Cut to: Food team');
        this.cutToPosition('foodTeam');
    }

    cameraToEdgar() {
        console.log('[CAMERA] Cut to: Edgar');
        this.cutToPosition('edgar');
    }

    cameraToWide() {
        console.log('[CAMERA] Cut to: Wide shot');
        this.cutToPosition('wide');
    }
}
