//DESSIN CERCLE CHARGEMENT

function dessinCercleFLAT(cible,pourcentage){
 var dateActu = new Date();
 timeActu= dateActu.getTime();
 
 var bg = cible;
 var ctx = bg.getContext('2d');
 // netoyage du canvas existant
 var w = _("alveoles_chargement").width;
 var h = _("alveoles_chargement").offsetHeight;
 var cote = w/3;
 _("canvasProgressSimple").width=_("canvasProgressSimple").height=cote+2;
 _("canvasProgressSimple").style.top=(20 + h/2 - cote/2)+'px';
 _("canvasProgressSimple").style.left='calc(50% - '+cote/2+'px)';
 ctx.clearRect ( 0 , 0 , cote , cote );
 // definition d'un cercle complet
 var circ = Math.PI * 2;
 var quart = Math.PI / 2;
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#e1ffbc';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, 0, circ, false);
 ctx.stroke();
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#99e144';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.shadowOffsetY = 0;
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, -(quart), ((circ) * pourcentage/100) - quart, false);
 ctx.stroke();
 
 ctx.font = "bold "+(cote/8)+"pt Calibri,Geneva,Arial";
 ctx.textAlign = 'center';
 ctx.fillStyle = "#000000";
 ctx.fillText(pourcentage+'%', cote/2, cote/2+cote/20);
 ctx.shadowBlur = 0; 

};
