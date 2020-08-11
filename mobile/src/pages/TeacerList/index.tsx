import React, { useState} from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather} from '@expo/vector-icons';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList(){
    const [teachers, setTeachers] = useState([/*começa como array vazio*/]);
    const[isFilterVisible,setIsFilterVisible] = useState(false);
    const[favorites,setFavorites] = useState<number[]>([]);
    const[subject,setSubject] = useState('');
    const[week_day,setWeekDay] = useState('');
    const[time,setTime] = useState('');


    function loadFavorites(){      AsyncStorage.getItem("favorites").then(response =>{
      if(response){
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
          return teacher.id;
        })

        setFavorites(favoritedTeachers);
      }
    });
  }/*recebe uma função e no array define qndo vai disparar, ele vazio dispara 1x*/


  useFocusEffect(()=>{
    loadFavorites();
  });

    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

   async function handleFiltersSubmit(){
    
    loadFavorites();
    
    const response = await api.get("classes",{
          params:{
          subject,
          week_day,
          time}
      }); 
  
      setIsFilterVisible(false);
      setTeachers(response.data);
      console.log(setTeachers);
  }
    

    return(
        <View style={styles.container}>
            <PageHeader 
              title="Proffys disponíveis" 
              headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                  <Feather name="filter" size={20} color="#fff"/>
                </BorderlessButton>
              )}
            >
              { isFilterVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>
                        Matéria

                      <TextInput
                      value={subject}
                      onChangeText={text => setSubject(text)}/*Recebe o texto digitado, depois repassa escrevendo no BD*/
                      placeholderTextColor='#c1bccc'
                      style={styles.input}
                      placeholder="Qual a matéria?"
                      />
                    </Text>

                    <View style={styles.inputGroup}>
                      <View style={styles.inputBlock}>
                      <Text style={styles.label}>
                        Dia da semana

                      <TextInput
                       value={week_day}
                       onChangeText={text => setWeekDay(text)}
                      placeholderTextColor='#c1bccc'
                      style={styles.input}
                      placeholder="Qual o dia?"
                      />
                    </Text>
        
                      </View>

                        <View style={styles.inputBlock}>
                        <Text style={styles.label}>
                          Horário

                        <TextInput
                         value={time}
                         onChangeText={text => setTime(text)}
                        placeholderTextColor='#c1bccc'
                        style={styles.input}
                        placeholder="Qual horário?"
                        />
                    </Text>
        
                      </View>
                    </View>
                  <RectButton 
                  onPress={handleFiltersSubmit}
                  style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>
                          Filtrar
                      </Text>
                  </RectButton>

                </View>
              )}
            </PageHeader>
        
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    /*Atualiza o conteúdo dentro do Scroll*/
                    paddingHorizontal:16,
                    paddingBottom:16
                }}
            >
              {teachers.map((teacher: Teacher )=>{
                  return (
                  <TeacherItem 
                  key={teacher.id} 
                  teacher={teacher}
                  favorited={favorites.includes(teacher.id)}
                  />) /*Aqui ele puxa do banco de dados e atribui um novo obj Screen na listagem*/
              })}
        

            </ScrollView>

        </View>
    );
}

export default TeacherList;