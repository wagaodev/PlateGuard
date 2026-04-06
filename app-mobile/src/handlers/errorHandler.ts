import { useCustomAlert } from '../hooks/useCustomAlert';
import { commonMessages } from '../locales/pt-BR/common';
import { VehicleAccessResponse } from '../types/vehicleAccess.types';

export function useErrorHandler() {
  const { alert, AlertComponent } = useCustomAlert();

  const handleApiError = (result: VehicleAccessResponse) => {
    if (result.feedbackType === 'SERVER_ERROR') {
      alert(commonMessages.alerts.errorTitle, result.message, [
        { text: commonMessages.alerts.ok },
      ], '\u26A0\uFE0F');
      return;
    }
    if (result.feedbackType === 'INVALID_PLATE') {
      alert(commonMessages.camera.invalidPlateTitle, result.message, [
        { text: commonMessages.alerts.ok },
      ], '\u26A0\uFE0F');
    }
  };

  const handleNetworkError = () => {
    alert(commonMessages.alerts.errorTitle, commonMessages.alerts.registrationError, [
      { text: commonMessages.alerts.ok },
    ], '\u274C');
  };

  const handleInvalidPlate = () => {
    alert(commonMessages.camera.invalidPlateTitle, commonMessages.camera.invalidPlateMessage, [
      { text: commonMessages.alerts.ok },
    ], '\u26A0\uFE0F');
  };

  const handleNotFound = (message?: string) => {
    alert(
      commonMessages.camera.notFoundTitle,
      message ?? commonMessages.camera.notFoundMessage,
      [{ text: commonMessages.alerts.ok }],
      '\uD83D\uDD0D',
    );
  };

  const handlePlateNotDetected = () => {
    alert(
      commonMessages.camera.plateNotDetected,
      commonMessages.camera.plateNotDetectedMessage,
      [{ text: commonMessages.alerts.ok }],
      '\uD83D\uDCF7',
    );
  };

  const handleGenericError = (title: string, message: string, icon?: string) => {
    alert(title, message, [{ text: commonMessages.alerts.ok }], icon ?? '\u274C');
  };

  const handleDeleteConfirm = (onConfirm: () => void) => {
    alert(
      commonMessages.alerts.removeVehicle,
      commonMessages.vehicle.deleteConfirm,
      [
        { text: commonMessages.alerts.cancel, style: 'cancel' },
        { text: commonMessages.alerts.remove, style: 'destructive', onPress: onConfirm },
      ],
      '\uD83D\uDDD1\uFE0F',
    );
  };

  const handleSuccess = (title: string, message: string, buttons?: Array<{ text: string; onPress?: () => void }>) => {
    alert(title, message, buttons ?? [{ text: commonMessages.alerts.ok }], '\u2705');
  };

  return {
    handleApiError,
    handleNetworkError,
    handleInvalidPlate,
    handleNotFound,
    handlePlateNotDetected,
    handleGenericError,
    handleDeleteConfirm,
    handleSuccess,
    AlertComponent,
  };
}
