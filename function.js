var txt = "";
var path = `./cat-${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getYear()+1900}.log`;
const axios = require('axios');
const fs = require('fs');


function get(response) {
    response.data.now == null ?
        txt += `${new Date().toLocaleString()} | No Data \n` : txt += `${new Date().toLocaleString()} | Song : ${response.data.now.song} Artist : ${response.data.now.name} \n`;
    fs.writeFile(path, txt, (err) => {if(err)console.log(err);});
    console.log(path.split('./')[1] + " was saved on " + new Date().toLocaleString() + " !");
}

function fetchData() {
    axios.get('http://thisiscat.com/now.php')
        .then((response) => {get(response);})
        .catch((err) => {
            txt += `${new Date().toLocaleString()} | Error : ${err}`;
            console.log(err);
        });
}
function main() {
    fs.readFile(path,
        function (err, data) {
          if (err) {console.log(err);} else {txt = data;}
        });
    fetchData();
    setInterval(fetchData, 60000);
}

module.exports = {
    main
};