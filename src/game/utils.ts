export function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}