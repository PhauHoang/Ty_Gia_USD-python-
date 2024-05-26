Hoàng Tràn Phâu K56KMT.01 MSSV: K205480106022

Hệ thống hiển thị tỷ và theo dõi giá đô la mỹ (USD)

Cơ sở dữ liệu:
  - Bảng: forex_rates : Lưu thông tin về giá USD, các thông tin base (USD), to_currency (VND), rate (25441.20195), 
   và updated_at (thời gian cập nhật) vào bảng forex_rates.

Module đọc dữ liệu: Sử dụng Python và FastAPI để tạo một API để lấy dữ liệu từ trang web chứa tỷ giá USD như FastForex.....

Mô tả nguồn dữ liệu:
  - Sử dụng Web Scraping hoặc lấy dữ liệu qua API của các trang web chuyên về Tỷ giá ĐÔ la Mỹ.
  - Dữ liệu bao gồm thông tin về Tý giá USD và thời gian cập nhật.
Node-RED:
  - Xây dựng một chu trình trong Node-RED để tự động gọi Stored Procedure SP_SaveGoldPrice để lưu giá vàng vào cơ sở dữ liệu.
  - Node-RED sẽ gọi API Python (hoặc một dịch vụ khác) để lấy dữ liệu và thời gian cập nhật. Sau đó, dữ liệu này sẽ được truyền sang vào bảng forex_rates để lưu trữ.
Web:
  - Xây dựng một ứng dụng web để hiển thị dữ liệu từ cơ sở dữ liệu.
  - Sử dụng các công nghệ như HTML, CSS, JavaScript để tạo giao diện web.
