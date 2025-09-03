
export default function handler(req, res) {
    const { key } = req.query; // Lấy query param

    // Nếu key sai → trả trắng trang
    if (key !== "MY_SECRET_KEY") {
        return res.status(200).send(""); // Trắng trang
    }

    // Nếu key đúng → chạy code thực tế
    console.log("Code đang chạy trên server!");

    // Trả dữ liệu JSON cho client
    res.status(200).json({
        message: "Code chạy thành công!",
        timestamp: new Date()
    });
}
