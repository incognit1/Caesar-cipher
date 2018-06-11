var output = get('#output'),
    encryptBtn = get('#encrypt'),
    decryptBtn = get('#decrypt'),
    openBtn = get('#open'),
    openBookBtn = get('#openBtn'),
    saveBtn = get('#save'),
    printBtn = get('#print'),
    openInput = get('#file'),
    openBook = get('#book'),
    text,
    bookText,
    lostSymb = '';

encryptBtn.addEventListener('click', function () {
    encrypt();
}, false);

decryptBtn.addEventListener('click', function () {
    decrypt();
}, false);

openBtn.addEventListener('click', function () {
    file.click();
}, false);

openBookBtn.addEventListener('click', function () {
    book.click();
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

openBook.addEventListener('change', function (e) {
    var file = e.target.files[0],
        reader = new FileReader();

    reader.readAsText(file);

    // When this event is activated, the data is ready.
    reader.onload = function (e) {
        bookText = e.target.result;
        console.log(e.target.result);
        get("#openBtn").innerHTML = openBook.files[0].name;
    };
}, false);

saveBtn.addEventListener('click', function () {
    download(output.value, 'text.txt');
}, false);

printBtn.addEventListener('click', function () {
    if (!output.value) return;
    window.print();
}, false);

function encrypt() {
    parse();

    var cipherText = '',
        equals = [],
        counter,
        position;

    text = output.value;

    for (var i = 0; i < text.length; i++) {
        textSymbol = text[i];
        counter = 0;

        for (var k = 0; k < bookText.length; k++) {
            for (var j = 0; j < bookText[k].length; j++) {
                if ((textSymbol === bookText[k][j])) {
                    equals[counter] = (k) + '/' + (j);
                    counter++;
                }
            }
        }

        position = Math.floor(Math.random() * (counter - 1));
        if (i === text.length - 1 && counter !== 0) {
            cipherText += equals[position];
        } else if (counter !== 0) {
            cipherText += equals[position] + ', ';
        }

        if (counter === 0) {
            lostSymb += text[i] + ', ';
        }
    }

    if (cipherText[cipherText.length - 1] == " ") {
        cipherText = cipherText.substr(0, cipherText.length - 2);
    }

    checkError();
    output.value = cipherText;
}

function decrypt() {

    parse();
    var decipherText = '',
        symbols = [],
        coordinate = [];

    text = output.value;
    symbols = text.split(', ');

    for (var i in symbols) {
        coordinate[i] = symbols[i].split('/')
    }
    for (var s = 0; s < symbols.length; s++) {
        decipherText += bookText[coordinate[s][0]][coordinate[s][1]];
    }
    return output.value = decipherText;;

}

function parse() {
    if (typeof (bookText) === 'string') {
        bookText = bookText.split('\n');
        console.log(typeof (bookText))
    }
    else return;
}

function checkError() {
    if (lostSymb) {
        alert('Ошибка! Указанные символы отсутствуют: ' + lostSymb);
        lostSymb = '';
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