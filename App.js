
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login'
import Home from './src/screens/home';
import Animation from './src/screens/animation'
import Welcome from './src/screens/welcome';
import Ap from './src/navigation/App'
export default function App() {
  return (
    <View style={{flex: 1}}>
        <Login />
    </View>
  );
}


