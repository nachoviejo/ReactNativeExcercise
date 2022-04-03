import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { SectionList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SectionHeader from '~/components/SectionHeader'
import Task from '~/components/Task'
import { getTasks } from '~/service'
import { COLORS } from '~/utils/constants/colors'
import { SECTIONS } from '~/utils/constants/sections'
import { ITask } from '~/utils/interfaces/task'
import { styles } from './styles'

const Screen = () => {
  const [loading, setLoading] = useState(false)
  const [plannedTasks, setPlannedTasks] = useState<ITask[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([])
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getTasks()
    if(!!response){
      setPlannedTasks(response.plannedTasks)
      setInProgressTasks(response.inProgressTasks)
      setCompletedTasks(response.completedTasks)
    }
    setLoading(false)
  }

  const stateChange = async () => {
    const response = await getTasks()
    if(!!response){
      setPlannedTasks(response.plannedTasks)
      setInProgressTasks(response.inProgressTasks)
      setCompletedTasks(response.completedTasks)
    }
  }

  const renderTask = ({ item, section }: any) => {
    return <Task task={item} stateChange={stateChange} colors={section.colors}/>
  }

return (
  <SafeAreaView>
    <SectionList 
      renderItem={renderTask}
      sections={[
        {
          title: 'Planned', 
          data: plannedTasks,
          colors: COLORS.planned
        }, 
        {
          title: 'In Progress',
          data: inProgressTasks,
          colors: COLORS.inProgress
        }, 
        {
          title: 'Completed',
          data: completedTasks,
          colors: COLORS.completed
        }
      ]}
      renderSectionHeader={({section}) => (
        <SectionHeader sectionName={section.title} colors={section.colors} />
      )}
      style={styles.sectionList}
      onRefresh={getData}
      refreshing={loading}
    />
  </SafeAreaView>
)
}

export default Screen
