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
    if (pos == null) { console.error('Error! All Skills need a position!'); return 'posErr1' } else if (typeof pos != typeof {x:0,y:0}) { console.error('Error! Skill Position should be an array!'); return 'posErr2' } else { this.pos = pos }; 
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
    this.gray = 0;

    if (this.parents != null && this.parents.length > 0) {
      var parentStatuses = [];
      for (const parent of this.parents) {
        const parent_skill = window.kd.skills.find(skill => skill.name == parent);
        console.log(parent_skill);
        if (parent_skill) {
          parentStatuses.push({gray:parent_skill.gray,complete:parent_skill.complete});
        }
      }
      let worst = [];
      for (status of parentStatuses) {
        _worst = '';
        if (_worst <= 0 && status.complete == true) {
          _worst = 0;
        }
        if (_worst <= 1 && (status.complete == 'partial' || status.complete == 'false' || status.gray == 0)) {
          _worst = 1;
        }
        if (_worst <= 2 && (status.gray == 1 || status.gray == 2)) {
          _worst = 2;
        }
        worst.push(_worst);
      }
      for (status of worst) {
        if (status > this.gray) {
          this.gray = status;
        }
      }
    }
  }
  addText(id,text,size) {
    let textSize = size || 8;
    return this.internalText.push({id:id,text:text,fontSize:textSize});
  }
  addChild(childId) {
    this.linesTo.push(childId);
  }
  draw(ctx) {
    if (this.internalText.length < 0) return;
    if (kd.debug) console.log(this.name,this.gray);
    if (this.gray == 3) return;
    if (this.gray == 2) {
      this.background == "rgb(75,75,75)";
    }

    let longest = 0;
    for (let i in this.internalText) {
      ctx.font = this.internalText[longest].fontSize + 'px fontello,"Titillium Web"';
      let oldT = kd.ctx.measureText(this.internalText[longest].text).width;
      ctx.font = this.internalText[i].fontSize + 'px fontello,"Titillium Web"';
      let newT = kd.ctx.measureText(this.internalText[i].text).width;
      if (newT > oldT) longest = i;
    }
    var text = this.internalText[longest].text;
    ctx.font = this.internalText[longest].fontSize + 'px fontello,"Titillium Web"';
    var textWidth = kd.ctx.measureText(text).width+10;
    var lineHeight = 0;
    var i=0;
    ctx.fillStyle = this.background;
    if (this.complete == "partial") {
      if (this.hoursWorkedOn && this.requirements.time) {
        ctx.fillRect(this.pos.x,this.pos.y,Math.round((this.hoursWorkedOn/this.requirements.time)*this.textWidth),this.lineHeight)
      } else {
        ctx.fillRect(this.pos.x,this.pos.y,this.textWidth/2,this.lineHeight);
      }
    } else {
      ctx.fillRect(this.pos.x,this.pos.y,this.textWidth,this.lineHeight);
    }
    ctx.fillStyle = "#000000";
    for (let text of this.internalText) {
      i++
      if (text.greyOut == true && this.grey == true) continue;
      var fontsize = text.fontSize;
      var fontface = 'fontello,"Titillium Web"';
      let curLine = lineHeight;
      lineHeight += (fontsize * 1.286);

      ctx.font = fontsize + 'px ' + fontface;

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(text.text, this.pos.x+5, this.pos.y+curLine);
    }
    this.lineHeight = lineHeight;
    this.textWidth = textWidth;
    ctx.strokeRect(this.pos.x, this.pos.y, textWidth, lineHeight+1);

    if(window.kd.debug) kd.ctx.fillText('Calculated Width: '+Math.round(textWidth),this.pos.x+5,this.pos.y+lineHeight);

    if (this.gray != 2 && this.gray != 3) {
      if (this.linesTo.length > 0) {
        for (const to of this.linesTo) {
          const to_skill = window.kd.skills.find(skill => skill.name == to);

          if (to_skill) {
            ctx.beginPath();
            ctx.moveTo(textWidth+this.pos.x, this.pos.y+(lineHeight/2));
            ctx.lineTo(to_skill.pos.x, to_skill.pos.y+(to_skill.lineHeight/2));
            ctx.lineTo(to_skill.pos.x+5,to_skill.pos.y+(to_skill.lineHeight/2)-5);
            ctx.moveTo(to_skill.pos.x, to_skill.pos.y+(to_skill.lineHeight/2));
            ctx.lineTo(to_skill.pos.x+5,to_skill.pos.y+(to_skill.lineHeight/2)+5);
            ctx.stroke();
          }
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