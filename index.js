const canvas = document.getElementById('canvas');
window.kd.ctx = canvas.getContext('2d');
window.kd.debug = false;

window.kd.icons = {
  inspiration: "\ue801",
  money: "\uf0d6",
  time: "\ue800",
  chemistry: "\uf0c3",
  smithing: "\ue802",
  science: "\uf50d",
  alert: "\ue803",
  guns: "\ue804"
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**let skills = [
  new Skill('skill1',[100, 100],['skill2', 'skill3']),
  new Skill('skill2',[50, 200],['skill4']),
  new Skill('skill3',[150, 200],['skill4']),
  new Skill('skill4',[100,300])
];**/

class Skill {
  constructor(name,pos,linesTo,complete,hoursWorkedOn,requirements,texts) {
    if (name == null) { console.error('Error! All Skills need a name!'); return 'nameErr1' } else {this.name = name};
    if (pos == null) { console.error('Error! All Skills need a position!'); return 'posErr1' } else if (typeof pos != typeof [100,100]) { console.error('Error! Skill Position should be an array!'); return 'posErr2' } else { this.pos = pos }; 
    this.linesTo = linesTo || [];
    this.background = "rgba(255,255,255,255)";
    if (complete == true) {
      this.background = "rgba(0,255,0,100)";
    } else if (complete == "partial") {
      this.background = "rgba(255,255,0,100)";
    }
    this.complete = complete || false;
    this.hoursWorkedOn = hoursWorkedOn;
    this.requirements = requirements;
    this.internalText = texts||[];
    this.lineHeight = 0;
  }
  addText(id,text,size) {
    let textSize = size || 8;
    return this.internalText.push({id:id,text:text,fontSize:textSize});
  }
  addChild(childId) {
    this.linesTo.push(childId);
  }
  draw(ctx) {
    let longest = 0;
    for (let i in this.internalText) {
      kd.ctx.font = this.internalText[longest].fontSize + 'px fontello,"Titillium Web"';
      let oldT = kd.ctx.measureText(this.internalText[longest].text).width;
      kd.ctx.font = this.internalText[i].fontSize + 'px fontello,"Titillium Web"';
      let newT = kd.ctx.measureText(this.internalText[i].text).width;
      if (newT > oldT) longest = i;
    }
    var text = this.internalText[longest].text;
    kd.ctx.font = this.internalText[longest].fontSize + 'px fontello,"Titillium Web"';
    var textWidth = kd.ctx.measureText(text).width+10;
    var lineHeight = 0;
    var i=0;
    kd.ctx.fillStyle = this.background;
    if (this.complete == "partial") {
      if (this.hoursWorkedOn && this.requirements.time) {
        kd.ctx.fillRect(this.pos[0],this.pos[1],Math.round((this.hoursWorkedOn/this.requirements.time)*this.textWidth),this.lineHeight)
      } else {
        kd.ctx.fillRect(this.pos[0],this.pos[1],this.textWidth/2,this.lineHeight);
      }
    } else {
      kd.ctx.fillRect(this.pos[0],this.pos[1],this.textWidth,this.lineHeight);
    }
    kd.ctx.fillStyle = "#000000";
    for (let text of this.internalText) {
      i++
      var fontsize = text.fontSize;
      var fontface = 'fontello,"Titillium Web"';
      let curLine = lineHeight;
      lineHeight += (fontsize * 1.286);

      kd.ctx.font = fontsize + 'px ' + fontface;

      kd.ctx.textAlign = 'left';
      kd.ctx.textBaseline = 'top';
      kd.ctx.fillText(text.text, this.pos[0]+5, this.pos[1]+curLine);
    }
    this.lineHeight = lineHeight;
    this.textWidth = textWidth;
    kd.ctx.strokeRect(this.pos[0], this.pos[1], textWidth, lineHeight);

    if(window.kd.debug) kd.ctx.fillText('Calculated Width: '+Math.round(textWidth),this.pos[0]+5,this.pos[1]+lineHeight);

    if (this.linesTo.length > 0) {
      for (const to of this.linesTo) {
        const to_skill = window.kd.skills.find(skill => skill.name == to);

        if (to_skill) {
          kd.ctx.beginPath();
          kd.ctx.moveTo(textWidth+this.pos[0], this.pos[1]+(lineHeight/2));
          kd.ctx.lineTo(to_skill.pos[0], to_skill.pos[1]+(to_skill.lineHeight/2));
          kd.ctx.stroke();
        }
      }
    }
  }
}

let dragging = false;
let position = [0, 0];
let previous_position = [0, 0];
let drag_position = [0, 0];
let zoom = 2;

document.addEventListener('mousedown', e => {
	dragging = true;
  previous_position[0] = position[0];
  previous_position[1] = position[1];
  drag_position[0] = e.clientX;
  drag_position[1] = e.clientY;
});

document.addEventListener('mousemove', e => {
	if (dragging) {
  	position[0] = previous_position[0] - (drag_position[0] - e.clientX);
    position[1] = previous_position[1] - (drag_position[1] - e.clientY);
  }
})

document.addEventListener('mouseup', e => {
	dragging = false;
})

document.addEventListener('wheel', e => {
	zoom = zoom * (1 + (-e.deltaY / 50)*0.1);
});

const draw = () => {
  window.requestAnimationFrame(draw);
  
  kd.ctx.setTransform(1, 0, 0, 1, 0, 0);
  kd.ctx.translate(position[0], position[1]);
  kd.ctx.scale(zoom, zoom);

  kd.ctx.clearRect(-100, -100, Math.abs(position[0]+1)*canvas.width+100, Math.abs(position[1]+1)*canvas.height+100);
  
  //console.log(position);

  kd.ctx.font = '24px fontello,"Titillium Web"'

  kd.ctx.fillStyle = "#000000";
  kd.ctx.fillText(kd.icons.chemistry+" Main Tech Tree",10,10);
  kd.ctx.fillStyle = "rgba(0,"+175+","+175+",255)";
  kd.ctx.fillText(kd.icons.chemistry,10,10);

  kd.ctx.fillStyle = "#000000";

  kd.ctx.font = '10px fontello,"Titillium Web"'
  kd.ctx.fillText(kd.icons.alert+"  Talk to Kd if you are unsure what an unlockable does!",11,42);
  kd.ctx.fillText(kd.icons.alert+"  Click and drag to see more techs!",11,57);
  kd.ctx.fillText(kd.icons.alert+"  What do icons mean??",11,72);
  
  kd.ctx.fillStyle = "rgba(250,0,0,100)";
  kd.ctx.fillText(kd.icons.alert,11,42);
  kd.ctx.fillText(kd.icons.alert,11,57);
  kd.ctx.fillText(kd.icons.alert,11,72);
  
  kd.ctx.fillStyle = "#000000";

  kd.ctx.font = '8px fontello,"Titillium Web"'
  kd.ctx.fillText("    "+kd.icons.time+       "   ==> Hour(s)",11,87);
  kd.ctx.fillText("    "+kd.icons.inspiration+"   ==> Inspiration Point(s)",11,102);
  kd.ctx.fillText("    "+kd.icons.money+      "   ==> Gold",11,117);

  if (window.kd.skills != undefined) {
    if (window.kd.skills.length > 0) {
      for (const skill of window.kd.skills) {
        skill.draw(kd.ctx);
      }
    }
  }
};

draw();