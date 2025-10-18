// BIẾN LƯU TRỮ DỮ LIỆU THẬT - KHÔNG CÓ MẪU
let realServers = {
  fullmoon: [],
  nearfullmoon: [],
  mysticisland: [],
  ripindra: [],
  doughking: [],
  darkbeard: [],
  cursedcaptain: []
};

// Hàm xử lý chung cho tất cả sự kiện
export function handleEventRequest(eventType, req, res) {
  // ... code xử lý như đã viết ở trên
}

// Hàm xóa server cũ (5 phút)
function cleanupOldServers(eventType) {
  // ... code cleanup
}

// Hàm lấy tên sự kiện
function getEventName(eventType) {
  // ... code get event name
}

export { realServers, cleanupOldServers, getEventName };
