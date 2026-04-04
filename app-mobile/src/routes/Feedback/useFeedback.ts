import { useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleAccessStore } from '../../store/vehicleAccessStore';

type FeedbackRoute = RouteProp<RootStackParamList, 'Feedback'>;
type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useFeedback() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<FeedbackRoute>();
  const { reset } = useVehicleAccessStore();
  const { result } = route.params;

  const handleNewScan = useCallback(() => {
    reset();
    navigation.navigate('BottomTabs');
  }, [navigation, reset]);

  return {
    result,
    handleNewScan,
  };
}
