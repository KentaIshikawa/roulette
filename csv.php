<?php

$csv_url = $_SERVER['HTTP_HOST'].dirname($_SERVER['SCRIPT_NAME']).'/roulette.csv';

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $csv_url,
    CURLOPT_HEADER => false,
    CURLOPT_RETURNTRANSFER => true,
]);
$response = curl_exec($ch);

// エラーなら、適当にエラーメッセージ出して終了
if ($response === false) {
  header('Content-Type: application/json; charset=utf-8', true, 500);
  echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
  exit;
}

$buffer = mb_convert_encoding($response, 'UTF-8', 'sjis-win');
$fp = tmpfile();
fwrite($fp, $response);
rewind($fp);

$line_number = 0;
$data = [];
while (($row = fgetcsv($fp, 0)) !== FALSE) {
    $line_number++;
    if ($line_number <= 1) {
        // 1行目、2行目はスキップ
        continue;
    } elseif (empty(array_filter($row))) {
        // 空行ならループを終了
        break;
    }
    $data[] = [
      'name' => $row[0],
      'through' => $row[1],
      'no' => $row[2]
    ];
    
}
fclose($fp);

//array_multisort(array_column($data, 'date'), SORT_ASC, $data);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);

?>