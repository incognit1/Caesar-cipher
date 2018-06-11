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














var privateKey = [1, 3, 5, 11, 21, 44, 87, 175, 349, 701];
var sum = privateKey.reduce(function(a, publicKey) { return a + publicKey });
var modular = 1590; // more than sum
var multiplicand = 43; // coprime with q
var modularInverse = modInverse(multiplicand, modular);
var publicKey = [];
for(var i in privateKey) {
	publicKey[i] = (privateKey[i] * multiplicand) % modular;
}
function letterToBinary(letter) {
	var charNum = letter.charCodeAt() - 96;
	if (charNum < 0) {
		charNum = 0;
	}
	return parseInt(charNum, 10).toString(2);
}

function appendZeros(letter, length) {
	if (letter.length < length) {
		return (new Array(length - letter.length + 1).join('0')) + letter;
	}
	return letter;
}

function binaryToLetter(binary) {
	var i =	parseInt(binary, 2);
	return i == 0 ? ' ' : String.fromCharCode(i + 96);
}

function modInverse(a, modular) {
    a %= modular;
    for(var x = 1; x < modular; x++) {
        if((a*x) % modular == 1) return x;
    }
}

function encrypt(pubKey, message) {
	var encryptedMessage = [];
	var chunk = '';
	for(var i in message) {
		var l = letterToBinary(message[i]);
		l = appendZeros(l, 5);
		chunk+=l;
	}
	var chunkArr = chunk.match(/.{1,10}/g);
	console.log(chunkArr);
	for(var i in chunkArr) {
		var letterEncoded = 0;
		var letterBinary = chunkArr[i];
		for(var bi in letterBinary) {
			var binaryNumber = parseInt(letterBinary[bi], 2);
			letterEncoded += binaryNumber * pubKey[bi];
		}
		encryptedMessage.push(letterEncoded);
	}
	return encryptedMessage;
}

var findClosestIndex = function(priKey, number) {
	var pkFilter = [];
	for(var i in priKey) {
		if (priKey[i] <= number) {
			pkFilter[i] = priKey[i];
		}
	}
	var maxValue = pkFilter.reduce(function(a,publicKey){return a > publicKey ? a : publicKey});
	return pkFilter.indexOf(maxValue);
}
function decrypt(priKey, message, modular, modularInverse) {
	var decmessage = [];
	for(var i in message) {
		decmessage[i] = (message[i] * modularInverse) % modular;
	}
	var chunkArr = [];
	for(var i in decmessage) {
		var decMsg = decmessage[i];
		var binary = '0000000000';

		var ttt = 0;
		while (decMsg !==  0) {

			var closestIndex = findClosestIndex(priKey, decMsg);
			binary = binary.substr(0, parseInt(closestIndex, 10)) + '1' + binary.substr(parseInt(closestIndex, 10)+1);
			decMsg = priKey[closestIndex] > decMsg ? priKey[closestIndex] - decMsg : decMsg - priKey[closestIndex];
		}
		chunkArr.push(binary);
	}
	var message = '';
	chunkArr = chunkArr.join('').match(/.{1,5}/g);
	for(var i in chunkArr) {
		message += binaryToLetter(chunkArr[i]);
	}
	return message;
}


var message = 'fixed a minor error in the key generation section  and added some to the previously incredibly vague section on decryption. i hope this makes  a little more sense. there is still a lot left unexplained (modular arithmatic, how the cryptosystem was broken, etc), but at least it s a start. i know very little about the topic, but it s really interesting. anyone who knows more should totally add there insight.';
var encryptedMessage = encrypt(publicKey, message);
var decryptedMessage = decrypt(privateKey, encryptedMessage, modular, modularInverse);

console.log('Modular: ' + modular);
console.log('Multiplicand: ' + multiplicand);
console.log('Multiplicand modular inverse: ' + modularInverse);

console.log('Public key: ');
console.log(publicKey);
console.log('Private key: ');
console.log(privateKey);
console.log('Message: ' + message);
console.log('Encrypted message: ' + encryptedMessage);
console.log('Decrypted message: ' + decryptedMessage);
