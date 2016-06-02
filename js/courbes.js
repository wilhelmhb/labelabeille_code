var courbesTest=[

                 {
                    "id":1,
                    "name":"Masse (kg)"
                 },
                 {
                    "id":2,
                    "name":"Température (°C)"
                 },
                 {
                    "id":3,
                    "name":"Luminosité (lux)"
                 }
];


var courbe=1;
var courbes;

function goToGraphs(idHive){
    getCourbes(function(data) {
               
               
               
               
               var template = $(templates).filter('#tpl-courbes').html();
               var d = {courbes:courbesTest};
               var h = Mustache.render(template, d);
               document.getElementById("content-courbes").innerHTML = h;
               courbes=data;
               transition(_("pcourbes"), "slide");

               slider_courbes = new PageSlider($("#conteneur-courbe"),$("#courbe"+courbe),$("#reserve-courbes"),"page");
               nbCourbes=data.length;
               $("#courbe"+courbe).appendTo("#conteneur-courbe");

               allerCourbe(courbe);
               
               
               },idHive);
}

function getCourbes(action,idHive){
    data=courbesTest;
    action(data);
}


function allerCourbe(k){
    
    $("#sous_titre_courbes").children("h1").html(courbes[k-1].name);
    var change=false;
    if(courbe!=k){change=true;}
    left=courbe>k;
    courbe=k;
    
    if(change)slider_courbes.slidePageFrom($("#courbe"+courbe),(left?"left":"right"));
    if(courbe==1)$("#nav_gauche_courbes").css("visibility","hidden");
    else $("#nav_gauche_courbes").css("visibility","visible");
    if(courbe==nbCourbes)$("#nav_droite_courbes").css("visibility","hidden");
    else $("#nav_droite_courbes").css("visibility","visible");
    
    
    $("#nav_gauche_courbes").off("click");
    $("#nav_droite_courbes").off("click");
    function courbePrecedent(){if(courbe>1)allerCourbe(courbe-1);}
    function courbeSuivant(){if(courbe<nbCourbes)allerCourbe(courbe+1);}
    $("#nav_gauche_courbes").click(courbePrecedent);
    $("#nav_droite_courbes").click(courbeSuivant);
    
    var element = document.getElementById('courbe'+courbe);
    Hammer(element).off("swipeleft");
    Hammer(element).off("swiperight");
    Hammer(element).on("swipeleft", courbeSuivant);
    Hammer(element).on("swiperight", courbePrecedent);
    
    
    var MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    
    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
        //return 0;
    };
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };
    
    var config = {
    type: 'line',
    data: {
    labels: ["Janvier","Février","Mars","Avril","Mai","Juin"],
    datasets: [{
               label: "",
               data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
               fill: true,
               borderDash: [0, 0],
               }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    title:{
    display:true,
    text:'Chart.js Line Chart'
    },
    tooltips: {
    mode: 'label',
    callbacks: {
        // beforeTitle: function() {
        //     return '...beforeTitle';
        // },
        // afterTitle: function() {
        //     return '...afterTitle';
        // },
        // beforeBody: function() {
        //     return '...beforeBody';
        // },
        // afterBody: function() {
        //     return '...afterBody';
        // },
        // beforeFooter: function() {
        //     return '...beforeFooter';
        // },
        // footer: function() {
        //     return 'Footer';
        // },
        // afterFooter: function() {
        //     return '...afterFooter';
        // },
    }
    },
    hover: {
    mode: 'dataset'
    },
    scales: {
    xAxes: [{
            display: true,
            scaleLabel: {
            show: true,
            labelString: 'Month'
            }
            }],
    yAxes: [{
            display: true,
            scaleLabel: {
            show: true,
            labelString: 'Value'
            },
            ticks: {
            suggestedMin: -10,
            suggestedMax: 250,
            }
            }]
    }
    }
    };
    
    $.each(config.data.datasets, function(i, dataset) {
           dataset.borderColor = randomColor(0.4);
           dataset.backgroundColor = randomColor(0.5);
           dataset.pointBorderColor = randomColor(0.7);
           dataset.pointBackgroundColor = randomColor(0.5);
           dataset.pointBorderWidth = 1;
           });
    
        var ctx = document.getElementById("canvas"+courbe).getContext("2d");
        window.myLine = new Chart(ctx, config);

    

    
}