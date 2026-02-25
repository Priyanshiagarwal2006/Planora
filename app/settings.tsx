import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';

export default function Settings() {
  const router = useRouter();
  const { dark, toggleTheme } = useContext(ThemeContext);

  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: dark ? '#020617' : '#F8FAFC' }
      ]}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: dark ? '#fff' : '#000' }]}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>
          Settings
        </Text>

        <View style={{ width: 20 }} />
      </View>

      {/* DARK MODE */}
      <View style={[
        styles.card,
        { backgroundColor: dark ? '#1E293B' : '#fff' }
      ]}>
        <Text style={[styles.label, { color: dark ? '#fff' : '#000' }]}>
          Dark Mode
        </Text>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>

      {/* NOTIFICATIONS */}
      <View style={[
        styles.card,
        { backgroundColor: dark ? '#1E293B' : '#fff' }
      ]}>
        <Text style={[styles.label, { color: dark ? '#fff' : '#000' }]}>
          Notifications
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },

  header: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  back: {
    fontSize: 24,
    fontWeight: '600'
  },

  title: {
    fontSize: 22,
    fontWeight: '700'
  },

  card: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  label: {
    fontSize: 16,
    fontWeight: '500'
  }
});