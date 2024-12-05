import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          // Token is valid, navigate to main screen
          navigation.replace("Main");
        } else {
          // Token is expired, clear storage
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  async function authenticate() {
    const config = {
      issuer: "https://accounts.spotify.com",
      clientId: "8b7d0c7d653a4b7bab5811ef85acfdd5",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative", 
        "playlist-modify-public" 
      ],
      redirectUrl: "exp://localhost:19002/--/spotify-auth-callback", // Ensure this is correctly set
    };

    try {
      const result = await AppAuth.authAsync(config);

      if (result.accessToken) {
        const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
        await AsyncStorage.setItem("token", result.accessToken);
        await AsyncStorage.setItem("expirationDate", expirationDate.toString());

        // Navigate to the main screen after successful login
        navigation.replace("Main");
      } else {
        console.log("Authentication failed, access token is null");
      }
    } catch (error) {
      console.error("Error during authentication: ", error);
    }
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo style={{ textAlign: "center" }} name="spotify" size={80} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on Spotify!
        </Text>

        <View style={{ height: 80 }} />
        <TouchableOpacity
          onPress={authenticate}
          style={styles.authButton}
        >
          <Text style={styles.authButtonText}>Sign In with Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton}>
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={styles.authButtonText}>Continue with phone number</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton}>
          <AntDesign name="google" size={24} color="red" />
          <Text style={styles.authButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton}>
          <Entypo name="facebook" size={24} color="blue" />
          <Text style={styles.authButtonText}>Sign In with Facebook</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: "#1DB954",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 0.8,
  },
  authButtonText: {
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});

export default LoginScreen;
