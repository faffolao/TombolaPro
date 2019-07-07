var cartella1 = generaCartella();

$(document).ready(function(){
    $(".tabellone").html(cartella1);
    $(".tabellone2").html(generaCartella());

    $("table").on("click",".casella",function(){
        var id = $(this).attr("id");
        $("#" + id).toggleClass("casellaCoperta");
    });
});

function generaCartella(){
    var arrayNum = popolaArray();
    var s = '<table class="table table-borderless" id="tabella">'
    
    for(i=0;i<3;i++){
        s += '<tr>';
        var nBianchi = 0;
        var nNumeri = 0;

        for(j=0;j<9;j++){
            if(nBianchi < 4 && inseriscoSpazio()){
                s += '<td class="casella">&nbsp;</td>';
                nBianchi++;
            }else{
                if(nNumeri < 5){
                    var rndPos = Math.floor(Math.random() * arrayNum.length + 1);
                    var num = arrayNum.splice((rndPos - 1), 1);
                    s += '<td class="casella" id="' + num + '">' + num + '</td>';
                    nNumeri++;
                }else{
                    s += '<td class="casella">&nbsp;</td>';
                }
            }
        }

        s += '</tr>';
    }

    s += '</table>';
    return s;
}

function inseriscoSpazio(){
    return Math.floor(Math.random() * 2);
}

function popolaArray(){
    var a = new Array();
    
    for(i=0;i<90;i++){
        a[i] = i + 1;
    }

    return a;
}

function aggiungiCartella(){
    $(".tabellone2").slideToggle("slow");
}