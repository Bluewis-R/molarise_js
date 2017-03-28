function isdigit(string, i){
  if (isNaN(string.substr(i, 1)) == false) {
      digres = true
  } else {
      digres = false
  };
  return digres
};
string = "a"
console.log(isdigit(string.substr("Na", 1)))