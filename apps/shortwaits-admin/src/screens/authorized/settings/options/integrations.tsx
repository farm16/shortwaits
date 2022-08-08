import { useTheme } from "@/theme"
import React, { useState } from "react"
import { Divider, List } from "react-native-paper"

export const IntegrationsSettings = ({ business }) => {
  const [expanded, setExpanded] = useState(false)
  const handlePress = () => setExpanded(state => !state)
  const { Colors } = useTheme()

  return (
    <List.Accordion
      title="Video conferences"
      style={{ backgroundColor: Colors.background }}
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />
      <List.Item
        title="Zoom"
        right={props => <List.Icon {...props} icon="video" />}
      />
      <Divider />
      <List.Item
        title="Google"
        right={props => <List.Icon {...props} icon="google" />}
      />
      <List.Item
        title="Add URL link"
        right={props => <List.Icon {...props} icon="link-plus" />}
      />
    </List.Accordion>
  )
}
