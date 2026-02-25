import { View, TouchableOpacity, Text } from 'react-native';

export default function FilterBar({ setFilter }: any) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10
    }}>
      <TouchableOpacity onPress={() => setFilter('all')}>
        <Text>All</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('completed')}>
        <Text>Completed</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('pending')}>
        <Text>Pending</Text>
      </TouchableOpacity>
    </View>
  );
}