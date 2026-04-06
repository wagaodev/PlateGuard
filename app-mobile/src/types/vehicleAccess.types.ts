export type FeedbackType =
  | 'ALLOWED'
  | 'DENIED'
  | 'NOT_FOUND'
  | 'INVALID_PLATE'
  | 'SERVER_ERROR';

export type ScanMode  = 'CAMERA' | 'QR_CODE' | 'MANUAL';

export type ScanState = 'idle' | 'scanning' | 'validating' | 'done';

export interface VehicleAccessResponse {
  feedbackType:  FeedbackType;
  allowed:       boolean;
  plate:         string;
  message:       string;
  reason?:       string;
  ownerName?:    string;
  vehicleType?:  string;
  vehicleModel?: string;
  accessType?:   string;
}

export type VehicleStatus = 'ALLOWED' | 'DENIED' | 'PENDING';

export interface VehicleItem {
  id: string;
  plate: string;
  ownerName: string;
  vehicleModel: string | null;
  vehicleColor: string | null;
  status: string;
}
