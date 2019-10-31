//let icons = window.kd.icons;
icons = kd.icons;
window.kd.data = {
	skills: [
		{
			name:"beginningTech",
			linesTo:['theoryI','chemI','smithI'],
			parents:[],
			complete:true,
			hoursWorkedOn:1,
			requirements:{time:1},
			texts: [
				{
					id:"title",
					text:"Beginning Tech",
					size:14
				},
				{
					id:"desc",
					text:"Tech level at the very beginning of the campaign."
				}
			]
		},
		{
			name:"theoryI",
			linesTo:['theoryII'],
			parents:['beginningTech'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:30},
			texts: [
				{
					id: "title",
					text:icons.science+" Scientific Theory",
					size:14
				},
				{
					id:"desc",
					text:"Further understanding of the scientific theory will improve your research speed.",
					greyOut: true
				},
				{
					id:"cost",
					text:"Costs: 30 "+icons.time+" ||OR|| 1 "+icons.inspiration+" and 5 "+icons.time,
					greyOut: true
				},
				{
					id:"unlocks",
					text:"Unlocks: +1.25x Research Speed",
					greyOut: true
				}
			]
		},
		{
			name:"chemI",
			linesTo:['gunpowderI'],
			parents:['beginningTech'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.chemistry+" Chemistry I",
					size:14
				},
				{
					id:"desc",
					text:"Purchase and instal a Simple Chemistry Table in your lab space",
					greyOut: true
				},
				{
					id:"cost",
					text:"Costs: 100 "+icons.money+" and 8 "+icons.time+" ||OR|| 200 "+icons.money+" and 2 "+icons.time,
					greyOut: true
				},
				{
					id:"unlocks",
					text:"Unlocks: "+icons.chemistry+" Chemistry-related research.",
					greyOut: true
				}
			]
		},
		{
			name:"smithI",
			linesTo:['machining'],
			parents:['beginningTech'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:'title',
					text:icons.smithing+' Smithing I',
					size:14
				},
				{
					id:'desc',
					text:'Gain 24-hour access to a forge near your lab space, so you can effectively research new smithing techniquies.',
					greyOut: true
				},
				{
					id:'cost',
					text:'Costs: 150 '+icons.money,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.smithing+' Smithing-based researches, Iron and Steel Forging, Glassblowing, and Pottery',
					greyOut: true
				}
			]
		},
		{
			name:"theoryII",
			linesTo:['basicComputing'],
			parents:['theoryI'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:30},
			texts: [
				{
					id: "title",
					text:icons.science+" Scientific Theory II",
					size:14
				},
				{
					id:"desc",
					text:"An even deeper understanding of the scientific theory will greatly improve your research speed.",
					greyOut: true
				},
				{
					id:"cost",
					text:"Costs: 30 "+icons.time+" ||OR|| 1 "+icons.inspiration+" and 5 "+icons.time,
					greyOut: true
				},
				{
					id:"unlocks",
					text:"Unlocks: +1.5x Research Speed",
					greyOut: true
				}
			]
		},
		{
			name:"gunpowderI",
			linesTo:['basicPistols'],
			parents:['chemI'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.chemistry+" Shoddy Gunpowder Production",
					size:14
				},
				{
					id:'desc',
					text:'Gunpowder is rather simple to make, if you don\'t mind the change of losing a finger or two...',
					greyOut: true
				},
				{
					id:'cost',
					text:'Cost: 80 '+icons.money+' and 10 '+icons.time+' ||OR|| 1 '+icons.inspiration+', 10 '+icons.money+' and 2 '+icons.time,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: Shoddy Gunpowder Production, 9mm Pistol Rounds',
					greyOut: true
				}
			]
		},
		{
			name:"machining",
			linesTo:['basicPistols'],
			parents:['smithI'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.smithing+' Machining',
					size:14
				},
				{
					id:'desc',
					text:'Machining is the bread and butter of more advanced mechanisms.',
					greyOut: true
				},
				{
					id:'cost',
					text:'Cost: 100 '+icons.money+' and 30 '+icons.time,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.smithing+' Basic Machining',
					greyOut: true
				}
			]
		},
		{
			name:"basicComputing",
			linesTo:[],
			parents:['theoryII'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.science+' Basic Computing I',
					size:14
				},
				{
					id:'desc',
					text:'The abacus is the soul of mathematics.',
					greyOut: true
				},
				{
					id:'cost',
					text:'Cost: 10 '+icons.money+' and 1 '+icons.time,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: x2 research speed for math-based researches, and x1.5 research speed for eveerything else.',
					greyOut: true
				}
			]
		},
		{
			name:"basicPistols",
			linesTo:['harnessElem'],
			parents:['gunpowderI','machining'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.guns+' Basic Pistols',
					size:14
				},
				{
					id:'desc',
					text:'While basic, these pistols still pack a punch!',
					greyOut: true
				},
				{
					id:'cost',
					text:'Cost: 100 '+icons.money+' and 30 '+icons.time,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.guns+' Basic Pistol',
					greyOut: true
				}
			]
		},
		{
			name:"harnessElem",
			linesTo:[],
			parents:['basicPistols'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:0},
			texts: [
				{
					id:"title",
					text:icons.guns+' Weaponizing the Elements',
					size:14
				},
				{
					id:'desc',
					text:'Elemental Theory sugests that every element has a physical analog...',
					greyOut: true
				},
				{
					id:'cost',
					text:'Cost: 120 '+icons.money+' and 15 '+icons.time,
					greyOut: true
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.guns+' Fire Round, '+icons.guns+' Shock Round and '+icons.guns+' Stun Round',
					greyOut: true
				}
			]
		}
	]
}