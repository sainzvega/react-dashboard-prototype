const capabilities = [
  { name: "Cap1", key: 0 },
  { name: "Cap2", key: 1 },
  { name: "Cap3", key: 2 },
  { name: "Cap4", key: 3 }
];

export function getCapabilities() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(capabilities);
    }, 500);
  });
}
