// Mock data object used for LineChart and BarCh
import AsyncStorage from '@react-native-async-storage/async-storage'



const token =
  AsyncStorage.getItem('token')
  .then((value) => {
  const data = JSON.parse(value);
  return data
  });


  export { token }