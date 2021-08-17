// 随机函数产生答案
function getRandom(n){
    let kNum;
    do{
        kNum = parseInt(Math.random()*Math.pow(10,n));
    }
    while(kNum < Math.pow(10, n-1));

    return kNum.toString();
}

// 设置游戏难度和猜数字位数
// btn onclick
function gameGenerate(n){
    n = Number(document.getElementById('n').value);
    kString = getRandom(n);
    // document.getElementById('kString').value = kString;
    // document.getElementById('gameDisplay').innerHTML = '答案已生成，游戏开始';
    console.log(kString);
}

// btn onclick
function gameCaculate(n, iString){
    // 计分
    let result = [0,0];

    const keyNum = new Array(n);
    const inputNum = new Array(n);
    const bookKey = new Array(10);
    const bookInput = new Array(10);

    for (j = 0; j < 10; j ++){
        bookKey[j] = 0;
        bookInput[j] = 0;
    }
    
    for (i = 0; i < n; i ++){
        keyNum[i] = Number(kString[i]);
        inputNum[i] = Number(iString[i]);
    
        bookKey[keyNum[i]]++;
        bookInput[inputNum[i]]++;
    
        if(kString[i] == iString[i]){
            result[0] ++;
        }
    }
    
    for(j = 0; j < 10; j++){
        if(bookKey[j]){
            result[1] += bookInput[j];
        }
    }
    
    console.log(keyNum);
    console.log(inputNum);
    console.log(bookKey);
    console.log(bookInput);
    console.log(`a = ${result[0]}`);
    console.log(`b = ${result[1]}`);

    return result;
}


let sum = 0;

function guessNumber(){
    sum ++;
    let iString = document.getElementById('iNum').value;
    // kString = document.getElementById('kString').value;
    const n = Number(document.getElementById('n').value);
    

    let result = gameCaculate(n, iString);
    let newRow = document.getElementById('gameBoard').insertRow(sum);
    newRow.insertCell(0).innerHTML = sum;
    newRow.insertCell(1).innerHTML = iString;
    newRow.insertCell(2).innerHTML = result[0];
    newRow.insertCell(3).innerHTML = result[1];
    // newRow.insertCell(4).innerHTML = kString;

    if(kString == iString){
        document.getElementById("gameResult").innerHTML = "恭喜你猜对了";
    }
}