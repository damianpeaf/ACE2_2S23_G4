import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotificationI } from '../../interface';

interface Props {
  item: NotificationI
}

const itemIcon = {
  "info": <Ionicons name="notifications-circle-outline" size={24} color="black" />,
  "warning": <Ionicons name="alert" size={24} color="black" />,
  "error": <Ionicons name="warning" size={24} color="black" />,
}

const NotificationItem = ({ item }: Props) => (
  <View style={styles.notificationContainer}>
    {
      itemIcon[item.type]
    }
    <Text style={styles.notificationMessage}>{item.message}</Text>
    <Text style={styles.notificationTimestamp}>
      {new Date(item.timestamp).toLocaleString()}
    </Text>
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