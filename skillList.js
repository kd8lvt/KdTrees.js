window.kd.skills = [];

kd.icons = {
	inspiration: "\ue801",
	money: "\uf0d6",
	time: "\ue800",
	chemistry: "\uf0c3",
	smithing: "\ue802",
	science: "\uf50d",
	alert: "\ue803",
	guns: "\ue804"
}

icons = kd.icons;

beginningTech = new Skill('beginningTech',[50,160],['theoryI','chemI','smithI'],true);
beginningTech.addText('title','Beginning Tech',14);
beginningTech.addText('desc','Current technology at the beginning of the campaign.');
//beginningTech.background = "rgb(0,255,0)";
kd.skills.push(beginningTech);

theoryI = new Skill('theoryI',[314,95]);
theoryI.addText('title',icons.science+' Scientific Theory',14);
theoryI.addText('desc','Further understanding of the scientific theory will greatly improve your research speed and costs.');
theoryI.addText('cost','Costs: 30 '+icons.time+' ||OR|| 1 '+icons.inspiration+' and 5 '+icons.time);
theoryI.addText('unlocks','Unlocks: 1.25x Research Speed');
kd.skills.push(theoryI);

chemI = new Skill('chemI',[450,150],['gunpowderI']);
chemI.addText('title',icons.chemistry+' Chemistry I',14);
chemI.addText('desc','Purchase and install a Chemistry Table in your lab space.');
chemI.addText('cost','Costs: 100 '+icons.money+' and 8 '+icons.time+' ||OR|| 200 '+icons.money+' and 2 '+icons.time);
chemI.addText('unlocks','Unlocks: '+icons.chemistry+'Chemistry Tech Tree');
kd.skills.push(chemI);

smithI = new Skill('smithI',[275,205],['machining']);
smithI.addText('title',icons.smithing+' Smithing I',14);
smithI.addText('desc','Gain 24-hour access to a Forge near your lab space so you can effectively research new smithing techniques.');
smithI.addText('cost','Costs: 150 '+icons.money);
smithI.addText('unlocks','Unlocks: '+icons.smithing+' Smithing Tech Tree, Iron and Steel Forging, Glassblowing, Pottery');
kd.skills.push(smithI)

gunpowderI = new Skill('gunpowderI',[730,150],['basicPistols']);
gunpowderI.addText('title',icons.chemistry+' Shoddy Gunpowder Production',14);
gunpowderI.addText('desc','Gunpowder can be made rather simply... if you don\'t mind the chance of losing a finger or two...');
gunpowderI.addText('cost','Cost: 80 '+icons.money+' and 10 '+icons.time+' ||OR|| 1 '+icons.inspiration+', 10 '+icons.money+' and 2'+icons.time);
gunpowderI.addText('unlocks','Unlocks: Shoddy Gunpowder Production');
kd.skills.push(gunpowderI);

machining = new Skill('machining',[825,205],['basicPistols']);
machining.addText('title',icons.smithing+' Machining',14);
machining.addText('desc','Machining is the bread and butter of more advanced mechanisms.');
machining.addText('cost','Cost: 100 '+icons.money+' and 30'+icons.time);
machining.addText('unlocks','Unlocks: '+icons.smithing+' Basic Machining');
kd.skills.push(machining);

basicGuns = new Skill('basicPistols',[1105,205],['harnessElem']);
basicGuns.addText('title',icons.guns+' Basic Pistols',14);
basicGuns.addText('desc','While basic, these guns still pack a punch!');
basicGuns.addText('cost','Cost: 80 '+icons.money+' and 15 '+icons.time+' ||OR|| "Destroy one gun" and 2 '+icons.time);
basicGuns.addText('unlocks','Unlocks: '+icons.guns+' Basic Pistol');
kd.skills.push(basicGuns);

harnessElem = new Skill('harnessElem',[1305,205]);
harnessElem.addText('title',icons.guns+' Weaponizing the Elements',14);
harnessElem.addText('desc','Elemental Theory suggests that every element has a physical analog...');
harnessElem.addText('cost','Cost: 120 '+icons.money+' and 15 '+icons.time);
harnessElem.addText('unlocks','Unlocks: '+icons.guns+' Fire Round, '+icons.guns+' Shock Round and '+icons.guns+' Stun Round');
kd.skills.push(harnessElem);