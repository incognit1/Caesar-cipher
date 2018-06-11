var alph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-=~\"\'#$%&*^:<>?/!{(|)}.1234567890\,';

var output = get('#output'),
    keyElem = get('#key'),
    encodeBtn = get('#encode'),
    decodeBtn = get('#decode'),
    openBtn = get('#open'),
    saveBtn = get('#save'),
    printBtn = get('#print'),
    openInput = get('#file'),
    shiftAlph,
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

function encode() {
    var cipherText = '';

    if (checkAlph()) {
        alert('Enter the text for encryption');
        return;
    }
    //encrypt the alphabet
        for(var i = 0; i < text.length; i++) {
            if (shiftAlph[alph.indexOf(text[i])]) {
                cipherText += shiftAlph[alph.indexOf(text[i])];
            } else {
                cipherText += text[i];
            }
        }
    output.value = cipherText;
}

function decode() {
    var decipherText = '';
    if (checkAlph()) {
        alert('Enter the text for decryption');
        return;
    }

    for(var i = 0; i < text.length; i++) {
        if (shiftAlph[alph.indexOf(text[i])]) {
            decipherText += alph[shiftAlph.indexOf(text[i])];
        } else {
            decipherText += text[i];
        }
    }
    output.value = decipherText;
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

function checkAlph() {
    if (!output.value) { return true; }
    var lower;

    key = keyElem.value;
    text = output.value;

    key = key % alph.length;

    //shift the alphabet
    shiftAlph = alph.slice(key) + alph.slice(0, key);

    return false;
}

function get(selector) {
    return document.querySelector(selector);
}