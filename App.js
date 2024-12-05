import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import HomeScreen from "./screens/HomeScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  return (
    <>
      <PlayerContext>
        <Navigation />
        <ModalPortal/>
      </PlayerContext>
    </>



  
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
