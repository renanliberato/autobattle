import { Entity } from "../../ecs/Entity";
import { DestroyAt } from "../components/DestroyAt";
import { ThreeDAcceleration } from "../components/ThreeDAcceleration";
import { ThreeDRendering } from "../components/ThreeDRendering";
import { ThreeDVelocity } from "../components/ThreeDVelocity";

export class DamageParticle extends Entity {
    constructor(x, y, z) {
        super({
            ThreeDVelocity: new ThreeDVelocity({
                x: Math.random().map(0, 1, -0.02, 0.02),
                y: Math.random().map(0, 1, -0.06, -0.02),
                z: Math.random().map(0, 1, -0.02, 0.02),
            }),
            ThreeDAcceleration: new ThreeDAcceleration({
                x: Math.random().map(0, 1, 0, 0.002),
                y: Math.random().map(0, 1, 0, 0.002),
                z: Math.random().map(0, 1, 0, 0.002),
            }),
            ThreeDRendering: new ThreeDRendering({
                model: (anchor) => {
                    return {
                        object: new Zdog.Shape({
                            addTo: anchor,
                            stroke: 1,
                            color: '#ffffff'
                        })
                    };
                }
            }),
            DestroyAt: new DestroyAt({
                time: window.gameTime + 250
            })
        });

        this.components.ThreeDPosition.x = x;
        this.components.ThreeDPosition.y = y;
        this.components.ThreeDPosition.z = z;
    }
}