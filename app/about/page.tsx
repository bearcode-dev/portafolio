import React from 'react'
import { AboutType } from '../components/types/types'
import { getAboutParagraphsV2, getSkillCategoriesV2 } from '../requests/requests'
import AboutBody from '../components/AboutBody'

const About = async () => {
  const paragraphs = await getAboutParagraphsV2()
  const skillCategories = await getSkillCategoriesV2()

  return (
    <>
      <AboutBody paragraphs={paragraphs} skillCategories={skillCategories} />
    </>
  )
}

export default About
