var alph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-= ~\"\'#$%&*^:<>?/!{(|)}.1234567890\, ';

var outputElem = get('#output'),
    encodeBtn = get('#encode'),
    decodeBtn = get('#decode'),
    openBtn = get('#open'),
    saveBtn = get('#save'),
    printBtn = get('#print'),
    openInput = get('#file'),
    alph,
    text,
    key = get('#key-Text');


encodeBtn.addEventListener('click', function() {
    changeText(1);
}, false);

decodeBtn.addEventListener('click', function() {
    changeText(2);
}, false);

openBtn.addEventListener('click', function () {
    file.click();
}, false);

openInput.addEventListener('change', function (e) {
    var file = e.target.files[0],
        reader = new FileReader();

    reader.readAsText(file);

    // When this event is activated, the data is ready.
    reader.onload = function (e) {
        output.value = e.target.result;
    };
}, false);

saveBtn.addEventListener('click', function() {
    download(output.value, 'text.txt');
}, false);

printBtn.addEventListener('click', function () { 
    if (!output.value) return;
    window.print();
}, false);

function changeText(param) {
    var output = '',
        text = outputElem.value,
        choose = param;
    var seedKey = key.value;
    var seed = new Math.seedrandom(seedKey);

function randomString() {
  var result = '';
  var max_position = alph.length - 1;
  for( i = 0; i < text.length; ++i ) {
    position = Math.floor (seed() * max_position );
    result += alph.substring(position, position + 1);
  }
  return result;
}
var gama = '';       
gama = randomString();
var Num;
var shift;
for (var i=0;i<text.length; i++) {
  let now = text[i];
  Num = alph.indexOf(now);
  gamaSymbol = gama[i % gama.length];
  shift = alph.indexOf(gamaSymbol);
  var valid =true;
  if(Num>=0) {   
        if(choose === 1) {
          var k = (Num + shift) % alph.length;
        } else if (choose === 2) {
          var k = (Num + alph.length-(shift % alph.length)) % alph.length;
        }
        output += alph[k];
    }   else {
      alert('Ошибка валидации. Введите правельные данные');
      valid = false
      }
  }
  if (valid === false){
    return text;
  }  else {
        console.log(output);
        return get('#output').value = output;
    }

}


// Function to download data to a file
function download(data, filename) {
    if (!output.value) return;
    var file = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
            url = URL.createObjectURL(file); // Experimental technology, IE -
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

function get(selector) {
    return document.querySelector(selector);
}