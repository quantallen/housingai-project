<?php
// 开启错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 设置允许跨域请求
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 简单的响应数据
$response = [
    'status' => 'ok',
    'message' => 'API测试成功',
    'time' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_info' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown'
];

// 返回JSON响应
echo json_encode($response);