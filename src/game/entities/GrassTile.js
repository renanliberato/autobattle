import { Position } from '../components/Position';
import { Entity } from '../../ecs/Entity';
import { Rendering } from '../components/Rendering';
import { ImageRendering } from '../components/ImageRendering';
import { Size } from '../components/Size';
import { PolygonRendering } from '../components/PolygonRendering';
import { ThreeDRendering } from '../components/ThreeDRendering';
import anime from 'animejs';
import { threeDModels } from '../../config';
import { GridPosition } from '../components/GridPosition';

export class GrassTile extends Entity {
  constructor(x, z) {
    super({
      Rendering: new Rendering({}),
      ThreeDRendering: new ThreeDRendering({
        // model: createGrassModel,
        model: threeDModels.tile,
        // isStatic: true
      })
    });

    this.components.ThreeDPosition.x = x;
    this.components.ThreeDPosition.z = z;
  }
}

function createGrassModel(scenarioAnchor, x, z) {
  const obj = new Zdog.Box({
    addTo: scenarioAnchor,
    width: 11,
    height: 1,
    depth: 11,
    translate: {
      x: (x) * 11 + (x) * 5,
      z: (z) * 11 + (z) * 5
    },
    color: '#54842a',
  });

  // [...Array(10).keys()].forEach(z => {
  //   [...Array(10).keys()].forEach(x => {
  //     const xx = (Math.random() * 5).map(0, 5, -5, 5);
  //     const zz = (Math.random() * 5).map(0, 5, -5, 5);
  //     const size = Math.random() * 0.5;

  //     new Zdog.Shape({
  //       addTo: obj,
  //       translate: {
  //         y: -1.5,
  //         x: xx,
  //         z: zz,
  //       },
  //       path: [
  //         { y: 0 },
  //         { y: -0.5 - size }
  //       ],
  //       stroke: 0.3,
  //       color: '#206d33'
  //     });
  //   });
  // });

  [...Array(2).keys()].forEach(z => {
    [...Array(2).keys()].forEach(x => {
      const xx = (Math.random() * 4).map(0, 4, -4, 4);
      const zz = (Math.random() * 4).map(0, 4, -4, 4);
      const size = Math.random() * 3;
      new Zdog.Shape({
        addTo: obj,
        translate: {
          y: 2,
          x: xx,
          z: zz,
        },
        path: [
          { y: 0 },
          { y: 5 + size }
        ],
        stroke: 1,
        color: '#fff'
      });

      const thrustler = new Zdog.Shape({
        addTo: obj,
        translate: {
          y: 2,
          x: xx,
          z: zz,
        },
        path: [
          { y: 0 },
          { y: 5 + size }
        ],
        stroke: 1,
        color: '#fff'
      });

      anime({
        targets: thrustler.translate,
        y: 4,
        direction: 'alternate',
        loop: true,
        delay: Math.random() * window.stepsInterval * 3 / 5,
        duration: window.stepsInterval / 2 + Math.random() * window.stepsInterval / 2,
      });
    });
  });
  return {
    object: obj
  };
}