// object and arrays
const newGame = {};
let allGames = [
    {
        id: -1,
        n: 3,
        isRepeat: false,
        kString: "579", 
        allGuesses: [
            {iString: "123", result: [0,0]},
            {iString: "456", result: [0,1]},
            {iString: "567", result: [1,2]},
            {iString: "678", result: [1,1]},
            {iString: "579", result: [3,3]}
        ],
        isTimeInterval: false,
        time: [],
        timeDisplay: "N/A 样例"
    },

    {
        id: 0,
        n: 4,
        isRepeat: true,
        kString: '5199',
        allGuesses: [
            {iString: "1234", result: [0,1]},
            {iString: "2345", result: [0,1]},
            {iString: "1567", result: [0,2]},
            {iString: "2346", result: [0,0]},
            {iString: "8907", result: [0,1]},
            {iString: "5181", result: [2,2]},
            {iString: "5951", result: [1,3]},
            {iString: "5199", result: [4,4]}
        ],
        isTimeInterval: false,
        time: [],
        timeDisplay: "N/A 样例"
    }
];
const levelName = ["新秀", "少侠", "大侠", "掌门", "宗师", "盟主"];

if(localStorage.getItem("allGames") == null){
    localStorage.setItem("allGames", JSON.stringify(allGames));
} else{ allGames = JSON.parse(localStorage.getItem("allGames"));}

document.getElementById("timesDisplay").innerHTML = allGames.length - 1;
document.getElementById("times").innerHTML = allGames.length - 1;

// ms毫秒转为 分钟 秒 string
function timetoString(ms){
    const seconds = parseInt(ms/1000%60);
    const minutes = parseInt(ms/1000/60);
    if(minutes<=9){
        return `${minutes}:${seconds}`;
    } else{
        return `${minutes}:${seconds} 超时`;
        newGame.isTimeInterval = false;
    }
}

// 计算游戏分数和等级
function levelCaculate(){
    let sumTime = 0, games = 0;
    for(i=0; i<allGames.length; i++){
        if(allGames[i].isTimeInterval){
            sumTime += Number(allGames[i].time[2]);
            games ++;
        }
    }
    document.getElementById("scoreDisplay").tFoot.rows[0].cells[3].innerHTML = timetoString(sumTime);

    let nlevel = 0;
    if(games>0){
        nlevel = parseInt(Math.log(games)/Math.log(2));
        if(nlevel>6) {nlevel = 6;}
    }
    document.getElementById("scoreDisplay").tFoot.rows[0].cells[1].innerHTML = nlevel +". "+ levelName[nlevel];
}

// scoreDisplay switch
function historyClick(){
    // 要显示
    if(document.getElementById("scoreDisplay").style.display == "none"){
        document.getElementById("scoreDisplay").style.display = "block";
        document.getElementById("bHistory").value = "隐藏记录";
        levelCaculate();
    } else{ // 要隐藏
        document.getElementById("scoreDisplay").style.display = "none";
        document.getElementById("bHistory").value = "历史记录";
    }
}
function scoreDisplaySwitch(condition){
    // 要显示
    if(condition){
        document.getElementById("scoreDisplay").style.display = "block";
        document.getElementById("bHistory").value = "隐藏记录";
        levelCaculate();
    } else{ // 要隐藏
        document.getElementById("scoreDisplay").style.display = "none";
        document.getElementById("bHistory").value = "历史记录";
    }
}



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
        newGame.id = allGames.length - 1;
        newGame.n = Number(document.getElementById('n').value);
        newGame.isRepeat = document.getElementById("isRepeatY").checked;
        newGame.kString = getRandom(newGame.n, newGame.isRepeat);
        newGame.allGuesses = [];
        newGame.isTimeInterval = true;
        newGame.time = [new Date()];
        newGame.timeDisplay = "";
        const {n, isRepeat, kString} = newGame;
        console.log(kString);       // 后台答案

        // 游戏界面调整
        document.getElementById("guessBoard").style.display = "block";   // 显示猜数字板
        document.getElementById("answerBoard").style.display = "none";  // 禁用难度板
        scoreDisplaySwitch(false);
        document.getElementById("btn-restart").style.display = "";    // btns
        document.getElementById("times").innerHTML = allGames.length - 1;
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



// 写入表格该局allGames[].allGuesses 第n次数据，到第n行
function tableWriteGame(allGuesses, n){
    let newRow = document.getElementById('gameDisplay').insertRow(n);
    newRow.insertCell(0).innerHTML = n;
    newRow.insertCell(1).innerHTML = allGuesses[n-1].iString;
    newRow.insertCell(2).innerHTML = allGuesses[n-1].result[0];
    newRow.insertCell(3).innerHTML = allGuesses[n-1].result[1];
}

function showPreview(id, allGuesses){
    const deleteRows = document.getElementById("gameDisplay").rows.length;
    if(deleteRows > 1){
        for(i=1; i<deleteRows; i++){
            document.getElementById("gameDisplay").deleteRow(1);
        }
    }
    for(i=1; i<=allGuesses.length; i++){
        tableWriteGame(allGuesses, i);
    }
    const scoreRows = document.getElementById("scoreDisplay").rows.length;
    for(i=1; i<=scoreRows-2; i++){
        document.getElementById("scoreDisplay").rows[i].cells[6].style.background = "";
    }
    document.getElementById("scoreDisplay").rows[id+2].cells[6].style.background = "pink";
}

// 写入表格第n局游戏得分
function tableWriteScore(allGames){
    const {id, n, isRepeat, kString, allGuesses, timeDisplay} = allGames;
    let newScore = document.getElementById('scoreDisplay-tbody').insertRow(id-1);
    newScore.insertCell(0).innerHTML = id;
    newScore.insertCell(1).innerHTML = n;
    newScore.insertCell(2).innerHTML = isRepeat.toString();
    newScore.insertCell(3).innerHTML = kString;
    newScore.insertCell(4).innerHTML = allGuesses.length;
    newScore.insertCell(5).innerHTML = timeDisplay;
    newScore.insertCell(6).innerHTML = "...";
    document.getElementById("scoreDisplay-tbody").rows[id-1].cells[6].addEventListener("click", function() {showPreview(id, allGuesses)});
}

const scoreRowslength = document.getElementById('scoreDisplay-tbody').rows.length;
if(scoreRowslength < allGames.length - 2){
    for(i=2; i<allGames.length; i++){
        tableWriteScore(allGames[i]);
    }
}

// 游戏输入后触发
function guessNumberClick(){
    const {id, n, kString, allGuesses, time} = newGame;
    if(document.getElementById("iString").reportValidity()){
        const newGuess = {};
        newGuess.iString = document.getElementById('iString').value;
        newGuess.result = gameCaculate(n, newGuess.iString);
        const {iString} = newGuess;
        allGuesses.push(newGuess);
        tableWriteGame(allGuesses, allGuesses.length);

        if(kString == iString){
            time[1] = new Date();
            time[2] = time[1] - time[0];
            newGame.timeDisplay = timetoString(time[2]);
            tableWriteScore(newGame);
            const newGamePush = {};
            Object.assign(newGamePush, newGame);
            allGames.push(newGamePush);
            localStorage.setItem("allGames", JSON.stringify(allGames));

            const scoreRows = document.getElementById("scoreDisplay-tbody").rows.length;
            for(i=0; i<scoreRows; i++){
                document.getElementById("scoreDisplay-tbody").rows[i].cells[6].style.background = "";
            }
            document.getElementById("scoreDisplay-tbody").rows[id-1].cells[6].style.background = "pink";

            document.getElementById("gameResult").style.display = "block";
            document.getElementById("guessBoard").style.display = "none";
            document.getElementById("btn-restart").style.display = "none";
            scoreDisplaySwitch(true);
        }
    }
    document.getElementById("iString").value = "";
}

function newGameClick(){
    scoreDisplaySwitch(false);
    document.getElementById("gameResult").style.display = "none";
    document.getElementById("answerBoard").style.display = "block";
    document.getElementById("btn-restart").style.display = "none";
    document.getElementById("guessBoard").style.display = "none";
    document.getElementById("times").innerHTML = allGames.length - 1;
    document.getElementById("timesDisplay").innerHTML = allGames.length - 1;
    
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

function removeClick(){
    const feedback = confirm("清除缓存将丢失所有游戏记录且不能恢复，确认吗？");
    if(feedback){
        localStorage.removeItem("allGames");
        window.location.reload();
    }
}

