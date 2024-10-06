import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useState, useEffect } from "react"
import { Picker } from '@react-native-picker/picker';


export default function App() {

  const [text, setText] = useState("");
  const [chosenLanguage, setChosenLanguage] = useState([]);
  const [selected, setSelected] = useState("");
  console.log(chosenLanguage);


  useEffect(() => {
    voiceOptions()
  }, []);

  const voiceOptions = async () => {
    const voices = await Speech.getAvailableVoicesAsync();

    console.log(voices);
    setChosenLanguage(voices)
  }

  const speak = () => {
    const thingToSay = text;
    const options = {
      //"en-us-x-iol-local"
      voice: selected
    }
    Speech.speak(thingToSay, options);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={text => setText(text)} />
      <Button title="Press to hear text" onPress={speak} />
      <Picker
        style={styles.picker}
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemIndex, itemIndex);

          setSelected(itemValue);
        }
        }>
        {chosenLanguage.map(obj => (<Picker.Item label={obj.language} value={obj.identifier} key={obj.language} />))}
      </Picker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 50
  },
  picker: {
    width: 200,
  }
});
