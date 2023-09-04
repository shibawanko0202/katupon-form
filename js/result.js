"use strict"


// 集計結果(ホリホリへ、ここ↓↓を変更おねしゃす。％ではなく票数) 

  const s1 = 92; //『うん』 
  const s2 = 34; //『うなちゃづけ』
  const s3 = 23; //謀ったなー！？
  const s4 = 7; //あ、順番来たよ

  const total = s1 + s2 + s3 + s4;

// 集計結果(％ではなく票数) 

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

// グラフアニメーション用の変数
const anim_sec = 50;

setTimeout(() => {

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

}, 4500);




// 更新ボタン

const reload_btn = document.getElementById("reload-btn");

reload_btn.addEventListener('click',()=>{
  location.reload();
});



// ローディング画面

const loading = document.getElementById("result-loading");

setTimeout(() => {
  loading.classList.add("loaded");
}, 3000);