import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';
import { Task } from '@/types/task';
import { saveTasks, loadTasks } from '@/utils/storage';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function Home() {
  const router = useRouter();
  const { dark } = useContext(ThemeContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ IMPORTANT
  const [isLoaded, setIsLoaded] = useState(false);

  const bgAnim = useSharedValue(0);

  // ✅ LOAD TASKS SAFELY
  useEffect(() => {
  const fetchTasks = async () => {
    const storedTasks = await loadTasks();

    // ✅ SAFE SET
    if (Array.isArray(storedTasks)) {
      setTasks(storedTasks);
    } else {
      setTasks([]);
    }

    setIsLoaded(true);
  };

  fetchTasks();

  bgAnim.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true);
}, []);
  // ✅ SAVE ONLY AFTER LOAD
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  const addTask = () => {
    if (!text.trim()) return;

    if (editId) {
      setTasks(prev =>
        prev.map(t =>
          t.id === editId ? { ...t, title: text, priority } : t
        )
      );
      setEditId(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: text.trim(),
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    }

    setText('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const editTask = (task: Task) => {
    setText(task.title);
    setPriority(task.priority as any);
    setEditId(task.id);
  };

  const getColor = (p: string) => {
    if (p === 'hard') return '#EF4444';
    if (p === 'medium') return '#F59E0B';
    return '#22C55E';
  };

  const bgStyle = useAnimatedStyle(() => ({
    opacity: 0.9 + bgAnim.value * 0.1,
  }));

  return (
    <Animated.View style={[
      styles.container,
      bgStyle,
      { backgroundColor: dark ? '#020617' : '#F8FAFC' }
    ]}>

      {/* HEADER */}
      <Animated.View entering={FadeInDown.duration(700)} style={styles.header}>
        <View>
          <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>
            Planora
          </Text>
          <Text style={styles.subtitle}>
            Plan your day smartly ✨
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={{ fontSize: 22 }}>⚙️</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* INPUT */}
      <TextInput
        placeholder="What do you want to do today?"
        placeholderTextColor="#9CA3AF"
        value={text}
        onChangeText={setText}
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#1E293B' : '#fff',
            color: dark ? '#fff' : '#000'
          }
        ]}
      />

      {/* PRIORITY */}
      <View style={styles.priorityRow}>
        {['easy', 'medium', 'hard'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.priorityBtn,
              {
                backgroundColor: priority === p ? getColor(p) : '#e5e7eb'
              }
            ]}
            onPress={() => setPriority(p as any)}
          >
            <Text style={{ color: priority === p ? '#fff' : '#000' }}>
              {p.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.addText}>
          {editId ? 'Update Task' : '+ Add Task'}
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100)}>
            <View style={[
              styles.card,
              {
                backgroundColor: item.completed
                  ? (dark ? '#14532D' : '#DCFCE7')
                  : (dark ? '#1E293B' : getColor(item.priority) + '20')
              }
            ]}>

              <View style={styles.topRow}>
                <Text style={[
                  styles.taskText,
                  {
                    color: dark ? '#fff' : '#000',
                    textDecorationLine: item.completed ? 'line-through' : 'none'
                  }
                ]}>
                  {item.title}
                </Text>

                <TouchableOpacity onPress={() => editTask(item)}>
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ color: getColor(item.priority), marginTop: 5 }}>
                {item.priority}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => toggleTask(item.id)}>
                  <Text style={styles.actionText}>
                    {item.completed ? '✔ Done' : 'Mark Done'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={[styles.actionText, { color: 'red' }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </Animated.View>
        )}
      />

    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  title: { fontSize: 32, fontWeight: 'bold' },

  subtitle: { fontSize: 14, color: '#94A3B8' },

  input: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },

  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  priorityBtn: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center'
  },

  addBtn: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  addText: { color: '#fff', fontWeight: '600' },

  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  taskText: {
    fontSize: 16,
    flex: 1
  },

  editIcon: {
    fontSize: 18
  },

  actionText: {
    fontSize: 14,
    color: '#7C3AED'
  },
}); 