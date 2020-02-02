import axios from 'axios';


export async function getAllFields() {
  const fields = await axios.get("/fields");
  return fields;
}

export function getFeaturedTools(count = 4) {
  // dummy data
  return [
    { name: "Breadth-first search", id: "1" },
    { name: "Find all divisors", id: "2" },
    { name: "Traveling Salesman", id: "3" }
  ];
}

export function getToolsinField(fieldID){
  return [
    { name: "Breadth-first search", id: "1", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "2", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "3", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Breadth-first search", id: "1", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "2", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "3", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Breadth-first search", id: "1", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Find all divisors", id: "2", description: 'lorem ipsum zebinus gzaetum qlauies' },
    { name: "Traveling Salesman", id: "3", description: 'lorem ipsum zebinus gzaetum qlauies' },
  ]
}

export function getTool(ToolID){
  return {
    name: "tool name"
  }
}