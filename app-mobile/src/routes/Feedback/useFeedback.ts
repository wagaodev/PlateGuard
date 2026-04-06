import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleAccessStore } from '../../store/vehicleAccessStore';
import { vehicleAccessMessages } from '../../locales/pt-BR/vehicleAccess';
import { stateConfigs, buildDetailRows } from './feedback.config';
import type { StateConfig, DetailRowData } from './feedback.config';

type FeedbackRoute = RouteProp<RootStackParamList, 'Feedback'>;
type Nav = NativeStackNavigationProp<RootStackParamList>;

interface FeedbackMessages {
  readonly title: string;
  readonly subtitle: string;
}

interface UseFeedbackReturn {
  result: RootStackParamList['Feedback']['result'];
  config: StateConfig;
  detailRows: DetailRowData[];
  messages: FeedbackMessages;
  handleNewScan: () => void;
}

export function useFeedback(): UseFeedbackReturn {
  const navigation = useNavigation<Nav>();
  const route = useRoute<FeedbackRoute>();
  const { reset } = useVehicleAccessStore();
  const { result } = route.params;

  const { feedbackType } = result;

  const config = stateConfigs[feedbackType];

  const messages = vehicleAccessMessages[feedbackType];

  const detailRows = useMemo(
    () => buildDetailRows(feedbackType, result),
    [feedbackType, result],
  );

  const handleNewScan = useCallback(() => {
    reset();
    navigation.navigate('BottomTabs');
  }, [navigation, reset]);

  return {
    result,
    config,
    detailRows,
    messages,
    handleNewScan,
  };
}
