import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const paymentMethods = [
  { id: 'momo', name: 'MoMo', icon: 'bank' }, 
  { id: 'cash', name: 'Cash', icon: "bank" },
];

interface PaymentMethodSelectorProps {
  selectedMethod: string | null;
  onSelectMethod: (methodId: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ selectedMethod, onSelectMethod }) => {
  const renderPaymentOption = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        selectedMethod === item.id && styles.selectedOption, 
      ]}
      onPress={() => onSelectMethod(item.id)} 
    >
      {item.id === 'momo' && <MaterialCommunityIcons name={item.icon} size={24} color="purple" />}
      {item.id === 'cash' && <AntDesign name={item.icon} size={24} color="black" />}
      
      <Text style={styles.paymentText}>{item.name}</Text>
      
      {selectedMethod === item.id && <AntDesign name="checkcircle" size={24} color="green" />}
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={paymentMethods}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        renderItem={renderPaymentOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
});

export default PaymentMethodSelector;
