import axios from 'axios'

export async function getAllFields(count = 3) {

  const response = await axios.get("/fields");
  return response.data;
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

export function getTool(ToolID){
  return {
    name: "tool name"
  }
}