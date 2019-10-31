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
			lines: [
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
			linesTo:[],
			parents:['beginningTech'],
			complete:false,
			hoursWorkedOn:0,
			requirements:{time:30},
			lines: [
				{
					id: "title",
					text:icons.science+" Scientific Theory",
					size:14
				},
				{
					id:"desc",
					text:"Further understanding of the scientific theory will improve your research speed."
				},
				{
					id:"cost",
					text:"Costs: 30 "+icons.time+" ||OR|| 1 "+icons.inspiration+" and 5 "+icons.time
				},
				{
					id:"unlocks",
					text:"Unlocks: 1.25x Research Speed"
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
			lines: [
				{
					id:"title",
					text:icons.chemistry+" Chemistry I",
					size:14
				},
				{
					id:"desc",
					text:"Purchase and instal a Simple Chemistry Table in your la space",
				},
				{
					id:"cost",
					text:"Costs: 100 "+icons.money+" and 8 "+icons.time+" ||OR|| 200 "+icons.money+" and 2 "+icons.time
				},
				{
					id:"unlocks",
					text:"Unlocks: "+icons.chemistry+" Chemistry-related research."
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
			lines: [
				{
					id:'title',
					text:icons.smithing+' Smithing I',
					size:14
				},
				{
					id:'desc',
					text:'Gain 24-hour access to a forge near your lab space, so you can effectively research new smithing techniquies.'
				},
				{
					id:'cost',
					text:'Costs: 150 '+icons.money
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.smithing+' Smithing-based researches, Iron and Steel Forging, Glassblowing, and Pottery'
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
			lines: [
				{
					id:"title",
					text:icons.chemistry+" Shoddy Gunpowder Production",
					size:14
				},
				{
					id:'desc',
					text:'Gunpowder is rather simple to make, if you don\'t mind the change of losing a finger or two...'
				},
				{
					id:'cost',
					text:'Cost: 80 '+icons.money+' and 10 '+icons.time+' ||OR|| 1 '+icons.inspiration+', 10 '+icons.money+' and 2 '+icons.time
				},
				{
					id:'unlocks',
					text:'Unlocks: Shoddy Gunpowder Production, 9mm Pistol Rounds'
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
			lines: [
				{
					id:"title",
					text:icons.smithing+' Machining',
					size:14
				},
				{
					id:'desc',
					text:'Machining is the bread and butter of more advanced mechanisms.'
				},
				{
					id:'cost',
					text:'Cost: 100 '+icons.money+' and 30 '+icons.time
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.smithing+' Basic Machining'
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
			lines: [
				{
					id:"title",
					text:icons.guns+' Basic Pistols',
					size:14
				},
				{
					id:'desc',
					text:'While basic, these pistols still pack a punch!'
				},
				{
					id:'cost',
					text:'Cost: 100 '+icons.money+' and 30 '+icons.time
				},
				{
					id:'unlocks',
					text:''
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
			lines: [
				{
					id:"title",
					text:icons.guns+' Weaponizing the Elements',
					size:14
				},
				{
					id:'desc',
					text:'Elemental Theory sugests that every element has a physical analog...'
				},
				{
					id:'cost',
					text:'Cost: 120 '+icons.money+' and 15 '+icons.time
				},
				{
					id:'unlocks',
					text:'Unlocks: '+icons.guns+' Fire Round, '+icons.guns+' Shock Round and '+icons.guns+' Stun Round'
				}
			]
		}
	]
}