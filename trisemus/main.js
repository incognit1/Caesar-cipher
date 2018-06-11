var alph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-=~\"\'#$%&*^:<>?/!{(|)}.1234567890\,';

var output = get('#output'),
    encodeBtn = get('#encode'),
    decodeBtn = get('#decode'),
    openBtn = get('#open'),
    saveBtn = get('#save'),
    printBtn = get('#print'),
    openInput = get('#file'),
    alph,
    upper,
    lower,
    text,
    methodEl = document.getElementsByName('method'),
    linearBlock = get('.linear'),
    nonLinearBlock = get('.non-linear'),
    mottoBlock = get('.motto'),
    currentMethod,
    motto;


methodEl[0].onchange = function() {
    nonLinearBlock.classList.remove("show");
    mottoBlock.classList.remove("show");
    linearBlock.classList.add("show");
    currentMethod = 1;
};

methodEl[1].onchange = function() {
    linearBlock.classList.remove("show");
    mottoBlock.classList.remove("show");
    nonLinearBlock.classList.add("show"); 
    currentMethod = 2;
};

methodEl[2].onchange = function() {
    linearBlock.classList.remove("show");    
    nonLinearBlock.classList.remove("show");
    mottoBlock.classList.add("show");
    currentMethod = 3;
};

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
    if (checkAlph()) return;

    var newText = '',
        shift,
        index,
        totalShift,
        a,
        b,
        c;

    for(var i = 0; i < text.length; i++) {

        if (currentMethod == 1) {
            a = Math.abs(get("#linear-A").value),
            b = Math.abs(get("#linear-B").value);
            shift = (a * i) + b;   
        } else if (currentMethod == 2) {
            a = Math.abs(get("#non-linear-A").value),
            b = Math.abs(get("#non-linear-B").value),
            c = Math.abs(get("#non-linear-C").value);
            shift = (a * i * i) + (b * i) + c;
        } else if (currentMethod == 3) {
            shift = alph.indexOf(motto[i % motto.length]);
        }

        if(~alph.indexOf(text[i])) {
            index = alph.indexOf(text[i]);

            if(param == 1) {
                totalShift = (index + shift) % alph.length;
            } else if(param == 2) {
                totalShift = (index + alph.length - (shift % alph.length)) % alph.length;
            }

            newText += alph[totalShift];
        }

        else if (~other.indexOf(text[i])) {
            newText += text[i];
        }

        output.value = newText;

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

function checkAlph() {
    
    if (!output.value) {
        alert('Enter the text for encryption');
        return true;
    }
    else if(!currentMethod) {
        alert('Select one of the methods');
        return true;
    }

    text = output.value;

    motto = get("#motto-Text").value;
    
    return false;
}

function get(selector) {
    return document.querySelector(selector);
}