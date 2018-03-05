var lang = {
        rus: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        eng: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    other = '-=~\"\'#$%&*^:<>?/!{(|)}.1234567890\, ';

var output = get('#output'),
    keyElem = get('#key'),
    encodeBtn = get('#encode'),
    decodeBtn = get('#decode'),
    openBtn = get('#open'),
    saveBtn = get('#save'),
    printBtn = get('#print'),
    openInput = get('#file'),
    currentLang,
    shiftLang,
    key,
    text;


encodeBtn.addEventListener('click', function() {
    encode();
}, false);

decodeBtn.addEventListener('click', function() {
    decode();
}, false);

openBtn.addEventListener('click', function () {
    file.click();
}, false);

openInput.addEventListener('change', function (e) {
    console.log(e.target.files);
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
    window.print();
}, false);

function encode() {
    var cipherText = '';
    key = keyElem.value;
    text = output.value;

    if(!text) { alert('No encryption text'); return }

    //define the alphabet
    lang: for (var alp in lang) {
        for (var k = 0; k < text.length; k++) {
            if ( !~lang[alp].indexOf(text[k]) && !~other.indexOf(text[k]) ) {
                continue lang;
            } else if( !~other.indexOf(text[k]) ){
                currentLang = lang[alp];
            }
        }
    }

    //shift the alphabet
    shiftLang = currentLang.slice(key);
    shiftLang += currentLang.slice(0, key);

    if(key > currentLang.length/2 - 1 || key < 0) {
        alert('The key must be < ' + currentLang.length/2 + ' and > 0.' + '\nFix it and try again.');
        return;
    }

    shiftLang += other;
    currentLang += other;

    //encrypt the alphabet
        for(var i = 0; i < text.length; i++) {
            if (shiftLang[currentLang.indexOf(text[i])]) {
                cipherText += shiftLang[currentLang.indexOf(text[i])];
            } else {
                cipherText += text[i];
            }
        }
    output.value = cipherText;
}

function decode() {
    var decipherText = '';
    key = keyElem.value;
    text = output.value;
    if(!text) { alert('No encryption text'); return }

    if (!currentLang) {
        lang: for (var alp in lang) {
            for (var k = 0; k < text.length; k++) {
                if ( !~lang[alp].indexOf(text[k]) && !~other.indexOf(text[k]) ) {
                    continue lang;
                } else if( !~other.indexOf(text[k]) ){
                    currentLang = lang[alp];
                }
            }
        }

        if(key > currentLang.length/2 - 1 || key < 0) {
            alert('The key must be < ' + currentLang.length/2 + ' and > 0.' + '\nFix it and try again.');
            return;
        }

        //shift the alphabet
        shiftLang = currentLang.slice(key);
        shiftLang += currentLang.slice(0, key);

        shiftLang += other;
        currentLang += other;
    }

    for(var i = 0; i < text.length; i++) {
        if (shiftLang[currentLang.indexOf(text[i])]) {
            decipherText += currentLang[shiftLang.indexOf(text[i])];
        } else {
            decipherText += text[i];
        }
    }
    output.value = decipherText;
}

// Function to download data to a file
function download(data, filename) {
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