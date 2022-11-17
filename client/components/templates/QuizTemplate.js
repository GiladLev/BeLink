import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import tw from '../../utils/config/tailwindConf'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../utils/redux/slices/userSlice'
import UIButton from '../basic/UIButton'
import Input from '../basic/Input'
import { useNavigation } from '@react-navigation/native'

const QuizTemplate = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { data } = props

  const [inputData, setInputData] = useState('')

  const user = useSelector((state) => state.user.value)

  const handlePress = () => {
    console.log('quiz template data: ' + data)
    console.log('quiz template property: ' + props.Property)

    // const updatedUser = { property: props.property, value: data }
    dispatch(updateUser({ property: props.Property, value: data }))
    console.log(user)
  }

  return (
    <>
      <View style={tw`w-full h-full bg-white `}>
        <View style={tw`flex-1 bg-primary p-5 flex justify-end`}>
          <Text
            style={tw`text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-white`}
          >
            {props.Title}
          </Text>
        </View>

        <View style={tw`flex-4 flex justify-center`}>{props.elements}</View>

        <View style={tw`flex-1 flex justify-end p-5`}>
          <UIButton
            onPress={() => {
              handlePress()
              navigation.navigate(props.navigateTo)
            }}
            padding="5"
            color="primary"
            text="send"
            textColor="white"
            textSize="2xl"
            rounded="full"
          ></UIButton>
        </View>
      </View>
    </>
  )
}

export default QuizTemplate
