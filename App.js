import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHander = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ])
    setIsAddMode(false)
    //this method is better cause it's guaranteed to always bring in the most current snapshot of the state
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }
  
  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title = "Add New Goal" onPress = {() => setIsAddMode(true)} />
      <GoalInput visible = {isAddMode} onAddGoal = {addGoalHander} onCancel = {cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor = {(item, index) => item.id}
        data = {courseGoals}
        renderItem = {item =>
          <GoalItem title = {item.item.value} onDelete = {removeGoalHandler} id = {item.item.id} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
