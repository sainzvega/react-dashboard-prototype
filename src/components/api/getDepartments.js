const departments = [
  { name: "Dept1", key: 0 },
  { name: "Dept2", key: 1 },
  { name: "Dept3", key: 2 },
  { name: "Dept4", key: 3 }
];

export function getDepartments() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(departments);
    }, 500);
  });
}
