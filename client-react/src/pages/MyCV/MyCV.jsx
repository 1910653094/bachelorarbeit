import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BadmintonIcon, CodingIcon, TravelIcon, ClimbingIcon, HockeyIcon } from '../../assets';
import { Experience, Interest, Skill } from '../../components';
import { ContentContainer, Paragraph } from '../../layout';
import './MyCV.css';

export const MyCV = () => {
    const navigate = useNavigate();

    const getInterests = () => {
        const newInterestsArr = [];
        for (let i = 0; i < interests.length; i++) {
            if (i % 3 === 0) {
                newInterestsArr.push([]);
            }
            newInterestsArr[newInterestsArr.length - 1].push(interests[i]);
        }
        return newInterestsArr;
    };

    return (
        <div className='container'>
            <div className='email-contact-container'>
                Email
                <p>fabian.peyrat01@gmail.com</p>
                or
                <p>contact me
                    <span onClick={() => navigate('/contact')}>here</span>
                </p>
            </div>

            <div className='half-container left'>
                <div className='start-end-container'/>

                <Paragraph title='Expertise'>
                    <div className='expertise-list'>
                        {
                            expertise.map(exp =>
                                <div key={exp}>
                                    <div />{ exp }
                                </div>
                            )
                        }
                    </div>
                </Paragraph>
                <Paragraph title='Languages'>
                    {
                        languages.map(l =>
                            <div key={l.language}>
                                <ContentContainer content={{ title: l.language, subtitle: l.level }} />
                            </div>
                        )
                    }
                </Paragraph>
                <Paragraph title='Interests'>
                    {
                        getInterests()
                            .map(interestsArr =>
                                <div className='interest-list'>
                                    {
                                        interestsArr.map(interest =>
                                                <Interest icon={interest.icon} label={interest.label} />
                                        )
                                    }
                                </div>
                            )
                    }
                </Paragraph>

                <div className='start-end-container'/>
            </div>

            <div className='half-container right'>
                <div className='start-end-container'/>

                <div className='name-container'>
                    <h1>Fabian</h1>
                    <h1>Peyrat</h1>
                    <h1>Full-Stack Developer</h1>
                </div>
                <Paragraph title='Skills'>
                    {
                        skills.map(skill =>
                            <Skill key={skill.name} skill={skill} />
                        )
                    }
                </Paragraph>
                <Paragraph title='Experiences'>
                    {
                        experiences.map(exp =>
                            <Experience key={exp.company} experience={exp} />
                        )
                    }
                </Paragraph>
                <Paragraph title='Education'>
                    {
                        education.map(ed =>
                            <ContentContainer key={ed.subtitle} content={ed} />
                        )
                    }
                </Paragraph>

                <div className='start-end-container'/>
            </div>
        </div>
    );
};

const expertise = [
    'Frontend development', 'Backend development', 'App development'
];
const languages = [
    {
        language: 'German',
        level: 'Mother tongue'
    },
    {
        language: 'French',
        level: 'Mother tongue'
    },
    {
        language: 'English',
        level: 'Fluent in comprehension, speech and writing, lived in Ireland for 5 months (semester abroad), C1 level'
    },
    {
        language: 'Spanish',
        level: '3 Semester of Spanish, B1 Level'
    }
];
const interests = [
    {
        icon: HockeyIcon,
        label: 'Hockey',
    },
    {
        icon: BadmintonIcon,
        label: 'Badminton',
    },
    {
        icon: ClimbingIcon,
        label: 'Climbing',
    },
    {
        icon: TravelIcon,
        label: 'Travel',
    },
    {
        icon: CodingIcon,
        label: 'Coding',
    }
];
const skills = [
    {
        name: 'JavaScript',
        rating: 9
    },
    {
        name: 'CSS',
        rating: 7
    },
    {
        name: 'React',
        rating: 7,
    },
    {
        name: 'Svelte',
        rating: 6,
    },
    {
        name: 'Java',
        rating: 8
    },
    {
        name: 'PHP',
        rating: 7
    },
    {
        name: 'Python',
        rating: 8
    },
    {
        name: 'SQL',
        rating: 8
    },
    {
        name: 'MongoDB',
        rating: 8
    },
];
const experiences = [
    {
        from: 'April 2022',
        to: 'Present',
        company: 'Dynatrace',
        job: 'Internship',
        description: 'Internship at dynatrace where I developed software solutions',
        technologies: ['React', 'TS'],
    },
    {
        from: 'Summer 2021',
        to: 'End 2022',
        company: 'artdirection4u ADVERTISING GmbH',
        job: 'Freelancer',
        description: 'Implementation of a software solution to track work time from employees and also manage vacancy.',
        technologies: ['HTML', 'CSS', 'Svelte (JS)', 'Flask (Python)', 'MongoDB', 'Docker'],
    },
    {
        from: 'Start 2021',
        to: 'Summer 2021',
        company: 'EBS Smart Solutions Software GmbH and MICADO Automation GmbH',
        job: 'Practical project',
        description: 'Group leader and UI/UX tester for a study related project',
        technologies: ['Figma'],
    },
    {
        from: 'Summer 2020',
        to: 'Start 2021',
        company: 'Wasser Tirol - Wasserdienstleistungs-GmbH',
        job: 'Practical project',
        description: 'Backend and little bit of frontend implementation + creation of docker containers for a study related project',
        technologies: ['Flask (Python)', 'React', 'Docker'],
    }
];
const education = [
    {
        from: 'Summer 2021',
        to: 'Start 2022',
        title: 'Semester abroad',
        subtitle: 'Technical university of Dublin, Ireland',
    },
    {
        from: '2019',
        to: '2022',
        title: 'Bachelor of Science in Web Business and Technology',
        subtitle: 'University of Applied Sciences Kufstein, Tirol (Austria)'
    },
    {
        from: '2007',
        to: '2019',
        title: 'Baccalauréat and Matura',
        subtitle: 'Lycée Français de Vienne, Vienna (Austria)'
    },
];
