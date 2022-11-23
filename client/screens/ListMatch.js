import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, TouchableRipple } from 'react-native-paper'
import { useSelector } from 'react-redux'
import RowComponent from '../components/basic/RowComponent'
import SwiperComp from '../components/basic/SwiperComp'
import tw from '../utils/config/tailwindConf'
import { userRequest } from '../utils/requestMethods'
const user = {
  name: 'test32',
  email: 'test32@gmail.com',
  profession: 'Developer',
  image:
    'https://media-exp1.licdn.com/dms/image/C4E03AQE1Jwbg59S_6A/profile-displayphoto-shrink_200_200/0/1516356309239?e=1671667200&v=beta&t=zWLcHdzbI61fY13I6aaNi0qYgsnoe3k6sYeQzgeDTbY',
  about: 'im a full stack developer',
  links: 'linkdin/sagi.com',
  education: {
    location: 'BeLink',
    time: 12,
    profession: 'developer',
    degree: true,
    _id: '637c914a8ad2ea2e677aa662',
  },
  experience: {
    location: 'BeLink',
    time: 12,
    role: 'developer',
    _id: '637c914a8ad2ea2e677aa663',
  },

  tech: {
    nodejs: 12,
    html: 12,
    css: 12,
    'c#': 5,
  },
  company: {
    isCompany: false,
  },
  match: [
    '63739f1dadb8555970a0492c',
    '6374d3c7eaaddbf3fbce0ea5',
    '6374d342eaaddbf3fbce0d5d',
  ],
  chatList: [],
}

const ListMatch = () => {
  const user = useSelector((state) => state.currentUser.currentUser)
  const [allUsers, setAllUsers] = useState(null)
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()
  const fetchUsers = async () => {
    const userReq = userRequest(user.accessToken) || true
    const res = await userReq.get('match/generate')
    setAllUsers(res.data)
    console.log(res.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
    // console.log(allUsers);
  }, [])
  useEffect(() => {
    // console.log("rendered again!");
    // console.log(isLoading);
    // console.log(allUsers !== null);
    !isLoading && console.log(typeof allUsers[0].id)
    console.log(typeof userId)
    if (!isLoading && allUsers !== null) {
      setAllUsers(allUsers.filter((user) => user.id !== userId))
    }
  }, [userId, isLoading])

  const handleSwipedRight = async (matchUser, index) => {
    const userReq = userRequest(user.accessToken)
    const res = await userReq.patch('/match/swipedRight', { matchId: matchUser.id })
    console.log('match: ' + res.data.match)
    if (res.data.match) {
      console.log('its a match')
    }
    removeFromAllUsers(index)
  }
  return (
    <SafeAreaView style={tw` w-full h-full`}>
      <View style={tw` w-full h-1/4 bg-primary`}></View>
      {allUsers == null ? (
        <Text>loading...</Text>
      ) : (
        allUsers.map((user, index) => {
          return <RowComponent user={user} setUserId={setUserId} />
        })
      )}
    </SafeAreaView>
  )
}

export default ListMatch
