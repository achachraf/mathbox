import axios from "axios";


export async function getAllFields(count = 3) {
  const response = await axios.get("/fields");
  return response.data;
}

export function getFeaturedTools(count = 4) {
  // dummy data
  return [
    { name: "Greates Common divisor", id: "1" },
    { name: "test 1", id: "10" },
    { name: "Find all divisors", id: "2" },
    { name: "Traveling Salesman", id: "3" }
  ];
}

export function getToolsinField(fieldID) {
  if (fieldID === "number-theory")
    return [
      { name: "Find all divisors", id: "2", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Find all divisors", id: "2", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Find all divisors", id: "2", description: "lorem ipsum zebinus gzaetum qlauies" }
    ];
  else if (fieldID === "graph-theory")
    return [
      { name: "Breadth-first search", id: "1", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Traveling Salesman", id: "3", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Breadth-first search", id: "1", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Traveling Salesman", id: "3", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Breadth-first search", id: "1", description: "lorem ipsum zebinus gzaetum qlauies" },
      { name: "Traveling Salesman", id: "3", description: "lorem ipsum zebinus gzaetum qlauies" }
    ];
  else return [];
}

export function getTool(ToolID) {
  return {
    name: "Find all divisors",
    description:
      "lorem ipsum zebinus gzaetum qlauies lorem ipsum zebinus gzaetum qlauies, lorem ipsum. zebinus gzaetum qlauies lorem ipsum zebinus gzaetum qlauies lorem ipsum zebinus gzaetum qlauies lorem ipsum zebinus gzaetum qlauies lorem ipsum zebinus gzaetum qlauies",
    inputs: [
      { input_type: "integer", input_order: 1, value: "" },
      { input_type: "decimal", input_order: 2, value: "" }
    ]
  };
}
