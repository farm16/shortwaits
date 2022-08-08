import { useTheme } from "@/theme"
import React, { useState } from "react"
import { Divider, List } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export const SupportSettings = () => {
  const [expanded, setExpanded] = useState(false)
  const handlePress = () => setExpanded(state => !state)
  const { Colors } = useTheme()

  return (
    <List.Accordion
      title="Support"
      style={{ backgroundColor: Colors.background }}
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />
      <List.Item
        title="Email"
        description={"support@shortwaits.com"}
        right={props => <List.Icon {...props} icon="email" />}
      />
      <Divider />
      <List.Item
        title="Phone"
        description={"123-456-7890"}
        right={props => <List.Icon {...props} icon="phone" />}
      />
    </List.Accordion>
  )
}
