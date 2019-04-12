var txt = "";
var path = `./cat-${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getYear()+1900}.log`;
const axios = require('axios');
const fs = require('fs');
const CFonts = require('cfonts');

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

function welcome() {
    CFonts.say('Cat Listening History', {
        font: 'chrome', // define the font face
        align: 'center', // define text alignment
        colors: ['white'], // define all colors
        background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1, // define letter spacing
        lineHeight: 1, // define the line height
        space: true, // define if the output text should have empty lines on top and on the bottom
        maxLength: '0', // define how many character can be on one line
    });
}

function main() {
    welcome();
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