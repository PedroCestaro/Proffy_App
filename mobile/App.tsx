import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading} from 'expo';
import {Archivo_400Regular, Archivo_700Bold, useFonts} from './node_modules/@expo-google-fonts/archivo';
import {Poppins_400Regular, Poppins_600SemiBold} from './node_modules/@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';




export default function App() {

  let [fontesLoaded] = useFonts({
    Archivo_400Regular, 
    Archivo_700Bold,
    Poppins_400Regular, 
    Poppins_600SemiBold
  }
  );/*atribuindo as fontes*/

  if(!fontesLoaded){
    return <AppLoading/>;
  } else{

    return (
    </*Fragment, div genérica*/>
    <AppStack/>
    <StatusBar style="light" />
    </>
  );
}

}
