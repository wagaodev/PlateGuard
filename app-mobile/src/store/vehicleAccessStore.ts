import { create } from 'zustand';
import { ScanState, ScanMode, VehicleAccessResponse } from '../types/vehicleAccess.types';

interface VehicleAccessState {
  scanState:     ScanState;
  scanMode:      ScanMode;
  lastResult:    VehicleAccessResponse | null;
  setScanState:  (state: ScanState) => void;
  setScanMode:   (mode: ScanMode)   => void;
  setLastResult: (result: VehicleAccessResponse) => void;
  reset:         () => void;
}

export const useVehicleAccessStore = create<VehicleAccessState>((set) => ({
  scanState:     'idle',
  scanMode:      'CAMERA',
  lastResult:    null,
  setScanState:  (scanState)  => set({ scanState }),
  setScanMode:   (scanMode)   => set({ scanMode }),
  setLastResult: (lastResult) => set({ lastResult }),
  reset:         ()           => set({ scanState: 'idle', lastResult: null }),
}));
