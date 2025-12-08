"use client"
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';
import { ExperiencePathProps } from './experiencePath';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLanguage } from '../providers/LanguageProvider';
import { Locale } from '../lib/dictionary';

interface TimelineProps {
    experiences: ExperiencePathProps[];
}

const formatDate = (dateString: string, lang: Locale) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const locale = lang === 'es' ? es : enUS;
    const formatted = format(date, 'MMM yyyy', { locale });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const ExperienceTimeline = ({ experiences }: TimelineProps) => {
    const { lang, t } = useLanguage();

    return (
        <VerticalTimeline lineColor="#024441">
            {experiences.map((item, index) => (
                <VerticalTimelineElement
                    key={index}
                    visible={true}
                    className="vertical-timeline-element--work"
                    contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.9)', 
                        backdropFilter: 'blur(10px)',
                        color: '#333', 
                        borderTop: '4px solid #024441',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                    contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                    date={`${formatDate(item.startDate, lang)} - ${item.endDate ? formatDate(item.endDate, lang) : t.common.present}`}
                    dateClassName="font-bold text-brand-green mx-4"
                    iconStyle={{ background: '#024441', color: '#fff' }}
                    icon={
                        <div className="w-full h-full flex items-center justify-center">
                            {item.cover ? (
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white p-1">
                                    <img src={item.cover} alt="company logo" className="w-full h-full object-contain rounded-full bg-white"/>
                                </div>
                            ) : (
                                <Briefcase className="w-6 h-6" />
                            )}
                        </div>
                    }
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                         <h3 className="vertical-timeline-element-title text-xl font-bold font-poiret text-gray-800">
                            {item.title}
                        </h3>
                    </div>
                   
                    <h4 className="vertical-timeline-element-subtitle text-gray-600 font-semibold mb-4 border-b border-gray-100 pb-2">
                        {item.position}
                    </h4>
                    
                    <ul className="mt-2 space-y-2">
                        {item.activities.map((activity, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start">
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green shrink-0"></span>
                                {activity}
                            </li>
                        ))}
                    </ul>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default ExperienceTimeline;
