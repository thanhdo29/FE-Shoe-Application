import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PaymentMethodSelector from '~/components/molecules/PaymentMethodSelector';
import ContactRow from '~/components/atoms/ContactRow';

const ContactInfo = () => {
  const [email, setEmail] = useState('rumenhussen@gmail.com');
  const [phone, setPhone] = useState('+88-692-764-269');
  const [address, setAddress] = useState('123 Main St, City, Country');
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>('cash');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact information</Text>

      <ContactRow
        icon="mail"
        value={email}
        onChangeValue={setEmail}
        keyboardType="email-address"
      />
      
      <ContactRow
        icon="phone"
        value={phone}
        onChangeValue={setPhone}
        keyboardType="phone-pad"
      />

      <ContactRow
        icon="map-pin"
        value={address}
        onChangeValue={setAddress}
        keyboardType="default"
      />

      <Text style={styles.paymentHeader}>Select payment method</Text>
      
      <PaymentMethodSelector
        selectedMethod={selectedPaymentMethod}
        onSelectMethod={setSelectedPaymentMethod}
      />

      {selectedPaymentMethod && (
        <Text style={styles.selectedPaymentText}>
          Selected payment method: {selectedPaymentMethod}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    margin: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paymentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  selectedPaymentText: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
});

export default ContactInfo;
