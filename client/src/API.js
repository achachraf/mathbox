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
    { name: "Breadth-first search", id: "1" },
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
    inputs: [{ input_type: "integer", input_order: 1, value:"" },{ input_type: "decimal", input_order: 2, value:"" }]
  };
}
