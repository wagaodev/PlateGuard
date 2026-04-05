import React, { useState, useCallback, useMemo } from 'react';
import {
  CustomAlert,
  CustomAlertButton,
  CustomAlertProps,
} from '../components/CustomAlert';

interface AlertState {
  visible: boolean;
  title: string;
  message?: string;
  buttons: CustomAlertButton[];
  icon?: string;
}

const INITIAL_STATE: AlertState = {
  visible: false,
  title: '',
  message: undefined,
  buttons: [{ text: 'OK', style: 'default' }],
  icon: undefined,
};

export function useCustomAlert() {
  const [state, setState] = useState<AlertState>(INITIAL_STATE);

  const dismiss = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  const alert = useCallback(
    (
      title: string,
      message?: string,
      buttons?: CustomAlertButton[],
      icon?: string,
    ) => {
      setState({
        visible: true,
        title,
        message,
        buttons: buttons ?? [{ text: 'OK', style: 'default' }],
        icon,
      });
    },
    [],
  );

  const alertProps: CustomAlertProps = useMemo(
    () => ({
      visible: state.visible,
      title: state.title,
      message: state.message,
      buttons: state.buttons,
      icon: state.icon,
      onDismiss: dismiss,
    }),
    [state, dismiss],
  );

  const AlertComponent = useMemo(
    () =>
      React.createElement(CustomAlert, alertProps),
    [alertProps],
  );

  return { alert, AlertComponent, dismiss };
}
