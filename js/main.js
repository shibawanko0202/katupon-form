"use strict"


// スクリーン切り替え
let screen_type = 3;
// (QR(1) → graph(2)→ battle(3))

// コマンド設定
const katsuya = document.getElementById("katsuya");
const com_lists = document.getElementsByClassName(" command-list");
let current_command = 0;

const check_box = document.getElementById("check");
const check_lists = document.getElementsByClassName(" check-list");
let current_check = 0;
let check = false;

const flashscreen = document.getElementById("flashscreen");
const blackout = document.getElementById("blackout");
const main = document.getElementById("main");
const bgi = document.getElementById("bgi");
const frames = document.getElementsByClassName("frame");
const textbox = document.getElementById("textbox");
const selects = document.getElementsByName("entry.1604613071");
const check_final = document.getElementById("check-final");
let control = true;


// テキストの内容
const texts = document.getElementsByClassName("text");
let text_interval;
const text00 = ["勝也が　あらわれた！",
"勝也は　『けっこんしよう』　と言っている…。"];

let textcounter = false;

// コントロールON/OFF

  function control_on(){
    control = true;
    com_lists[current_command].classList.add("blink");
  };

  function control_off(){
    control = false;
  };

// コントロールON/OFF


// テキスト表示アニメーション関数

  function word(t){

    for(let i = 0;i < texts.length;i++){
      texts[i].innerHTML = null;
    };

    let len_total = 0;

    for(let i = 0;i < t.length;i++){
      let n = 0;
      let len = t[i].length;
      if(i >= 1){
        len_total += len;
      };

      setTimeout(()=>{
        text_interval = setInterval(()=>{
          texts[i].innerHTML = t[i].slice(0,n);
          //HTMLのtextに、変数sの０文字目からn文字までのテキストを表示する
          if(n < len){
            //文字を増やす処理の回数が入力された文字数を超えるまで繰り返す
            n++;
          } else {
            //文字を増やす処理の回数が入力された文字数を超えた時の処理
            clearInterval(text_interval);
          };
        },40);
      },(len_total * 60));
    };
  };

// テキスト表示アニメーション関数


// バトル開始関数

  function battle(){
    
    // com_lists[current_command].classList.remove("blink");

    flashscreen.classList.add("in");

    // 背景導入
    bgi.classList.add("apear");
    textbox.classList.add("apear");
    katsuya.classList.add("in");
    setTimeout(()=>{
      bgi.classList.add("apear2");
    },2000);
     
    // カツヤ登場
    setTimeout(()=>{
      word(text00);
    },4000);
    
    for(let i = 0;i < frames.length;i++){
      setTimeout(()=>{
        frames[i].classList.add("apear");
      },(i * 60));
    };
    setTimeout(()=>{
      selects[0].checked = true;
    },8000);

  };

// バトル開始関数

battle();


//最初のテキストの表示
// setTimeout(()=>{
//   word(text00);
// },1800);


// 最終チェックの表示変更
for(let i = 0; i < selects.length; i++){
  selects[i].addEventListener('change',() => {
    if(selects[i].checked){
      check_final.innerHTML = `「${selects[i].value}」で<br>よろしいですか？`;
      if(check_final.textContent.length > 16){
        check_final.classList.add("small");
      }else{
        check_final.classList.remove("small");
      };
    };
  });
};
