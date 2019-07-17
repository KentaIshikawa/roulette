$(function(){
  let abc = 'csv.php';
$.getJSON(abc,csvReady);

});/////////////////////////////////////////////////////////////////////////////

function shuffleArr(arr){
  var i = arr.length;
  while(i){
    var nRandam = Math.floor(Math.random() * i--);
    var temp = arr[i];
    arr[i] = arr[nRandam];
    arr[nRandam] = temp;
  };
}

function csvReady(data){
  if(!data){
    alert("エラーです");
    return;
  }
  
  let nameArr=[];
  let nameShuffleArr=[];
  let noArr=[];
  for(let i = 0;i<data.length;i++){
    if(data[i].through){
      continue;
    }
    nameArr.push(data[i].name);
    if(data[i].no){
      let obj = {
        'no' : data[i].no,
        'name' : data[i].name
      }
      noArr.push(obj);
      continue;
    }
    nameShuffleArr.push(data[i].name);
  }

  shuffleArr(nameShuffleArr);

  if(noArr.length){
    for(var i =0;i<noArr.length;i++){
/*
      let no = noArr[i].no - 1;
      nameShuffleArr.splice(no,0,noArr[i].name);
*/
      if(nameShuffleArr[noArr[i].no-1]){
        let a = nameShuffleArr[noArr[i].no-1];
        nameShuffleArr[noArr[i].no-1] = noArr[i].name;
        nameShuffleArr.push(a);
      }else{
        nameShuffleArr[noArr[i].no-1] = noArr[i].name;
      }
    }
  }
  nameShuffleArr = nameShuffleArr.filter(Boolean);
  console.log(nameArr);
  console.log(nameShuffleArr);

  let rouletteHtml = "<ul>";
  for(var i = 0;i<nameArr.length;i++){
    rouletteHtml += "<li>";
    rouletteHtml += nameArr[i];
    rouletteHtml += "</li>";
  }
  rouletteHtml += "</ul>";
  $(".roulette").html(rouletteHtml);
  var enter = new EnterFrame(100);

  $("body").on("enterFrame",function(){
    let target = (enter.getFrame % nameArr.length)+1;
    $(".roulette ul li").hide();
    $(".roulette ul li:nth-child("+target+")").show();
  })

  var toggle = true;
  $("button").on("click",function(){
    if(toggle){
      toggle=false;
      $(".roulette ul").show();
      $(".selectName").hide();
      $(this).text("ストップ").addClass("on");;
    }else{
      toggle=true;
      $(".roulette ul").hide();
      if(nameShuffleArr.length){
        $(".selectName").show().text(nameShuffleArr.shift());
      }else{
        $(".selectName").show().text("おしまい。");
      }
      $(this).text("スタート").removeClass("on");
    }
  });
}

function noArr(){

};