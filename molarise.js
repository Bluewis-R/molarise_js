//      Molarise.me       potential name!
//

//    JSON parsing

//var fs=require('fs'),
//    file=fs.readFileSync('data.json'),
//    data=JSON.parse(file);
var inputstart = true;



function findMr() {
    myinput = document.getElementById('inputMr').value;
    
    if ( myinput == 'lewis' ){                          // easter egg
        $('body').css("background-color", "#FFDF00");
        $('body').css("color", "#000000");
    } else if ( myinput == 'reset' ){
        $('body').css("background-color", "#2A5673");
        $('body').css("color", "#D3DDE6");
    } else {
    }
    
    $( "#the_log" ).empty();
    getMr(myinput);
    $('#answerMr').css('color','#ffffff')

}

function resetinput() {
    if (inputstart == true) {
        inputstart = false;
        $('#inputMr').val('');
        $('#answerMr').empty();
    }
}

function getData(){
    $(document).ready(function() {
        $.getJSON('/libraries/data.json', function(dataJSON) {
            data = dataJSON;
        });
    });
    return data
};
//  isend function
function isend(string ,i) {
    var endres = true;
    if (i >= string.length) {
        endres = true;
    } else {
        endres = false;
    };
    return endres;
};
//  find digit function(
function isdigit(string, i){
  if (isNaN(string.substr(i, 1)) == false) {
      digres = true
  } else {
      digres = false
  };
  return digres
};
//  finding the atom
function findatom(string, i) {
    if (isend(string, i) == true) {
        res = string.substr(i, 1);
    } else {
        if (isNaN(string.substr(i+1, 1)) == true) {
            if (string.substr(i+1, 1) == string.substr(i+1, 1).toLowerCase()) {      //add some kind of number thing
                res = string.substr(i, 2);
            } else {
                res = string.substr(i, 1);
            };
        } else {
            res = string.substr(i, 1);
        };
    };
    return res
};
// finds the number after the element
function findnum(string, i) {
    var excl = false,
        num = 0,
        result = 0,
        l = i;
    if (isend(string, l) == true) {
        excl = true;
    } else {
        if (isdigit(string, l+1) != true) {
            excl = true;
        } else {
            if (isend(string, l+1) == true) {
                excl = true;                   // sticky pad
            } else {
                if (isdigit(string, l+2) != true) { 
                    num = 1;
                } else {
                    if (isend(string, l+2) == true) {
                        num = 2;
                    } else {
                        if (isdigit(string, l+3) != true) {
                            num = 2;
                        } else {
                            num = 3;
                        };
                    };
                };
            };
        };
    };
    if (excl == true) {
        result = 1;
    } else {
        result = string.substr(i+1, num);
    }
    return result
}

function elemt_con(formula) {
    chem_table = {};
    fn = 0;
    while (fn < formula.length) {
        elemt = findatom(formula, fn);
        if (elemt == false) {
            fn += 1;
        } else {
            if (elemt.length == 1) {
                num = findnum(formula, fn);             //  <== FIND NUM
            } else {
                num = findnum(formula, fn+1);           //  <== FIND NUM
            };
            if (isNaN(chem_table[elemt]) == true){
                chem_table[elemt] = parseInt(num);
                
            } else {
                chem_table[elemt] = parseInt(num) + parseInt(chem_table[elemt]);
            };
            a = Number(elemt.length);
            b = Number(num.length);
            if (num == 1) {
                if(isdigit(formula, fn+1) == false) {
                    fn += a
                }
                else {
                    fn = fn + a + Number(1);            // error here
                }
            } else {
                fn = fn + a + b;
            };
        }
    };
    return chem_table
};
                    
function getMr(form) {
    var end_value = 0;
    chem_table = elemt_con(form);
    molecularMass_sum = {};
    for (element in chem_table) {
        no_atoms = parseInt(chem_table[element]);      //could be wrong
        mr_value = data.elements[element].MolecularMass;
        result = no_atoms * mr_value;
        end_value += result;
    };
    document.getElementById("answerMr").innerHTML = end_value;
};



