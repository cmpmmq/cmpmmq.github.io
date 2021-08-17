// 随机函数产生答案
let kString = '1233';

// 设置游戏难度和猜数字位数

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

function clickButton(){
    sum ++;
    let iNum = document.getElementById('iNum').value;
    kString = document.getElementById('kString').value;
    const n = kString.length;

    let result = gameCaculate(n, iNum);
    let newRow = document.getElementById('gameBoard').insertRow(sum);
    newRow.insertCell(0).innerHTML = sum;
    newRow.insertCell(1).innerHTML = iNum;
    newRow.insertCell(2).innerHTML = result[0];
    newRow.insertCell(3).innerHTML = result[1];
    newRow.insertCell(4).innerHTML = kString;
}