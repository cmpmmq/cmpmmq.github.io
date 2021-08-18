let times = 0;      // 游戏盘数

// 产生n位随机数
function getRandom(n){
    let kNum, kString = new Array();
    if(document.getElementById("isRepeatY").checked){
        do{
            kNum = parseInt(Math.random()*Math.pow(10,n));
        }
        while(kNum < Math.pow(10, n-1));
        return kNum.toString();
    }else{
        const bookNum = new Array(10);
        for (j=0; j<10; j++){
            bookNum[j] = j;
        }
        bookNum.sort(function() {
            return (0.5-Math.random());
        });
        kString = bookNum.join("");
        if(kString.charAt() == '0'){
            return kString.substring(1, n+1);
        } else{
            return kString.substring(0, n);
        }
    }
}

// 设置游戏难度和猜数字位数
// btn onclick
function gameGenerate(){
    if(document.getElementById("n").reportValidity()){
        const n = Number(document.getElementById('n').value);
        kString = getRandom(n);     // 产生n位数的答案

        // 是否内测
        // document.getElementById('kString').value = kString;
        // document.getElementById('gameDisplay').innerHTML = '答案已生成，游戏开始';
        
        console.log(kString);       // 后台答案
        
        // 游戏界面调整
        document.getElementById("guessBoard").style.display = "block";   // 显示猜数字板
        document.getElementById("answerBoard").style.display = "none";  // 禁用难度板
        document.getElementById("levelDisplay").innerHTML = `已成功加载游戏难度为 ${n} 位数的游戏，开始挑战！`;
        document.getElementById("newGame").value = "重新开始";

        // 限定游戏板 输入的数字范围
        document.getElementById("iString").min = Math.pow(10, n-1);
        document.getElementById("iString").max = Math.pow(10, n)-1;
    } else{
        document.getElementById("n").value = 3;
    }
}

// 游戏玩耍的计分
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
    
    /*算法的测试 后台运行
        console.log(keyNum);
        console.log(inputNum);
        console.log(bookKey);
        console.log(bookInput);
        console.log(`a = ${result[0]}`);
        console.log(`b = ${result[1]}`);*/

    return result;
}


let sum = 0;

// 获得游戏输入
// btn onclick
function guessNumber(){
    const n = Number(document.getElementById('n').value);
    const iString = document.getElementById('iString').value;
    // kString = document.getElementById('kString').value;
    
    const isRepeat = document.getElementById("isRepeatY").checked.toString();      // 提交答案难度

    // 合法输入
    if(document.getElementById("iString").reportValidity()){
        sum ++;
        let result = gameCaculate(n, iString);      // 获得游戏计分反馈
        let newRow = document.getElementById('gameBoard').insertRow(sum);
        newRow.insertCell(0).innerHTML = sum;
        newRow.insertCell(1).innerHTML = iString;
        newRow.insertCell(2).innerHTML = result[0];
        newRow.insertCell(3).innerHTML = result[1];
        // newRow.insertCell(4).innerHTML = kString;

        if(kString == iString){
            document.getElementById("gameResult").innerHTML = "恭喜你猜对了，还剩几根头发？";
            document.getElementById("newGame").value = "再来一局"
            times ++;

            document.getElementById("scoreBoard").style.display = "block";
            let newScore = document.getElementById('scoreBoard').insertRow(times);
            newScore.insertCell(0).innerHTML = times;
            newScore.insertCell(1).innerHTML = n;
            newScore.insertCell(2).innerHTML = isRepeat.toString();
            newScore.insertCell(3).innerHTML = kString;
            newScore.insertCell(4).innerHTML = sum;
        }
    }
    
    document.getElementById("iString").value = "";
    document.getElementById("iString").placeholder = iString;
}

// initialization
// btn onclick
function newGame(){
    document.getElementById("guessBoard").style.display = "none";   // 显示猜数字板
    document.getElementById("answerBoard").style.display = "block";  // 禁用难度板
    document.getElementById("levelDisplay").innerHTML = "";     // 取消游戏难度提示板
    for(i=1; i<=sum; i++){
        document.getElementById("gameBoard").deleteRow(1);
    }
    document.getElementById("gameResult").innerHTML = "";
    sum = 0;    // 计次归零
}