import { useVehicleAccessStore } from '../vehicleAccessStore';
import { VehicleAccessResponse } from '../../types/vehicleAccess.types';

const store = useVehicleAccessStore;

const mockAllowedResult: VehicleAccessResponse = {
  feedbackType: 'ALLOWED',
  allowed: true,
  plate: 'BRA2E19',
  message: 'Entrada liberada',
  ownerName: 'Wagner Barboza',
  vehicleType: 'car',
  vehicleModel: 'Honda Civic',
  accessType: 'resident',
};

const mockDeniedResult: VehicleAccessResponse = {
  feedbackType: 'DENIED',
  allowed: false,
  plate: 'BLQ9A87',
  message: 'Entrada negada',
  reason: 'Blocked vehicle',
};

describe('useVehicleAccessStore', () => {
  beforeEach(() => {
    store.setState({
      scanState: 'idle',
      scanMode: 'CAMERA',
      lastResult: null,
    });
  });

  describe('initial state', () => {
    it('has scanState as idle', () => {
      expect(store.getState().scanState).toBe('idle');
    });

    it('has scanMode as CAMERA', () => {
      expect(store.getState().scanMode).toBe('CAMERA');
    });

    it('has lastResult as null', () => {
      expect(store.getState().lastResult).toBeNull();
    });
  });

  describe('setScanState', () => {
    it('updates scanState to scanning', () => {
      store.getState().setScanState('scanning');
      expect(store.getState().scanState).toBe('scanning');
    });

    it('updates scanState to validating', () => {
      store.getState().setScanState('validating');
      expect(store.getState().scanState).toBe('validating');
    });

    it('updates scanState to done', () => {
      store.getState().setScanState('done');
      expect(store.getState().scanState).toBe('done');
    });

    it('does not affect other state properties', () => {
      store.getState().setScanMode('QR_CODE');
      store.getState().setScanState('scanning');
      expect(store.getState().scanMode).toBe('QR_CODE');
      expect(store.getState().lastResult).toBeNull();
    });
  });

  describe('setScanMode', () => {
    it('updates scanMode to QR_CODE', () => {
      store.getState().setScanMode('QR_CODE');
      expect(store.getState().scanMode).toBe('QR_CODE');
    });

    it('updates scanMode to MANUAL', () => {
      store.getState().setScanMode('MANUAL');
      expect(store.getState().scanMode).toBe('MANUAL');
    });

    it('updates scanMode back to CAMERA', () => {
      store.getState().setScanMode('QR_CODE');
      store.getState().setScanMode('CAMERA');
      expect(store.getState().scanMode).toBe('CAMERA');
    });
  });

  describe('setLastResult', () => {
    it('stores an ALLOWED result correctly', () => {
      store.getState().setLastResult(mockAllowedResult);
      const result = store.getState().lastResult;
      expect(result).toEqual(mockAllowedResult);
    });

    it('stores a DENIED result correctly', () => {
      store.getState().setLastResult(mockDeniedResult);
      const result = store.getState().lastResult;
      expect(result).toEqual(mockDeniedResult);
    });

    it('overwrites previous result', () => {
      store.getState().setLastResult(mockAllowedResult);
      store.getState().setLastResult(mockDeniedResult);
      expect(store.getState().lastResult).toEqual(mockDeniedResult);
    });
  });

  describe('reset', () => {
    it('resets scanState to idle', () => {
      store.getState().setScanState('done');
      store.getState().reset();
      expect(store.getState().scanState).toBe('idle');
    });

    it('resets lastResult to null', () => {
      store.getState().setLastResult(mockAllowedResult);
      store.getState().reset();
      expect(store.getState().lastResult).toBeNull();
    });

    it('preserves scanMode after reset', () => {
      store.getState().setScanMode('QR_CODE');
      store.getState().setScanState('done');
      store.getState().setLastResult(mockAllowedResult);
      store.getState().reset();
      expect(store.getState().scanMode).toBe('QR_CODE');
    });

    it('resets multiple state changes at once', () => {
      store.getState().setScanState('validating');
      store.getState().setLastResult(mockDeniedResult);
      store.getState().reset();
      expect(store.getState().scanState).toBe('idle');
      expect(store.getState().lastResult).toBeNull();
    });
  });
});
