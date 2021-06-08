import anime from "animejs";
import * as THREE from 'three';
import { threeDFonts, UNITSIZE } from "../../config";
import { Entity } from "../../ecs/Entity";
import { DestroyAt } from "../components/DestroyAt";
import { ThreeDRelativeToCameraRotation } from "../components/ThreeDRelativeToCameraRotation";
import { ThreeDRendering } from "../components/ThreeDRendering";

function positiveOrNegative() {
    return Math.random() >= 0.5 ? 1 : -1;
}

export class ThreeDDamageText extends Entity {
    constructor(x, y, z, amount) {
        const geometry = new THREE.TextGeometry('' + amount, {
            font: threeDFonts.default,
            size: 1,
            height: 0.0625,
            
        });
        var materials = [
            new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
            new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
        ];
        var textMesh1 = new THREE.Mesh(geometry, materials);

        super({
            ThreeDRendering: new ThreeDRendering({
                model: textMesh1
            }),
            DestroyAt: new DestroyAt({
                time: window.gameTime + 500
            }),
            ThreeDRelativeToCameraRotation: new ThreeDRelativeToCameraRotation(),
        });
        
        this.components.ThreeDRotation.isStatic = true;
        this.components.ThreeDPosition.x = x + Math.random() * 0.3 * positiveOrNegative() * UNITSIZE;
        this.components.ThreeDPosition.y = y + UNITSIZE + Math.random() * 1.1 * UNITSIZE;
        this.components.ThreeDPosition.z = z + Math.random() * 0.3 * positiveOrNegative() * UNITSIZE;
    }
}
