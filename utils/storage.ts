import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_KEY = 'TASKS_STORAGE';

export const saveTasks = async (tasks: any[]) => {
  try {
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.log('Save error:', e);
  }
};

export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASK_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Load error:', e);
    return [];
  }
};