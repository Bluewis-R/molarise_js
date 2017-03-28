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
//    finding if there is a 1 after an atom
function isexcl(string, i){
    var excl = false,
        l = i + 1,   
        m = i + 1;
    if (isend(string, l-1) == true) {
        excl = true;
    };
    if (isdigit(string, l) != true) {
      excl = true;
    };
    return excl
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
function findnum(string, i) {
        result = 1;
    } else {
        result = string.substr(i+1, num);
    };
    return result
};
function elemt_con(formula) {
    chem_table = {};
    while (fn < formula.length) {
        elemt = findatom(formula, fn);
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
                fn += elemt.length + num.toString().length;
            };
                fn += elemt.length + num.length
            }
        };
    };
    return chem_table
function getMr(form){
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

//getmr()