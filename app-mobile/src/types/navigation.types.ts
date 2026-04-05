import { VehicleAccessResponse } from './vehicleAccess.types';
import { VehicleLookupResponse } from './vehicleLookup.types';

export type RootStackParamList = {
  BottomTabs:          undefined;
  Feedback:            { result: VehicleAccessResponse };
  PlateCapture:        undefined;
  VehicleRegistration: { lookupData: VehicleLookupResponse };
};

export type BottomTabParamList = {
  Scanner:  undefined;
  Vehicles: undefined;
  Profile:  undefined;
};
