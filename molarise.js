//      "Molarise.me"       potential name!
//

//    JSON parsing
/*
var fs=require('fs'),
    file=fs.readFileSync('data.json'),
    data=JSON.parse(file);
*/
function getData(){
    $(document).ready(function() {
        $.getJSON('data.json', function(dataJSON) {
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
    console.log("string[i] => " + string[i])
    if (isend(string, l) == true) {
        excl = true;
        console.log("First")
    } else {
        if (isdigit(string, l+1) != true) {
            excl = true;
            console.log("Second")
        } else {
            if (isend(string, l+1) == true) {
                excl = true;                   // sticky pad
                console.log("Third")
            } else {
                if (isdigit(string, l+2) != true) { 
                    num = 1;
                    console.log("Fourth")
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
        
    };
    return result
};
//      elemt_con() 
function elemt_con(formula) {
    var excl = false,
        fn = 0,
        elemt = "",
    chem_table = {};
    while (fn < formula.length) {
        elemt = findatom(formula, fn);
        console.log("\nelemt => " + elemt)
        if (elemt == false) {
            fn += 1;
        } else {
            
            if (elemt.length == 1) {
                num = findnum(formula, fn);     //  <== FIND NUM
            } else {
                num = findnum(formula, fn+1);   //  <== FIND NUM
            };
            
            
            if (isNaN(chem_table[elemt]) == true){
                chem_table[elemt] = num;
                console.log("chemtbl => " + chem_table[elemt])                
            }
            else {
                chem_table[elemt] = parseInt(num) + parseInt(chem_table[elemt]);
                
                
            }
            if (num == 1) {
                if(phantomONE(formula, fn)){
                    fn += elemt.length
                }
                else {
                    fn += elemt.length + 1
                }
            } else {
                fn += elemt.length + num.length
            }
        };
    };
    return chem_table
};
//var fn = 0;
//console.log(findnum("NaTH", 3));
//    startfunction
function getMr(form){
    var formula = form,   // input would be here
        result = 0,
        end_value = 0,
        fn = 0,
        element = ""
        no_atoms = 0,
        mr_value = 0;
        chem_table = elemt_con(formula);
    molecularMass_sum = {};
    for (element in chem_table) {
        no_atoms = parseInt(chem_table[element]);      //could be wrong
        console.log("element => " + element)
        mr_value = data.elements[element].MolecularMass;
        result = no_atoms * mr_value;
        end_value += result;
    };
    document.getElementById("answerMr").innerHTML = end_value;
};
/*
var fs=require('fs'),
    file=fs.readFileSync('data.json'),
    data=JSON.parse(file);
getMr("He2")
*/
