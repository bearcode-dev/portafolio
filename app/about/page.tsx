import React from 'react'
import { AboutType } from '../components/types/types'
import { getAboutParagraphsV2 } from '../requests/requests'
import AboutBody from '../components/AboutBody'

const About = async () => {
  const paragraphs = await getAboutParagraphsV2()
  return (
    <>
      <AboutBody paragraphs={paragraphs} />
    </>
  )
}

export default About
