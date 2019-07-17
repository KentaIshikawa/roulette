$(function(){
let nameArr=[
  "Aさん",
  "Bさん",
  "Cさん",
  "Dさん"
]

  let nameShuffleArr=　nameArr.slice(0,nameArr.length);

  shuffleArr(nameShuffleArr);


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