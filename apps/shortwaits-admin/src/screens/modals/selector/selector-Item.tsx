import React from "react"
import { useDispatch } from "react-redux"

import { ButtonCard, Spinner } from "@/components"
import { selectorConfigs } from "./selector-config"
import { SelectorModalType } from "@/navigation"
import { View } from "react-native"
import { ObjectId } from "shortwaits-shared/build/main/types/common"

interface SelectorItemProps {
  type: SelectorModalType
  index: number
  isSelected: boolean
  disabled: boolean
  itemId: ObjectId
}

export function SelectorItem(props: SelectorItemProps) {
  const { isSelected, disabled, type, itemId } = props
  const dispatch = useDispatch()

  const { data, error, isLoading }: any =
    selectorConfigs[type].itemQueryHook(itemId)
  console.log("itemId>>>", itemId)
  console.log("data>>>", data)

  const queryData = selectorConfigs[type].filterItemQuery(data)

  return isLoading ? (
    <Spinner />
  ) : (
    <View>
      <ButtonCard
        disabled={disabled}
        title={selectorConfigs[type].getTileTitle(queryData)}
        subTitle={
          selectorConfigs[type].getTileSubTitle(queryData)
            ? selectorConfigs[type].getTileSubTitle(queryData)
            : undefined
        }
        onPress={() => {
          console.log("pressed >>>", queryData)
          dispatch(selectorConfigs[type].action(queryData))
        }}
        rightIconName={
          isSelected
            ? selectorConfigs[type].icons.selected
            : selectorConfigs[type].icons.default
        }
      />
    </View>
  )
}
