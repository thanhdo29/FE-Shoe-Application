import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PaymentMethodSelector from '~/components/molecules/PaymentMethodSelector';
import ContactRow from '~/components/atoms/ContactRow';


interface Props {
  email: string

  onChangeMenthod: (text: string) => void;
  onChangeEmail: (text: string) => void;
  onChangeNumberphone: (text: string) => void;
  onChangeAdress: (text: string) => void;
  mentThod: string
}

const ContactInfo = (props: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact information</Text>

      <ContactRow
        icon="mail"
        value={props.email}
        onChangeValue={props.onChangeEmail}
        keyboardType="email-address"
        placeholder='Nhập email của bạn'
      />
      
      <ContactRow
        icon="phone"
       
        onChangeValue={props.onChangeNumberphone}
        keyboardType="phone-pad"
        placeholder='Nhập số điện thoại'
      />

      <ContactRow
        icon="map-pin"
  
        onChangeValue={props.onChangeAdress}
        keyboardType="default"
        placeholder='Nhập địa chỉ'
      />

      <Text style={styles.paymentHeader}>Select payment method</Text>
      
      <PaymentMethodSelector
        
        selectedMethod={props.mentThod}
        onSelectMethod={props.onChangeMenthod}
      />

      {props.mentThod && (
        <Text style={styles.selectedPaymentText}>
          Selected payment method: {props.mentThod}
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
