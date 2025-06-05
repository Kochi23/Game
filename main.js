let starttime;
let maxtime = 180-1;//int
let interval = null;
let timersound = false;

let size = 0;

let setpassmode = 1;
let temppass = "";
let pass = "";

inputStart();

function palletopen(){
    let p = document.getElementById("pallet")
    if(p.style.display  == "none") {
        p.style.display = "flex";
    } else {
        p.style.display = "none";
    }
}

function RefuseBoxSet(){
    const area = document.getElementById("RefuseBoxArea");
    area.innerHTML = "";

    for(let i=0; i<size; i++){
        area.innerHTML += `<div class='RefuseBox' id='RefuseBox${i}'></div>`;
    }
}

function timerStart() {
    if(setpassmode) return;
    starttime = new Date();
    interval = setInterval(update,70);
    const sound = new Audio("sound/OtoLogic/Timer.mp3");
    sound.play();

    timersound = true
    setTimeout(() =>{
        timersoundplay();
    },1000);
    inputStart();
    document.getElementById("start").style.display = "none";
}

function timersoundplay(){
    if(!timersound) return;

    let ms = 1000;
    const delta = getdelta();
    const timeleft = maxtime - Math.floor(delta/1000);

    if(timeleft < 2)        ms = 5;
    else if (timeleft < 6) ms = 125;
    else if (timeleft < 10) ms = 250;
    else if (timeleft <= 60) ms = 500;
    else                    ms = 1000;

    setTimeout(() =>{
        timersoundplay();
    },ms);

    const sound = new Audio("sound/OtoLogic/Timer.mp3");
    sound.play();
}

function timerEnd(){
    inputEnd();
    clearInterval(interval);
    timersound = false;
}

function getdelta(){
    const now = new Date();
    return now.getTime() - starttime.getTime();
}

function update(){
    const timer = document.getElementById("timer");

    const delta = getdelta();
    const deltasec = Math.floor(delta/1000);

    const mm = (99 - Math.floor(delta/10) %100).toString().padStart(2,"0");
    const sec = Math.floor(((maxtime - deltasec) % 60)).toString().padStart(2,"0");
    const min = Math.floor((maxtime -deltasec)/60).toString().padStart(2,"0");
    timer.innerHTML = `${min}:${sec}:<span style="font-size: 50%;">${mm}</span>`;

    if(((maxtime+1)*1000 - delta) <= 550){
        timersound = false;
    }
    if(((maxtime+1)*1000 - delta) <= 0){
        document.getElementById("explosion_sound").play();
        end();
    }
}

function soundcheck(){
    const sound = new Audio("sound/OtoLogic/explosion.mp3");
    sound.play();
}

function end(){
    clearInterval(interval);
    timersound = false;
    document.getElementById("timer").innerHTML = `00:00:<span style="font-size: 50%;">00</span>`;
    //document.getElementById("start").style.display = "block";
    ResetInputing();
    inputEnd();
}

let key_counting = "";
let box_counting = 0;
const keylist  = {
    //数字
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",

    // 母音
    "A": "あ", "I": "い", "U": "う", "E": "え", "O": "お",

    // 子音 + 母音（清音）
    "KA": "か", "KI": "き", "KU": "く", "KE": "け", "KO": "こ",
    "SA": "さ", "SHI": "し", "SI": "し", "SU": "す", "SE": "せ", "SO": "そ",
    "TA": "た", "CHI": "ち", "TI": "ち", "TSU": "つ", "TU": "つ", "TE": "て", "TO": "と",
    "NA": "な", "NI": "に", "NU": "ぬ", "NE": "ね", "NO": "の",
    "HA": "は", "HI": "ひ", "HU": "ふ", "FU": "ふ", "HE": "へ", "HO": "ほ",
    "MA": "ま", "MI": "み", "MU": "む", "ME": "め", "MO": "も",
    "YA": "や", "YU": "ゆ", "YO": "よ",
    "RA": "ら", "RI": "り", "RU": "る", "RE": "れ", "RO": "ろ",
    "WA": "わ", "WI": "うぃ", "WE": "うぇ", "WO": "を",

    // 濁音
    "GA": "が", "GI": "ぎ", "GU": "ぐ", "GE": "げ", "GO": "ご",
    "ZA": "ざ", "JI": "じ", "ZI": "じ", "ZU": "ず", "ZE": "ぜ", "ZO": "ぞ",
    "DA": "だ", "DI": "ぢ", "DU": "づ", "DE": "で", "DO": "ど",
    "BA": "ば", "BI": "び", "BU": "ぶ", "BE": "べ", "BO": "ぼ",
    "PA": "ぱ", "PI": "ぴ", "PU": "ぷ", "PE": "ぺ", "PO": "ぽ",

    // 拗音（清音）
    "KYA": "きゃ", "KYU": "きゅ", "KYO": "きょ",
    "SHA": "しゃ", "SHU": "しゅ", "SHO": "しょ",
    "SYA": "しゃ", "SYU": "しゅ", "SYO": "しょ",
    "CHA": "ちゃ", "CHU": "ちゅ", "CHO": "ちょ",
    "TYA": "ちゃ", "TYU": "ちゅ", "TYO": "ちょ",
    "NYA": "にゃ", "NYU": "にゅ", "NYO": "にょ",
    "HYA": "ひゃ", "HYU": "ひゅ", "HYO": "ひょ",
    "MYA": "みゃ", "MYU": "みゅ", "MYO": "みょ",
    "RYA": "りゃ", "RYU": "りゅ", "RYO": "りょ",

    // 拗音（濁音）
    "GYA": "ぎゃ", "GYU": "ぎゅ", "GYO": "ぎょ",
    "JA": "じゃ", "JU": "じゅ", "JO": "じょ",
    "ZYA": "じゃ", "ZYU": "じゅ", "ZYO": "じょ",
    "BYA": "びゃ", "BYU": "びゅ", "BYO": "びょ",
    "PYA": "ぴゃ", "PYU": "ぴゅ", "PYO": "ぴょ",

    // 小文字
    "XA": "ぁ", "XI": "ぃ", "XU": "ぅ", "XE": "ぇ", "XO": "ぉ",
    "LA": "ぁ", "LI": "ぃ", "LU": "ぅ", "LE": "ぇ", "LO": "ぉ",
    "LTU": "っ", "XTU": "っ",

    // 外来語・特殊
    "FA": "ふぁ", "FI": "ふぃ", "FE": "ふぇ", "FO": "ふぉ",
    "VA": "ゔぁ", "VI": "ゔぃ", "VU": "ゔ", "VE": "ゔぇ", "VO": "ゔぉ",
    "TSA": "つぁ", "TSI": "つぃ", "TSE": "つぇ", "TSO": "つぉ",
    "CYA": "ちゃ", "CYU": "ちゅ", "CYO": "ちょ", "-":"ー"
};

function inputStart(){
    window.addEventListener("keydown",inputProcessing);
}

function inputEnd(){
    window.removeEventListener("keydown",inputProcessing);
}

//anyを許すな
function inputProcessing(e){
    const k = e.key.toUpperCase();
    if(k === "BACKSPACE" && box_counting > 0){
        if(setpassmode){
            ResetInputing();
        } else {
            if(key_counting.length !== 0){
            key_counting = key_counting.slice(0,-1);
            SetInput(key_counting,false);
            } else {
                deleteInput();
            }
        }
        
        return;
    }
    if(box_counting >= size){
        if (k === "ENTER"){
            if(setpassmode){
                if(pass == ""){
                    inputEnd();
                    document.getElementById("RefuseAreaText").textContent = `パスワード:${temppass}`;
                    document.getElementById("IsSetPassBox1").textContent = "*";
                    const reservationPass = temppass;

                    setTimeout(() => {
                        inputStart();
                        document.getElementById("RefuseAreaText").textContent = "パスワードを確認";
                        pass = reservationPass;
                    }, 1000);
                } else {
                    if(pass == temppass){
                        document.getElementById("RefuseAreaText").textContent = "パスワード設定完了";
                        document.getElementById("IsSetPassBox2").textContent = "*";
                        document.getElementById("soundcheck").style.display = "none";
                        size = pass.length;
                        inputEnd();
                        setTimeout(() => {
                            RefuseBoxSet();
                            setpassmode = 0;
                            document.getElementById("RefuseAreaText").textContent = "爆弾解除コード";
                            document.getElementById("start").style.display = "block";
                        }, 1000);
                    } else {
                        ResetInputing();
                    }
                }

                temppass = "";
                key_counting = "";
            } else {
                let str = "";
                for(let i=0; i<size; i++){
                    str += document.getElementById(`RefuseBox${i}`).textContent;
                }
                if(CanRefuse(str)){
                    //クリア
                    timerEnd();
                    document.getElementById("Refuse_sound").play();
                } else {
                    ResetInputing();
                }
            }
            return;
        }
        if(box_counting >= size && !setpassmode) return;
    }
    key_counting += k;

    if(key_counting in keylist) {
        SetInput(keylist[key_counting],true);
        key_counting = "";
    }
    else if (check_key(key_counting)){
        SetInput(key_counting,false);
    }
    //「っ」 
    else if(key_counting[0] === k && key_counting.length === 2){
        key_counting = k;
        SetInput("っ",true);
        if(check_key(k)){
            SetInput(k,false);
        }
        else {
            ResetInputing();
        }
    }
    //「ん」
    else if (key_counting[0] === "N" && key_counting.length === 2){
        key_counting = k === "N" ? "": k;
        SetInput("ん",true);
        if(check_key(k)){
            SetInput(k,false);
        }
        else {
            ResetInputing();
        }
    } else {
        ResetInputing();
    }
}

function CanRefuse(str){
    return str === pass;
}

function check_key(str){
    return Object.keys(keylist).some(key => key.startsWith(str));
}

function SetInput(str,bool){
    if(setpassmode){
        if(bool){
            temppass += str;
        }
        document.getElementById(`IsSetPassBox${pass == "" ? 1:2}`).textContent = "-";
    } else {
        if(box_counting >= size){
            ResetInputing();
            return;
        }

        if(bool===true){
            let i;
            for(i=0; i<str.length; i++){
                if(box_counting+i >= size){
                    ResetInputing();
                    return;
                }
                document.getElementById(`RefuseBox${box_counting+i}`).textContent = str[i];
            }
            box_counting += 1+(i-1);
        } else {
            document.getElementById(`RefuseBox${box_counting}`).textContent = str;
        }
    }
}

function deleteInput(){
    box_counting--;
    document.getElementById(`RefuseBox${box_counting}`).textContent = "";
}

//入力削除
function ResetInputing(){
    if(setpassmode){
        temppass = "";
        key_counting = "";
        document.getElementById(`IsSetPassBox${pass == "" ? 1:2}`).textContent = "";
    } else{
        for(let i=0; i<size; i++){
            document.getElementById(`RefuseBox${i}`).textContent = "";
        }
        key_counting = "";
        box_counting = 0;
    }
}