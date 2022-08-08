import { useTheme } from "@/theme"
import React, { useState } from "react"
import { Divider, List } from "react-native-paper"

export const BusinessInfoSettings = ({ business }) => {
  const [expanded, setExpanded] = useState(false)
  const handlePress = () => setExpanded(state => !state)
  const { Colors } = useTheme()

  return (
    <List.Accordion
      title="Business Information"
      style={{ backgroundColor: Colors.background }}
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />
      <List.Item
        title="Business Name"
        description={business.longName || business.shortName}
        right={props => <List.Icon {...props} icon="store" />}
      />
      <Divider />
      <List.Item
        title="Business Currency"
        description={business.currency.code}
        right={props => <List.Icon {...props} icon="currency-usd" />}
      />
    </List.Accordion>
  )
}
