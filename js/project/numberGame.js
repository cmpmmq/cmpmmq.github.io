let times = 0;      // 游戏盘数

// object and arrays
const newGame = {};
let eachGames = [
    {
        id: -1,
        n: 3,
        isRepeat: false,
        kString: '493',
        eachGuesses: [
            {
                iString: '123',
                result: [1, 1]
            }
        ],
        time: "/样例数据"
    },
    {
        id: 0,
        n: 4,
        isRepeat: true,
        kString: '3173',
        eachGuesses: [
            {
                iString: '1234',
                result: [0, 2]
            }
        ],
        time: "/样例数据"
    }
];


// localStorage.setItem("eachGames", JSON.stringify(eachGames));
// eachGames = localStorage.getItem("eachGames");


// 产生n位isRepeat随机数
function getRandom(n, isRepeat){
    let kNum, kString = new Array();
    if(isRepeat){
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
function gameGenerateClick(){
    if(document.getElementById("n").reportValidity()){
        // 读取并统一保存数据
        newGame.id = eachGames.length - 1;
        newGame.n = Number(document.getElementById('n').value);
        newGame.isRepeat = document.getElementById("isRepeatY").checked;
        newGame.kString = getRandom(newGame.n, newGame.isRepeat);
        newGame.eachGuesses = [];
        const {n, isRepeat, kString} = newGame;
        console.log(kString);       // 后台答案

        // 游戏界面调整
        document.getElementById("guessBoard").style.display = "block";   // 显示猜数字板
        document.getElementById("answerBoard").style.display = "none";  // 禁用难度板
        document.getElementById("guessDisplay").style.display = "block";    // btns
        document.getElementById("times").innerHTML = eachGames.length - 1;
        document.getElementById("nDisplay").innerHTML = n;
        const isRepeatY = isRepeat? "可能有" : "一定无";
        document.getElementById("isRepeatDisplay").innerHTML = isRepeatY;

        // 限定游戏板 输入的数字范围
        document.getElementById("iString").min = Math.pow(10, n-1);
        document.getElementById("iString").max = Math.pow(10, n)-1;
    } else{ document.getElementById("n").value = 3;}
}

// n位iString输入，游戏玩耍的计分，得到result(2)
function gameCaculate(n, iString){
    const {kString} = newGame;
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
    
    // 关于 result[1] 的真正含义
    for(j = 0; j < 10; j++){
        if(bookKey[j]){
            result[1] += Math.min(bookInput[j], bookKey[j]);
        }
    }
    
    return result;
}

// 写入表格该局eachGames[].eachGuesses 第n次数据，到第n行
function tableWriteGame(eachGuesses, n){
    let newRow = document.getElementById('gameDisplay').insertRow(n);
    newRow.insertCell(0).innerHTML = n;
    newRow.insertCell(1).innerHTML = eachGuesses[n-1].iString;
    newRow.insertCell(2).innerHTML = eachGuesses[n-1].result[0];
    newRow.insertCell(3).innerHTML = eachGuesses[n-1].result[1];
}

// 写入表格第n局游戏得分
function tableWriteScore(eachGames){
    const {id, n, isRepeat, kString, eachGuesses} = eachGames;
    let newScore = document.getElementById('scoreDisplay').insertRow(id+2);
    newScore.insertCell(0).innerHTML = id;
    newScore.insertCell(1).innerHTML = n;
    newScore.insertCell(2).innerHTML = isRepeat.toString();
    newScore.insertCell(3).innerHTML = kString;
    newScore.insertCell(4).innerHTML = eachGuesses.length;
    // newScore.insertCell(5).innerHTML = time;
    // newScore.insertCell(6).innerHTML = "...";
}
tableWriteScore(eachGames[0]);
tableWriteScore(eachGames[1]);

// 游戏输入后触发
function guessNumberClick(){
    const {n, kString, eachGuesses} = newGame;
    if(document.getElementById("iString").reportValidity()){
        const newGuess = {};
        newGuess.iString = document.getElementById('iString').value;
        newGuess.result = gameCaculate(n, newGuess.iString);
        const {iString} = newGuess;
        eachGuesses.push(newGuess);
        tableWriteGame(eachGuesses, eachGuesses.length);

        if(kString == iString){
            document.getElementById("gameResult").style.display = "block";
            document.getElementById("guessBoard").style.display = "none";
            document.getElementById("guessDisplay").style.display = "none";
            eachGames.push(newGame);

            document.getElementById("scoreDisplay").style.display = "block";
            tableWriteScore(newGame);
        }
    }
    document.getElementById("iString").value = "";
}

function newGameClick(){
    document.getElementById("gameResult").style.display = "none";
    document.getElementById("scoreDisplay").style.display = "none";
    document.getElementById("answerBoard").style.display = "block";
    document.getElementById("guessDisplay").style.display = "none";
    document.getElementById("guessBoard").style.display = "none";
    document.getElementById("times").innerHTML = eachGames.length - 2;
    document.getElementById("timesDisplay").innerHTML = eachGames.length - 2;
    
    const deleteRows = document.getElementById("gameDisplay").rows.length;
    for(i=1; i<deleteRows; i++){
        document.getElementById("gameDisplay").deleteRow(1);
    }
}

function restartClick(){
    const feedback = confirm("重设难度将会丢失当前进度，确认吗？");
    if(feedback){
        newGameClick();
    }
}

function historyClick(){
    if(document.getElementById("btn-history").value == "历史记录"){
        document.getElementById("scoreDisplay").style.display = "block";
        document.getElementById("btn-history").value = "隐藏记录";
    } else{
        document.getElementById("scoreDisplay").style.display = "none";
        document.getElementById("btn-history").value = "历史记录";
    }
    
}