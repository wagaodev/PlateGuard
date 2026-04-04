import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useCreateVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { RootStackParamList } from '../../types/navigation.types';
import { useUserStore } from '../../store/userStore';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const VEHICLE_COLORS = ['Branco', 'Prata', 'Preto', 'Vermelho', 'Azul', 'Cinza'];
const VEHICLE_TYPES = ['car', 'motorcycle', 'truck'] as const;

export function useVehicleRegistration() {
  const navigation = useNavigation<Nav>();
  const { name: ownerName } = useUserStore();
  const createMutation = useCreateVehicle();

  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('Branco');
  const [selectedType, setSelectedType] = useState<string>('car');
  const [generateQr, setGenerateQr] = useState(true);

  const handleSubmit = useCallback(async () => {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleanPlate.length < 7) {
      Alert.alert('Placa inválida', 'Insira uma placa com 7 caracteres');
      return;
    }

    try {
      await createMutation.mutateAsync({
        plate: cleanPlate,
        ownerName,
        vehicleType: selectedType,
        vehicleModel: model || undefined,
        vehicleColor: selectedColor,
        generateQrCode: generateQr,
      });
      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível cadastrar o veículo');
    }
  }, [plate, model, selectedColor, selectedType, generateQr, ownerName, createMutation, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    plate,
    setPlate,
    model,
    setModel,
    selectedColor,
    setSelectedColor,
    selectedType,
    setSelectedType,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting: createMutation.isPending,
    vehicleColors: VEHICLE_COLORS,
    vehicleTypes: VEHICLE_TYPES,
  };
}
