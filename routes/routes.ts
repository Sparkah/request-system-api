import { Router } from 'express';
import {
  createRequest,
  takeRequest,
  completeRequest,
  cancelRequest,
  getRequests,
  cancelAllInProgress,
} from '../controllers/requestController';

const router = Router();

router.post('/create', createRequest);
router.post('/take', takeRequest);
router.post('/complete', completeRequest);
router.post('/cancel', cancelRequest);
router.get('/list', getRequests);
router.post('/cancel-all', cancelAllInProgress);

export default router;
