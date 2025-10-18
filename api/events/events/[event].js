// File chính xử lý tất cả events theo parameter
import { handleEventRequest } from '../../shared/eventHandler';

export default async function handler(req, res) {
  const { event } = req.query;
  
  if (!event) {
    return res.status(400).json({ 
      success: false, 
      error: 'Event parameter is required' 
    });
  }
  
  handleEventRequest(event, req, res);
}
