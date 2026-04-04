import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUserStore } from '../../store/userStore';
import { RootStackParamList } from '../../types/navigation.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useProfile() {
  const navigation = useNavigation<Nav>();
  const { name, role, unit, avatarUri, setAvatar } = useUserStore();

  const handlePickAvatar = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.8,
    });

    if (result.assets?.[0]?.uri) {
      setAvatar(result.assets[0].uri);
    }
  }, [setAvatar]);

  const handleAddVehicle = useCallback(() => {
    navigation.navigate('VehicleRegistration');
  }, [navigation]);

  return {
    name,
    role,
    unit,
    avatarUri,
    handlePickAvatar,
    handleAddVehicle,
  };
}
