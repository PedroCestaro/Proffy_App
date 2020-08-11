import {StyleSheet} from 'react-native';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_400Regular_Italic } from '@expo-google-fonts/poppins';
import { Archivo_700Bold } from '@expo-google-fonts/archivo';

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#8257E5',
        justifyContent:'center',
        padding: 40
    },

    banner:{
        width: '100%'
    },

    title:{
        fontFamily: 'Poppins_400Regular',
        color:'#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop:80
    },

    titleBold:{
       fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer:{
        flexDirection:'row',/*Deixa os itens lado a lado*/
        marginTop: 40,
        justifyContent:'space-between' /*Separar os itens*/
    },

    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },

    buttonPrimary:{
        backgroundColor:'#9871f5'
    },

    buttonSecondary:{
        backgroundColor:'#04d361'
    },

    buttonText:{
        fontFamily: 'Archivo_700Bold',
        color:'#fff',
        fontSize: 20
    },

    totalConnections:{
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize:12,
        lineHeight:20,
        maxWidth: 140,
        marginTop: 40
    }

});

export default styles;