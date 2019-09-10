$(function () {
  let abc = 'csv.php';
  $.getJSON(abc, csvReady);

});/////////////////////////////////////////////////////////////////////////////

function shuffleArr(arr) {
  var i = arr.length;
  while (i) {
    var nRandam = Math.floor(Math.random() * i--);
    var temp = arr[i];
    arr[i] = arr[nRandam];
    arr[nRandam] = temp;
  };
}

function csvReady(data) {
  if (!data) {
    alert("エラーです");
    return;
  }

  let ls = localStorage.getItem('nameShuffleArr');

  let nameArr = [];
  let nameShuffleArr = [];
  let noArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].through) {
      continue;
    }
    nameArr.push(data[i].name);
    if (!ls) {
      if (data[i].no) {
        let obj = {
          'no': data[i].no,
          'name': data[i].name
        }
        noArr.push(obj);
        continue;
      }
      nameShuffleArr.push(data[i].name);
    } else {
      nameShuffleArr = JSON.parse(ls);
    }
  }
  if (!ls) {
    shuffleArr(nameShuffleArr);
  }

  if (noArr.length) {
    for (var i = 0; i < noArr.length; i++) {
      if (nameShuffleArr[noArr[i].no - 1]) {
        let a = nameShuffleArr[noArr[i].no - 1];
        nameShuffleArr[noArr[i].no - 1] = noArr[i].name;
        nameShuffleArr.push(a);
      } else {
        nameShuffleArr[noArr[i].no - 1] = noArr[i].name;
      }
    }
  }

  nameShuffleArr = nameShuffleArr.filter(Boolean);
  // console.log(nameArr);
  // console.log(nameShuffleArr);

  let setjson = JSON.stringify(nameShuffleArr);
  localStorage.setItem('nameShuffleArr', setjson);


  let rouletteHtml = "<ul>";
  for (var i = 0; i < nameArr.length; i++) {
    rouletteHtml += "<li>";
    rouletteHtml += nameArr[i];
    rouletteHtml += "</li>";
  }
  rouletteHtml += "</ul>";
  $(".roulette").html(rouletteHtml);
  var enter = new MC(100);

  $(document).on(MC.ENTERFRAME, function () {
    let target = (enter.getFrame % nameArr.length) + 1;
    $(".roulette ul li").hide();
    $(".roulette ul li:nth-child(" + target + ")").show();
  }).on(EVENT.KEY_DOWN, function (e) {
    if (e.altKey) { $("#reset").show(); }
  }).on(EVENT.KEY_UP, function (e) {
    $("#reset").hide();
  });

  $("#reset button").on(EVENT.CLICK, function () {
    // 初期化
    localStorage.clear();
    location.reload();
  })

  var toggle = true;
  $("#start_stop button").on("click", function () {
    if (toggle) {
      toggle = false;
      $(".roulette ul").show();
      $(".selectName").hide();
      $(this).text("ストップ").addClass("on");;
    } else {
      toggle = true;
      $(".roulette ul").hide();
      let getjson = localStorage.getItem('nameShuffleArr');
      let ls = JSON.parse(getjson);
      if (ls.length) {
        $(".selectName").show().text(ls.shift());
        let setjson = JSON.stringify(ls);
        localStorage.setItem('nameShuffleArr', setjson);
      } else {
        $(".selectName").show().text("おしまい。");
      }
      $(this).text("スタート").removeClass("on");
    }
  });
}

function noArr() {

};