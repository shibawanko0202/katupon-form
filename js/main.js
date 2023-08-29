"use strict"

// 集計結果(当日変更、％ではなく票数) 

  const s1 = 12; //『うん』 
  const s2 = 34; //『うなちゃづけ』
  const s3 = 23; //謀ったなー！？
  const s4 = 7; //あ、順番来たよ

  const total = s1 + s2 + s3 + s4;

// 集計結果(当日変更、％ではなく票数) 

// すべての音量の一括コントロール変数
const BGMcontrol = 1;


// ガイド(当日はCSSで非表示)
const guaid = document.getElementsByClassName("guaid");


// BGM設定

const BGM01 = document.getElementById('bgm01');
BGM01.volume = 0.15 * BGMcontrol;
const BGM02 = document.getElementById('bgm02');
BGM02.volume = 0.3 * BGMcontrol;

let BGMinterval;
function BGMfeedout(){
  BGMinterval = setInterval(()=>{
    let feedvol = 0.02;
    BGM02.volume = BGM02.volume - feedvol;
    if(BGM02.volume <= 0.02){
      clearInterval(BGMinterval);
      BGM02.pause();
    };
  },300);
};


// SE設定

const boyoyon_SE = new Audio("bgm/決定ボタンを押す52.mp3");
boyoyon_SE.volume = 0.7 * BGMcontrol;
const roulette_SE = new Audio("bgm/電子ルーレット回転中.mp3");
roulette_SE.volume = 0.2 * BGMcontrol;
const bigger_SE = new Audio("bgm/警告音1.mp3");
bigger_SE.volume = 0.6 * BGMcontrol;
const start_SE = new Audio("bgm/戦火を交えて(戦闘開始).mp3");
start_SE.volume = 0.3 * BGMcontrol;
const choice_SE = new Audio("bgm/選択音.wav");
choice_SE.volume = 0.1 * BGMcontrol;
const attack_SE = new Audio("bgm/攻撃音.mp3");
attack_SE.volume = 0.4 * BGMcontrol;
const serif_SE = new Audio("bgm/会話_単音.mp3");
serif_SE.volume = 0.2 * BGMcontrol;
const gameover_SE = new Audio("bgm/ゲームオーバー.mp3");
gameover_SE.volume = 0.3 * BGMcontrol;


// スクリーン切り替え

let screen_type = 1;
// (QR(1) → graph(2)→ battle(3))


// QRコード画面

const QR = document.getElementById("QRscreen");
const bg_borders = document.getElementsByClassName("bg_border");
const QRtext = document.getElementById("QRtext"); 

let QR_switch =1;


// グラフ画面

const graph = document.getElementById("graph");
const lines = document.getElementsByClassName("line");
const values = document.getElementsByClassName("value");
const boxs = document.getElementsByClassName("box");
const percents = document.getElementsByClassName("percent");
let rotate_switch = 1;


// ％変換
const select_01 = Math.round(s1 / total * 100); 
const select_02 = Math.round(s2 / total * 100);
const select_03 = Math.round(s3 / total * 100);
const select_04 = Math.round(s4 / total * 100);
const select_array = [select_01,select_02,select_03,select_04];
// 配列の最大数のインデックス
const max_num = Math.max(...select_array);
const max_select = select_array.indexOf(max_num);

let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;


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
const gameovers = document.getElementsByClassName("gameover");
const frames = document.getElementsByClassName("frame");
const textbox = document.getElementById("textbox");
let control = true;

// グラフアニメーション用の変数
const anim_sec = 50;

// テキストの内容
const texts = document.getElementsByClassName("text");
let text_interval;
const text00 = ["カツヤが　あらわれた！",
"カツヤは　『けっこんしよう』　と言っている…。"];
const text01 = ["カツヤ「・・・。"];
const text02 = [
  "カツヤ「いや、そうじゃなくて・・・。",
  "いずほ「え？『け』でしょ？",
  "カツヤ「・・・・・・・・・・・・",
  "　　　　・・・・・・『けいえいはたん』"
];
const text03 = ["カツヤ「・・・。"];
const text04 = ["カツヤ「あ、そっすね・・・。","いずほ「はやく行こっ！"];


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
          serif_SE.currentTime = 0;
          serif_SE.play();
          texts[i].innerHTML = t[i].slice(0,n);
          //HTMLのtextに、変数sの０文字目からn文字までのテキストを表示する
          if(n < len){
            //文字を増やす処理の回数が入力された文字数を超えるまで繰り返す
            n++;
          } else {
            //文字を増やす処理の回数が入力された文字数を超えた時の処理
            clearInterval(text_interval);
          };
        },50);
      },(len_total * 100));
    };
  };

// テキスト表示アニメーション関数


// ゲームオーバー関数

  function gameover_anime(i){
    setTimeout(()=>{
      gameover_SE.currentTime = 0;
      gameover_SE.play();
      BGM02.pause();
      for(let i = 0;i < gameovers.length;i++){
        gameovers[i].classList.add("over");
      };
      for(let i = 0;i < com_lists.length;i++){
        com_lists[i].classList.remove("blink");
      };
    },(i * 1000));
  };

// ゲームオーバー関数


// バトル開始関数

  function battle(){

    new Promise((resolve)=>{
      control_off();
      com_lists[current_command].classList.remove("blink");
      start_SE.currentTime = 0;
      start_SE.play();
      setTimeout(()=>{
        resolve();
      },5600);
    }).then(()=>{
      // 戦火を交えて(ループ)開始
      BGM02.play();
    });

    new Promise((resolve) =>{
      
      flashscreen.classList.add("in");
      setTimeout(()=>{
        resolve();
      },1200);

    }).then(()=>{
              
      new Promise((resolve)=>{

        // 背景導入
        bgi.classList.add("apear");
        textbox.classList.add("apear");
        katsuya.classList.add("in");
        setTimeout(()=>{
          bgi.classList.add("apear2");
        },2000);
        setTimeout(()=>{
          resolve();
        },1200);

      }).then(()=>{

        new Promise((resolve)=>{
          
          // カツヤ登場
          setTimeout(()=>{
            word(text00);
          },1800);
          setTimeout(()=>{
            resolve();
          },3000);

        }).then(()=>{
          
          for(let i = 0;i < frames.length;i++){
            setTimeout(()=>{
              frames[i].classList.add("apear");
            },(i * 60))
          };

          setTimeout(()=>{
            control_on();
          },4000);

        });
      });
    });
  };

// バトル開始関数


// 確認用

// document.addEventListener('keydown',(e)=>{
//   screen_type = 3;
//   battle();
// })

// 確認用


// キーを打鍵してコントロール
document.addEventListener('keydown',(e)=>{

  if(screen_type === 1){
    if(control && e.code == 'Enter'){
      BGM01.play();
      control_off();
      
      if(QR_switch === 1){
        bg_borders[3].classList.add("out");
        for(let i = 0;i < bg_borders.length;i++){
          setTimeout(()=>{
            bg_borders[i].classList.add("out");
          },(i * 2000));
        };

        setTimeout(()=>{
            QRtext.classList.add("on");
            control_on();
            QR_switch++;
          },6000);

      }else if(QR_switch === 2){

        QR.classList.add("out");
        for(let i = 0;i < percents.length;i++){
          setTimeout(()=>{
            percents[i].classList.add("anim");
            setTimeout(()=>{
              boyoyon_SE.currentTime = 0;
              boyoyon_SE.play();
            },(4200));
          },(i * 500));
        };
        setTimeout(()=>{
          guaid[1].classList.remove("off");
          control_on();
        },(7000));
        QR_switch++; //２が暴発しないように一応。
        screen_type++;

      };

    }else if(e.code == 'Space'){

      if(BGM01.paused){
        BGM01.play();
      } else {
        BGM01.pause();
      };

    };

  }else if(screen_type === 2){
    // グラフ画面

    if(control && e.code == 'Enter'){

      control_off();

      if(rotate_switch == 1){
        rotate_switch++;

        for(let i = 0;i < lines.length;i++){
          lines[i].classList.add("rotate");
        };
        const rotates = document.getElementsByClassName("rotate");

        // 円グラフアニメーション追加
        rotates[0].style.strokeDashoffset = `calc(440 - (440 * ${select_01}) / 100)`;
        rotates[0].style.animation = `circleAnim ${(select_01 * anim_sec) / 1000}s forwards`;
        
        rotates[1].style.strokeDashoffset = `calc(440 - (440 * ${select_02}) / 100)`;
        rotates[1].style.animation = `circleAnim ${(select_02 * anim_sec) / 1000}s forwards`;
        
        rotates[2].style.strokeDashoffset = `calc(440 - (440 * ${select_03}) / 100)`;
        rotates[2].style.animation = `circleAnim ${(select_03 * anim_sec) / 1000}s forwards`;
        
        rotates[3].style.strokeDashoffset = `calc(440 - (440 * ${select_04}) / 100)`;
        rotates[3].style.animation = `circleAnim ${(select_04 * anim_sec) / 1000}s forwards`;

        roulette_SE.currentTime = 0;
        roulette_SE.play();
        setTimeout(()=>{
          // 一番長いアニメーションに合わせた音
          roulette_SE.pause();
          control_on();
        },(max_num * anim_sec));
        
        // カウントUPアニメーション
        const countup01 = setInterval(()=>{
          count1++;
          values[0].textContent = count1;
          if(count1 == select_01){
            clearInterval(countup01);
          };
        },anim_sec);
        const countup02 = setInterval(()=>{
          count2++;
          values[1].textContent = count2;
          if(count2 == select_02){
            clearInterval(countup02);
          };
        },anim_sec);
        const countup03 = setInterval(()=>{
          count3++;
          values[2].textContent = count3;
          if(count3 == select_03){
            clearInterval(countup03);
          };
        },anim_sec);
        const countup04 = setInterval(()=>{
          count4++;
          values[3].textContent = count4;
          if(count4 == select_04){
            clearInterval(countup04);
          };
        },anim_sec);
        
      } else if(rotate_switch == 2){

        rotate_switch++;
        setTimeout(()=>{
          bigger_SE.currentTime = 0;
          bigger_SE.play();
        },800);
        for(let i = 0;i < boxs.length;i++){
          boxs[i].classList.add("small");
        };
        boxs[max_select].classList.remove("small");
        boxs[max_select].classList.add("big");

        setTimeout(()=>{
          control_on();
        },1500);

      } else if(rotate_switch == 3){

        graph.classList.add("blur");
        main.classList.remove("off");
        BGM01.pause();
        screen_type++;
        battle();

      };

    }else if(e.code == 'Space'){
      if(BGM01.paused){
        BGM01.play();
      } else {
        BGM01.pause();
      };
    };

  } else if(screen_type === 3){
    // バトル画面

    if(control){

      if(e.code == 'Space'){
        if(BGM02.paused){
          BGM02.play();
        } else {
          BGM02.pause();
        };
      };
    
      if(control && !check){ //4択画面

        for(let i = 0;i < com_lists.length;i++){
          com_lists[i].classList.remove("blink");
        };
        
        if(e.code == 'ArrowUp'){
          //4択画面で「↑」を押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
          
          current_command--;
          if(current_command < 0){
            current_command = 3;
          };
          com_lists[current_command].classList.add("blink");
          
        } else if(e.code == 'ArrowDown'){
          //4択画面で「↓」を押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
          
          current_command++;
          if(current_command > 3){
            current_command = 0;
          };
          com_lists[current_command].classList.add("blink");
          
        } else if(e.code == 'Enter'){
          //4択画面でエンターを押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
    
          check = true;
          check_box.classList.add("open");
          check_lists[current_check].classList.add("blink");
          
        } else {
          com_lists[current_command].classList.add("blink");
        };
        
      } else if(control && check){ //確認画面
  
        for(let i = 0;i < check_lists.length;i++){
          check_lists[i].classList.remove("blink");
        };
        
        if(e.code == 'ArrowUp'){
          //確認画面で「↑」を押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
          
          current_check--;
          if(current_check < 0){
            current_check = 1;
          };
          check_lists[current_check].classList.add("blink");
          
        } else if(e.code == 'ArrowDown'){
          //確認画面で「↓」を押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
          
          current_check++;
          if(current_check > 1){
            current_check = 0;
          };
          check_lists[current_check].classList.add("blink");
          
        } else if(e.code == 'Enter'){
          //確認画面でエンターを押したとき

          choice_SE.currentTime = 0;
          choice_SE.play();
          
          if(current_check === 0){
            // 「はい」の場合
            attack_SE.currentTime = 0;
            attack_SE.play();
            katsuya.classList.add("flash");
            setTimeout(() => {
              katsuya.classList.remove("flash");
            }, "1000");
            control_off();
    
            if(current_command == 0){
              setTimeout(()=>{
                word(text01);
              },1000);
              setTimeout(()=>{
                blackout.classList.add("in");
                BGMfeedout();
              },3000);
            }else if(current_command == 1){
              setTimeout(()=>{
                word(text02);
              },1000);
              gameover_anime(10);
            }else if(current_command == 2){
              setTimeout(()=>{
                word(text03);
              },1000);
              setTimeout(()=>{
                control_on();
              },4000);
            }else if(current_command == 3){
              setTimeout(()=>{
                word(text04);
              },1000);
              gameover_anime(6);
            };
          }; //　「はい」の場合
    
          check = false;
          current_check = 0;
          check_box.classList.remove("open");
          com_lists[current_command].classList.add("blink");
        } else { //確認画面でその他のキーを押したとき
          // 最初に"blink"を全部消してるので必要なのだ
          check_lists[current_check].classList.add("blink");
        };
      };
    };
  };
});

