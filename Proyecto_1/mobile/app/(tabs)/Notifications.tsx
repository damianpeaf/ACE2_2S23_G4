import { View, StyleSheet, FlatList, Text } from 'react-native';
import NotificationItem from '../../components/controllers/NotificationItem';
import { useAppContext } from '../../hooks';

const Notifications = () => {

  const { state } = useAppContext();
  const { notifications } = state;

  return (
    <View style={styles.container}>
      {
        notifications.length == 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>No hay notificaciones</Text>
        </View>
      }

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.message}
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