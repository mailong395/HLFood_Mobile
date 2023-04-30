import React from 'react'
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Text {...props} label='2' />

const CookItem = () => {
  return (
    <Card style={styles.container}>
      <Card.Title title="Ban 1" subtitle="x10" left={LeftContent} />
    </Card>
  )
}

export default CookItem

const styles = StyleSheet.create({
  container: {
    margin: 16,
  }
})