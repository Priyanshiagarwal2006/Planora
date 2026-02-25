import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: Props) {
  const getColor = () => {
    if (task.priority === 'high') return 'red';
    if (task.priority === 'medium') return 'orange';
    return 'green';
  };

  return (
    <View style={{
      padding: 15,
      marginVertical: 6,
      borderRadius: 10,
      backgroundColor: '#f2f2f2'
    }}>
      <Text style={{
        fontSize: 16,
        textDecorationLine: task.completed ? 'line-through' : 'none'
      }}>
        {task.title}
      </Text>

      <Text style={{ color: getColor() }}>
        {task.priority.toUpperCase()}
      </Text>

      <Text style={{ fontSize: 12 }}>
        {new Date(task.createdAt).toLocaleTimeString()}
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={() => onToggle(task.id)}>
          <Text style={{ marginRight: 20 }}>✔</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}