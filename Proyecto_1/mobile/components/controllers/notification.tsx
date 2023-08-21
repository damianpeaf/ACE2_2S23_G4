import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// https://www.svgrepo.com/svg/499912/light-bulb
const NotificationItem = ({ item } ) => (
  <View style={styles.notificationContainer}>
    <Ionicons name={item.type} size={24} color="black" />
    <Text style={styles.notificationMessage}>{item.message}</Text>
    <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  notificationContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
export default NotificationItem