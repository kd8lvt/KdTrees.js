skills = window.kd.data.skills;
window.kd.dynamicLoader = {
	getDepths: function() {	
		depths = [];
		for (var i in skills) {
			target = skills[i];
			contain = contains(depths,target.name,"name");
			if (!contain) {
				var parentDepths = [];
				if (target.parents.length > 0) {
					for (var j in target.parents) {
						if (contains(depths,target.parents[j],"name")) {
							var found = find(depths,target.parents[j],"name",false);
							parentDepths.push(found.depth);
						}
					}
				}
				console.log(target.name,parentDepths);
				deepest = 0;
				for (var j in parentDepths) {
					if (deepest < parentDepths[j]) deepest = parentDepths[j];
				}
				depths.push({name:target.name,depth:deepest+1});
				target.depth = deepest+1;
				//console.log(depths);
			}
		}
		console.log('Depths: '+JSON.stringify(depths));
		return depths;
	},
	getWidestPerDepth(depths) {
		let skillFound = true;
		let widest = [];
		let currentDepth = 1;
		for (i in depths) {
			targets = [];
			for (i in depths) {
				target = depths[i];
				if (target.depth == currentDepth) targets.push(target);
			}
			
			curWidest = 0;
			name = "";
			for (i in targets) {
				skill = find(skills,targets[i].name,"name");
				let width = kd.dynamicLoader.calculateWidth(skill);
				if (width > curWidest) {
					curWidest = width;
					name=skill.name;
				} 
			}
			widest.push({width:curWidest,skill:name});

			currentDepth++;
			skillFound = false;
			for (i in depths) {
				if (depths[i].depth == currentDepth) {
					skillFound = true;
					break;
				}
			}
			if (!skillFound) {
				break;
			}
		}

		return widest;
	},
	calculateWidth: function(skill) {
		let longest = 0;
		let width = 0;
	    for (let i in skill.lines) {
	      kd.ctx.font = skill.lines[longest].size + 'px fontello,"Titillium Web"';
	      let oldT = kd.ctx.measureText(skill.lines[longest].text).width;
	      kd.ctx.font = skill.lines[i].size + 'px fontello,"Titillium Web"';
	      let newT = kd.ctx.measureText(skill.lines[i].text).width;
	      if (newT > oldT) { longest = i; width = newT;};
	    }

	    return width;
	},
	getY: function(skill,depths) {
		depth = find(depths,skill.name,"name").depth;
		siblings = [];
		for (i in skills) {
			target = skills[i];
			if (target.pos != null) if (target.pos.y != 0 && find(depths,target.name,"name").depth == depth && target.name != skill.name) siblings.push(target);
		}
		if (siblings.length > 0) {
			lowest = 0;
			for (i in siblings) {
				if (siblings[i].pos.y > lowest) {
					lowest = siblings[i].pos.y;
				}
			}
			skill.pos.y = lowest+55;
			return lowest+55;
		}
		for (i in skills) {
			target = skills[i];
			if (find(depths,target.name,"name").depth == depth && target.name != skill.name) siblings.push(target);
		}
		if (siblings.length > 0) {
			skill.pos.y = siblings.length*55;
			return siblings.length*55;
		} else {
			skill.pos.y=160;
			return 160;
		}
	},
	getX: function(skill,depths,widest) {
		depth = find(depths,skill.name,"name");
		if (depth.depth > 1) {
			width = widest[depth.depth-1];
			prevPos = find(skills,width.skill,"name").pos.x;
			skill.pos.y = (width.width+prevPos+100);
			return (width.width+prevPos+100);
		} else {
			return 50;
		}
	},
	getPositions: async function() {
		let depths = kd.dynamicLoader.getDepths();
		let widest = kd.dynamicLoader.getWidestPerDepth(depths);
		//console.log(widest);
		console.log(skills);
		for (i in skills) {
			skills[i].pos = {x:0,y:0};
		}
		for (i in depths) {
			skill = await find(skills,depths[i].name,"name");
			skill.pos.x = await kd.dynamicLoader.getX(skill,depths,widest);
			skill.pos.y = await kd.dynamicLoader.getY(skill,depths);
			console.log(skill.name,skill.pos)
			window.kd.skills.push(new Skill(skill.name,[skill.pos.x,skill.pos.y],skills[i].linesTo,skill.complete,skill.hoursWorkedOn,skill.requirements));
			for (j in skill.lines) {
				window.kd.skills[window.kd.skills.length-1].addText(skill.lines[j].id,skill.lines[j].text,skill.lines[j].size);
			}
		}
	}
}

function contains(arr,query,filter) {
	if (filter) {
		for (i in arr) {
			if (arr[i][filter] == query) return true;
		}
	} else {
		for (i in arr) {
			if (arr[i] == query) return true;
		}
	}
	return false;
}

function find(arr,query,filter,getIndex) {
	if (filter) {
		for (i in arr) {
			if (arr[i][filter] == query) {
				if (getIndex) return arr[i],i;
				return arr[i];
			}
		}
	} else {
		for (i in arr) {
			if (arr[i] == query) {
				if (getIndex) return arr[i],i;
				return arr[i];
			}
		}
	}
	return false;
}