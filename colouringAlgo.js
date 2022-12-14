class Graph {
	constructor(noOfVertices) {
		this.noOfVertices = noOfVertices;
		this.adjList = new Map();
	}

	addVertex(v) {
		this.adjList.set(v, new Set());
	}

	addEdge(v, w) {
		this.adjList.get(v).add(w);
		this.adjList.get(w).add(v);
	}

	printGraph() {
		let getKeys = this.adjList.keys();
		for(let i of getKeys) {
			let getValues = this.adjList.get(i);
			getValues = Array.from(getValues);
			let conc = "";
			for(let j of getValues) {
				conc += j + " ";
			}
			console.log(i + " -> " + conc);
		}
	}
}

function colourGraph(){
	// var adjList = adjMatrix.adjList;
	// colour palette: matplotlib quantitative colour palette: 'Set2'
	// const palette = ['(0.4, 0.7607843137254902, 0.6470588235294118, 1.0)',
	// '(0.9882352941176471, 0.5529411764705883, 0.3843137254901961, 1.0)',
	// '(0.5529411764705883, 0.6274509803921569, 0.796078431372549, 1.0)',
	// '(0.9058823529411765, 0.5411764705882353, 0.7647058823529411, 1.0)',
	// '(0.6509803921568628, 0.8470588235294118, 0.32941176470588235, 1.0)',
	// '(1.0, 0.8509803921568627, 0.1843137254901961, 1.0)',
	// '(0.8980392156862745, 0.7686274509803922, 0.5803921568627451, 1.0)',
	// '(0.7019607843137254, 0.7019607843137254, 0.7019607843137254, 1.0)']

	// var adjList = new Map([[1, new Set([2, 7])],
	// 	[2, new Set([1, 3, 7, 8])],
	// 	[3, new Set([2, 4, 8, 9])],
	// 	[4, new Set([3, 5, 9, 10])],
	// 	[5, new Set([4, 6, 10])],
	// 	[6, new Set([5, 10, 15])],
	// 	[7, new Set([1, 2, 8, 11])],
	// 	[8, new Set([2, 3, 7, 9, 11, 12, 13])],
	// 	[9, new Set([3, 4, 8, 10, 13])],
	// 	[10, new Set([4, 5, 6, 9, 13, 14, 15])],
	// 	[11, new Set([7, 8, 12])],
	// 	[12, new Set([8, 11, 13, 16])],
	// 	[13, new Set([8, 9, 10, 12, 14, 16])],
	// 	[14, new Set([10, 13, 15, 16])],
	// 	[15, new Set([6, 10, 14, 16])],
	// 	[16, new Set([12, 13, 14])],	
	// ]);

	var adjList = new Map([[1, new Set([2, 3, 4, 5, 6, 7])],
	[2, new Set([1, 3, 7, 8, 18, 19])],
	[3, new Set([1, 2, 4, 8, 9, 10])],
	[4, new Set([1, 3, 5, 10, 11, 12])],
	[5, new Set([1, 4, 6, 12, 13, 14])],
	[6, new Set([1, 5, 7, 13, 14, 15, 16])],
	[7, new Set([1, 2, 6, 16, 17, 18])],
	[8, new Set([2, 3, 9, 19, 20, 21, 22])],
	[9, new Set([3, 8, 10, 22, 23])],
	[10, new Set([3, 4, 9, 11, 23, 24, 25])],
	[11, new Set([4, 10, 12, 25, 26])],
	[12, new Set([4, 5, 11, 13, 26, 27])],
	[13, new Set([5, 6, 12, 14, 27, 28])],
	[14, new Set([6, 13, 15, 28, 29])],
	[15, new Set([6, 14, 16, 29, 30])],
	[16, new Set([6, 7, 15, 17, 30, 31])],
	[17, new Set([7, 16, 18, 31, 32])],
	[18, new Set([2, 7, 17, 19, 32, 33])],
	[19, new Set([2, 8, 18, 20, 33])],
	[20, new Set([8, 19, 21, 33])],
	[21, new Set([8, 20, 22])],
	[22, new Set([8, 9, 21, 23])],
	[23, new Set([9, 10, 22, 24])],
	[24, new Set([10, 23, 25])],
	[25, new Set([10, 11, 24, 26])],
	[26, new Set([11, 12, 25, 27])],
	[27, new Set([12, 13, 26, 28])],
	[28, new Set([13, 14, 27, 29])],
	[29, new Set([14, 15, 28, 30])],
	[30, new Set([15, 16, 29, 31])],
	[31, new Set([16, 17, 30, 32])],
	[32, new Set([17, 18, 31, 33])],
	[33, new Set([18, 29, 20, 32])],
]);
	// {1: [2, 7], 2: [1, 3, 7, 8], 3: [2, 4, 8, 9], 4: [3, 5, 9, 10], 5: [4, 6, 10], 6: [5, 10, 15], 7: [1, 2, 8, 11], 8: [2, 3, 7, 9, 11, 12, 13], 9: [3, 4, 8, 10, 13], 10: [4, 5, 6, 9, 13, 14, 15], 11: [7, 8, 12], 12: [8, 11, 13, 16], 13: [8, 9, 10, 12, 14, 16], 14: [10, 13, 15, 16], 15: [6, 10, 16]}

	
	const palette = [1, 2, 3, 4, 5, 6, 7, 8]
	numAdj = []
	vertices = new Set()
	for(let [key, value] of adjList){
		vertices.add(key);
		numAdj.push([value.size, key]);
	}
	numAdj.sort();
	numAdj.reverse();
	// actual colouring algorithm
	var colourOfVertex = new Map();
	// var colourToVertex = new Map();
	for(var i = 0; i < palette.length; i++){
		current = new Set();
		toRemove = [];
		for(var j = 0; j < numAdj.length; j++){
			// console.log(current);
			var flag = false;
			current.forEach(v => {
				// console.log(v, adjList.get(v), numAdj[j][1])
				if(adjList.get(v).has(numAdj[j][1])){
					flag = true;
					return;
				}
			})
			if(flag){
				continue;
			}
			colourOfVertex[numAdj[j][1]] = palette[i];
			current.add(numAdj[j][1]);
			// if(!colourToVertex.has(palette[i])){
			// 	colourToVertex[palette[i]] = []
			// }
			// colourToVertex[palette[i]].push(numAdj[j][1]);
			toRemove.push(j)
		}
		for(var j = toRemove.length - 1; j > -1; j--){
			numAdj.splice(toRemove[j], 1);
		}
	}
	// console.log(adjList);
	console.log(colourOfVertex);
	// console.log(colourToVertex);
}

colourGraph();