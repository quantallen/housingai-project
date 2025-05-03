<?php
// 开启错误报告（调试用）
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 记录基本请求信息到日志
$debug_log = "debug_" . date('Y-m-d') . ".log";
$request_time = date('Y-m-d H:i:s');
$separator = str_repeat("-", 50);
file_put_contents($debug_log, "\n\n{$separator}\n{$request_time} - 新请求\n{$separator}\n", FILE_APPEND);
file_put_contents($debug_log, "请求方法: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);
file_put_contents($debug_log, "请求IP: " . $_SERVER['REMOTE_ADDR'] . "\n", FILE_APPEND);
file_put_contents($debug_log, "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . "\n", FILE_APPEND);

// 设置跨域头（允许任何来源的请求）
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 如果是预检请求，直接返回成功
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    file_put_contents($debug_log, "OPTIONS预检请求，返回200\n", FILE_APPEND);
    exit(0);
}

// 如果不是POST请求，返回错误
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    file_put_contents($debug_log, "非POST请求，返回405错误\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => '只接受POST请求',
        'method' => $_SERVER['REQUEST_METHOD']
    ]);
    exit;
}

// 获取POST请求中的数据
$raw_input = file_get_contents('php://input');
file_put_contents($debug_log, "接收到的原始数据: " . $raw_input . "\n", FILE_APPEND);

// 检查是否为空
if (empty($raw_input)) {
    http_response_code(400);
    file_put_contents($debug_log, "接收到空数据，返回400错误\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => '未接收到数据'
    ]);
    exit;
}

// 解析JSON数据
$data = json_decode($raw_input, true);

// 检查数据是否成功解析
if ($data === null) {
    http_response_code(400);
    $error_msg = "JSON解析失败: " . json_last_error_msg();
    file_put_contents($debug_log, "{$error_msg}\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => $error_msg
    ]);
    exit;
}

// 记录解析后数据
file_put_contents($debug_log, "解析后数据: " . print_r($data, true) . "\n", FILE_APPEND);

// 验证必填字段
$required_fields = ['name', 'email', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    $error_msg = "缺少必填字段: " . implode(', ', $missing_fields);
    file_put_contents($debug_log, "{$error_msg}\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => $error_msg
    ]);
    exit;
}

// 验证邮箱格式
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    $error_msg = "无效的电子邮件格式: " . $data['email'];
    file_put_contents($debug_log, "{$error_msg}\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => $error_msg
    ]);
    exit;
}

// 设置保存目录
$excel_dir = 'contacts';
if (!file_exists($excel_dir)) {
    $mkdir_result = mkdir($excel_dir, 0777, true);
    file_put_contents($debug_log, "创建目录 '{$excel_dir}': " . ($mkdir_result ? "成功" : "失败") . "\n", FILE_APPEND);
    
    if (!$mkdir_result) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => '无法创建保存目录'
        ]);
        exit;
    }
    
    // 确保目录权限正确
    chmod($excel_dir, 0777);
}

// 生成文件名：当天日期+姓名
$today = date('Ymd'); // 格式：20250429
$safe_name = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $data['name']); // 安全的文件名
$file_name = $today . '_' . $safe_name . '.xls';
$file_path = $excel_dir . '/' . $file_name;

file_put_contents($debug_log, "将保存为Excel文件: {$file_path}\n", FILE_APPEND);

try {
    // 准备要写入的数据
    $current_date = date('Y-m-d H:i:s');
    $form_data = [
        '提交时间' => $current_date,
        '姓名' => $data['name'],
        '电子邮件' => $data['email'],
        '主题' => $data['subject'] ?? '(无主题)',
        '消息内容' => $data['message'],
        'IP地址' => $_SERVER['REMOTE_ADDR']
    ];

    // 创建Excel文件（HTML格式，可以被Excel打开）
    $excel_content = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    $excel_content .= '<head>';
    $excel_content .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
    $excel_content .= '<meta name="ProgId" content="Excel.Sheet">';
    $excel_content .= '<meta name="Generator" content="Microsoft Excel 11">';
    $excel_content .= '<style>td{mso-number-format:\@;}</style>'; // 确保所有单元格被视为文本
    $excel_content .= '</head>';
    $excel_content .= '<body>';
    $excel_content .= '<table border="1">';
    
    // 添加表头和数据行
    $excel_content .= '<tr><th>字段</th><th>值</th></tr>';
    
    foreach ($form_data as $field => $value) {
        $excel_content .= '<tr>';
        $excel_content .= '<td>' . htmlspecialchars($field) . '</td>';
        $excel_content .= '<td>' . htmlspecialchars($value) . '</td>';
        $excel_content .= '</tr>';
    }
    
    $excel_content .= '</table>';
    $excel_content .= '</body>';
    $excel_content .= '</html>';
    
    // 写入文件
    $bytes_written = file_put_contents($file_path, $excel_content);
    
    if ($bytes_written === false) {
        throw new Exception("写入Excel文件失败");
    }
    
    file_put_contents($debug_log, "Excel文件写入成功，{$bytes_written}字节\n", FILE_APPEND);
    
    // 设置文件权限
    chmod($file_path, 0666);
    
    // 同时保存到CSV作为备份
    $csv_file = $excel_dir . '/all_contacts.csv';
    $csv_exists = file_exists($csv_file);
    $csv_handle = fopen($csv_file, 'a'); // 追加模式
    
    if (!$csv_handle) {
        file_put_contents($debug_log, "警告：无法打开CSV备份文件\n", FILE_APPEND);
    } else {
        // 如果是新文件，写入标题行
        if (!$csv_exists) {
            fputcsv($csv_handle, array_keys($form_data));
        }
        
        // 写入数据行
        fputcsv($csv_handle, array_values($form_data));
        fclose($csv_handle);
        chmod($csv_file, 0666);
        file_put_contents($debug_log, "数据已添加到CSV备份文件\n", FILE_APPEND);
    }
    
    // 返回成功响应
    echo json_encode([
        'success' => true,
        'message' => '表单提交成功',
        'data' => [
            'file' => $file_name,
            'time' => $current_date,
            'name' => $data['name'],
            'email' => $data['email']
        ]
    ]);
    
} catch (Exception $e) {
    // 记录错误
    $error_msg = "错误: " . $e->getMessage();
    file_put_contents($debug_log, "{$error_msg}\n" . $e->getTraceAsString() . "\n", FILE_APPEND);
    
    // 返回错误响应
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '保存数据时发生错误: ' . $e->getMessage()
    ]);
}

// 最终日志记录
file_put_contents($debug_log, "{$separator}\n请求处理完成\n\n", FILE_APPEND);