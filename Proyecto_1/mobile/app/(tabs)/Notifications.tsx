import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NotificationItem from '../../components/controllers/notification';
import { useAppContext } from '../../hooks';


const notifications = [
  {
    id: 1,
    message: 'La luz se encendio!',
    type: 'notifications-circle',
    timestamp: 'Hace un momento',
  },
  {
    id: 2,
    message: 'La temperatura ha disminuido',
    type: 'notifications-circle',
    timestamp: 'Hace un momento',
  },
  {
    id: 3,
    message: 'La cantidad de C02 ha aumentado',
    type: 'warning',
    timestamp: 'Hace un momento',
  },
];

const Notifications = () => {

  // const { state } = useAppContext();
  // const { notifications} = state;

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </View>
  )
}



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

export default Notifications