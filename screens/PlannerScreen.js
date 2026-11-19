import React, { useCallback, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';

import TaskList from '../components/TaskList';
import { createTask, toggleTask } from '../services/taskService';

export default function PlannerScreen() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  function handleAddTask() {
    if (!taskTitle.trim()) {
      Alert.alert('Atenção', 'Digite uma tarefa antes de adicionar.');
      return;
    }

    setTasks((currentTasks) => [...currentTasks, createTask(taskTitle)]);
    setTaskTitle('');
  }

  const handleToggleTask = useCallback((taskId) => {
    setTasks((currentTasks) => toggleTask(currentTasks, taskId));
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0
    ? 0
    : Math.round((completedCount / totalCount) * 100);

  const getNote = () => {
    if (totalCount === 0) return 'Adicione tarefas para organizar seu dia.';
    if (completedCount === totalCount) return 'Todas as tarefas foram concluídas!';
    if (completedCount > 0) return 'Você está progredindo. Continue assim!';
    return 'Organize suas prioridades e comece.';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F8" />

      <View style={styles.page}>
        <View style={styles.topLine}>
          <Text style={styles.brand}>PlannerFofo</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.kicker}>ORGANIZAÇÃO PESSOAL</Text>
          <Text style={styles.heading}>Minhas tarefas</Text>
          <Text style={styles.subtitle}>
            Planeje seu dia e acompanhe seu progresso.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progresso do dia</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressMessage}>{getNote()}</Text>
            <Text style={styles.progressCount}>
              {completedCount}/{totalCount}
            </Text>
          </View>
        </View>

        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>Adicionar tarefa</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite uma tarefa..."
            placeholderTextColor="#A6A0A3"
            value={taskTitle}
            onChangeText={setTaskTitle}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />

          <Pressable style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+ Adicionar tarefa</Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Lista de tarefas</Text>
          <Text style={styles.listCount}>
            {totalCount} {totalCount === 1 ? 'tarefa' : 'tarefas'}
          </Text>
        </View>

        <TaskList tasks={tasks} onToggle={handleToggleTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F8',
  },
  page: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 17,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#B87991',
    fontSize: 17,
    fontWeight: 'bold',
  },
  titleSection: {
    marginTop: 35,
    marginBottom: 23,
  },
  kicker: {
    color: '#B87991',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.4,
  },
  heading: {
    color: '#393238',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 7,
  },
  subtitle: {
    color: '#898187',
    fontSize: 13,
    marginTop: 6,
  },
  progressCard: {
    backgroundColor: '#F1E9ED',
    borderRadius: 14,
    padding: 17,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    color: '#55464E',
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    color: '#B87991',
    fontSize: 17,
    fontWeight: 'bold',
  },
  progressTrack: {
    height: 7,
    borderRadius: 10,
    backgroundColor: '#E1D5DB',
    overflow: 'hidden',
    marginTop: 13,
  },
  progressFill: {
    height: 7,
    borderRadius: 10,
    backgroundColor: '#B87991',
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 11,
  },
  progressMessage: {
    color: '#776B72',
    fontSize: 11,
    flex: 1,
  },
  progressCount: {
    color: '#776B72',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addSection: {
    marginTop: 28,
  },
  sectionTitle: {
    color: '#393238',
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9E2E6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: '#393238',
    marginTop: 12,
  },
  addButton: {
    backgroundColor: '#B87991',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  listCount: {
    color: '#999195',
    fontSize: 12,
  },
});
