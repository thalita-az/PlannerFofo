import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskCard from './TaskCard';

function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyNote}>
        <Text style={styles.emptyTitle}>Nenhuma tarefa adicionada</Text>
        <Text style={styles.emptyText}>
          Suas tarefas aparecerão aqui quando você adicionar uma.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard task={item} onToggle={onToggle} />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default React.memo(TaskList);

const styles = StyleSheet.create({
  list: {
    paddingTop: 13,
    paddingHorizontal: 2,
    paddingBottom: 22,
  },
  emptyNote: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE7EB',
    padding: 25,
    alignItems: 'center',
    marginTop: 18,
  },
  emptyTitle: {
    color: '#393238',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#898187',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
});
