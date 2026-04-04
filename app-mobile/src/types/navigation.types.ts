import { VehicleAccessResponse } from './vehicleAccess.types';

export type RootStackParamList = {
  BottomTabs:          undefined;
  Feedback:            { result: VehicleAccessResponse };
  VehicleRegistration: undefined;
};

export type BottomTabParamList = {
  Scanner:  undefined;
  Vehicles: undefined;
  Profile:  undefined;
};
