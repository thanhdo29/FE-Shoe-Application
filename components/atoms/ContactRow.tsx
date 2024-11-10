import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Prop {
  icon: keyof typeof Feather.glyphMap;
  value?: string;
  onChangeValue: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder:string
}

const ContactRow: React.FC<Prop> = ({ icon, value, onChangeValue, keyboardType = 'default', placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <View style={styles.infoRow}>
      <View style={styles.iconText}>
        <Feather name={icon} size={20} style={{padding:10, borderRadius:12, backgroundColor:'#F8F9FA'}}/>
        {isEditing ? (
          <TextInput
            style={styles.input}
            defaultValue={value}
            onChangeText={onChangeValue}
            keyboardType={keyboardType}
            autoFocus
            placeholder={placeholder}
           
          />
        ) : (
          <Text style={styles.infoText}>{value}</Text>
        )}
      </View>
      <TouchableOpacity onPress={toggleEdit}>
        <AntDesign name={isEditing ? 'check' : 'edit'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: 200,
  },
});

export default ContactRow;
