import _ from 'lodash';

export function randomColor() {
  return `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`;
}
