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
				deepest = 0;
				for (var j in parentDepths) {
					if (deepest < parentDepths[j]) deepest = parentDepths[j];
				}
				depths.push({name:target.name,depth:deepest+1});
				target.depth = deepest+1;
			}
		}
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
			widest.push({depth:currentDepth,width:curWidest,skill:name});
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
	    for (let i in skill.texts) {
	      kd.ctx.font = skill.texts[longest].size + 'px fontello,"Titillium Web"';
	      let oldT = kd.ctx.measureText(skill.texts[longest].text).width;
	      kd.ctx.font = skill.texts[i].size + 'px fontello,"Titillium Web"';
	      let newT = kd.ctx.measureText(skill.texts[i].text).width;
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
			if (lowest == 0) {
				lowest = 95;
			}
			skill.pos.y = lowest+55;
			return lowest+55;
		}
		for (i in skills) {
			target = skills[i];
			if (find(depths,target.name,"name").depth == depth && target.name != skill.name) siblings.push(target);
		}
		if (siblings.length > 0) {
			if (siblings.length == 1) {
				skill.pos.y == 160;
				return 160;
			} else {
				skill.pos.y = siblings.length*55;
				return siblings.length*55;
			}
		} else {
			skill.pos.y=160;
			return 160;
		}
	},
	getX: function(skill,depths,widest) {
		depth = find(depths,skill.name,"name");
		if (depth.depth > 1) {
			width = find(widest,depth.depth-1,"depth");
			prevPos = skills.find(skill => skill.name == width.skill).pos.x;
			skill.pos.x = (width.width+prevPos);
			return (width.width+prevPos);
		} else {
			skill.pos.x = 50;
			return 50;
		}
	},
	getPositions: async function() {
		let depths = kd.dynamicLoader.getDepths();
		let widest = kd.dynamicLoader.getWidestPerDepth(depths);
		for (i in skills) {
			skills[i].pos = {x:0,y:0};
		}
		for (i in depths) {
			skill = await find(skills,depths[i].name,"name");
			skill.pos.x = await kd.dynamicLoader.getX(skill,depths,widest);
			skill.pos.y = await kd.dynamicLoader.getY(skill,depths);
			window.kd.skills.push(new Skill(skill.name,skill.pos,skill.linesTo,skill.complete,skill.hoursWorkedOn,skill.requirements,skill.parents));
			for (j in skill.texts) {
				window.kd.skills[window.kd.skills.length-1].addText(skill.texts[j].id,skill.texts[j].text,skill.texts[j].size,skill.texts[j].grayOut);
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