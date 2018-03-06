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
    keyRange = get('#rangeKey'),
    shiftP = get('#shift'),
    unshiftP = get('#unshift'),
    currentLang,
    upper,
    upperShift,
    shiftLang,
    key,
    text;

keyRange.addEventListener('input', function (e) {
    keyElem.innerHTML = keyRange.value;

    if(checkAlph()) return;
    unshiftP.style.display = 'block';
    shiftP.style.display = 'block';
}, false);

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
    if (checkAlph()) {
        alert('Enter the text for decryption');
        return;
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
    if (!output.value) {

        return true;
    }
    var lower;

    key = keyRange.value;
    text = output.value;

    //define the alphabet
    label: for (var alp in lang) {
        for (var k = 0; k < text.length; k++) {
            if ( !~lang[alp].indexOf(text[k]) && !~other.indexOf(text[k]) ) {
                continue label;
            } else if( !~other.indexOf(text[k]) ){
                currentLang = lang[alp];
            }
        }
    }

    keyRange.setAttribute('max', currentLang.length/2-1);

    //shift the alphabet
    lower = currentLang.substring(0, currentLang.length/2);
    upper = currentLang.substring(currentLang.length/2, currentLang.length);

    upperShift = upper.slice(key) + upper.slice(0, key);

    unshiftP.innerHTML = upper;
    shiftP.innerHTML = upperShift;

    shiftLang = lower.slice(key);
    shiftLang += lower.slice(0, key) + upperShift;

    shiftLang += other;
    currentLang += other;
    return false;
}

function get(selector) {
    return document.querySelector(selector);
}