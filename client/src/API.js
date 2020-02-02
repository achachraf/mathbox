export function getAllFields(count = 3) {
  // dummy data
  var data = [];
  for (let i = 0; i < count; i++) {
    data.push({ name: "Number theory", id: "/fields/number-theory" });
    data.push({ name: "Graph theory", id: "/fields/graph-theory" });
    data.push({ name: "Logic", id: "/fields/logic" });
    i += 3;
  }
  return data;
}

export function getFeaturedTools(count = 4) {
  // dummy data
  return [
    { name: "Breadth-first search", id: "/algorithms/bfs" },
    { name: "Find all divisors", id: "/algorithms/all-divisors" },
    { name: "Find all divisors", id: "/algorithms/all-divisors" },
    { name: "Traveling Salesman", id: "/algorithms/traveling-salesman" }
  ];
}

export function getToolsinField(fieldID){
  return [
    { name: "Breadth-first search", id: "/algorithms/bfs", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "/algorithms/all-divisors", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "/algorithms/traveling-salesman", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Breadth-first search", id: "/algorithms/bfs", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "/algorithms/all-divisors", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "/algorithms/traveling-salesman", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Breadth-first search", id: "/algorithms/bfs", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "/algorithms/all-divisors", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "/algorithms/traveling-salesman", description: 'lorem ipsum zebinus gzaetum qlauies' },
  ]
}