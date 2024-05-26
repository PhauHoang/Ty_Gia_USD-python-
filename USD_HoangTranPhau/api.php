<?php
header('Access-Control-Allow-Origin: *'); // Cho phép mọi nguồn (có thể thay đổi thành một nguồn cụ thể nếu cần)
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Kết nối server
$server = "127.0.0.1,1433";
$database = "USD";
$username = "sa";
$password = "1234";

try {
    $conn = new PDO("sqlsrv:Server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully <br>";
} catch(PDOException $e) {
    echo json_encode(array("error" => "Connection DB failed: " . $e->getMessage()));
    exit();
}

// Method GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Kiểm tra tham số đầu vào
    if(isset($_GET["action"])) {
        // Lấy tham số action
        $action = $_GET["action"];
        if($action == "get_all") {
            // Truy vấn lấy tất cả tỷ giá từ bảng forex_rates
            $stmt = $conn->query("SELECT * FROM forex_rates ORDER BY updated_at DESC");
            // Xử lý kết quả
            $array_kq = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $array_kq[] = $row; // Thêm dòng hiện tại vào mảng
            }
            $json_result = json_encode($array_kq);
            echo $json_result;
        } elseif($action == "get_latest") {
            // Truy vấn lấy tỷ giá mới nhất từ bảng forex_rates
            $stmt = $conn->query("SELECT TOP 1 * FROM forex_rates ORDER BY updated_at DESC");
            // Xử lý kết quả
            $array_kq = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $array_kq[] = $row; // Thêm dòng hiện tại vào mảng
            }
            $json_result = json_encode($array_kq);
            echo $json_result;
        } else {
            echo json_encode(array("error" => "Invalid action parameter"));
        }
    } else {
        echo json_encode(array("error" => "Missing action parameter"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>
