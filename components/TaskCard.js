import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TaskCard({ task, onToggle }) {
  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      style={[
        styles.card,
        task.completed && styles.completedCard,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${task.title}. ${task.completed ? 'Concluída' : 'Pendente'}`}
    >
      <View style={[
        styles.check,
        task.completed && styles.checked,
      ]}>
        {task.completed && <Text style={styles.checkText}>✓</Text>}
      </View>

      <Text style={[
        styles.title,
        task.completed && styles.completedTitle,
      ]}>
        {task.title}
      </Text>
    </Pressable>
  );
}

export default React.memo(TaskCard);

const styles = StyleSheet.create({
  card: {
    minHeight: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE7EB',
  },
  completedCard: {
    backgroundColor: '#F5F2F4',
  },
  check: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#C9A1B2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  checked: {
    backgroundColor: '#B87991',
    borderColor: '#B87991',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    color: '#393238',
    fontSize: 14,
  },
  completedTitle: {
    color: '#999195',
    textDecorationLine: 'line-through',
  },
});
