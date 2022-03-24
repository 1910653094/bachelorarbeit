<template>
  <div class="container">
    <div class="email-contact-container">
      Email
      <p>fabian.peyrat01@gmail.com</p>
      or
      <p>
        contact me
        <router-link :to="{ name: 'Contact' }">here</router-link>
      </p>
    </div>

    <div class="half-container left">
      <div class="start-end-container"></div>

      <Paragraph title="Expertise">
        <div class="expertise-list" v-for="exp in expertise" :key="exp">
          <div>
            <div />
            {{ exp }}
          </div>
        </div>
      </Paragraph>

      <Paragraph title="Languages">
        <div v-for="lang in languages" :key="lang.language">
          <ContentContainer v-bind="{ title: lang.language, subtitle: lang.level }" />
        </div>
      </Paragraph>

      <Paragraph title="Interests">
        <div class="interest-list" v-for="interests in getInterests()" :key="interests">
          <div class="interest-container" v-for="interest in interests" :key="interest.label">
            <div class="interest-icon-container">
              <img :src="interest.icon" :alt="interest.label">
            </div>
            <label>
              {{ interest.label }}
            </label>
          </div>
        </div>
      </Paragraph>

      <div class="start-end-container"></div>
    </div>

    <div class="half-container right">
      <div class="start-end-container"></div>

      <div class="name-container">
        <h1>Fabian</h1>
        <h1>Peyrat</h1>
        <h1>Full-Stack Developer</h1>
      </div>

      <Paragraph title="Skills">
        <div class="skill" v-for="skill in skills" :key="skill.name">
          {{ skill.name }}
          <div class="dots-container">
            <div
                v-for="idx in 11"
                :key="idx"
                :class="['dot', idx <= skill.rating ? 'fill' : '']"
            />
          </div>
        </div>
      </Paragraph>

      <Paragraph title="Experiences">
        <div class="experience" v-for="exp in experiences" :key="exp.company">
          <div class="exp-date">
            {{ exp.from }} - {{ exp.to }}
          </div>
          <h3>{{ exp.company }}</h3>
          <h4 class="job">{{ exp.job }}</h4>
          <p>{{ exp.description }}</p>
          <h4>Technologies: <span>{{ exp.technologies.join(', ') }}</span></h4>
        </div>
      </Paragraph>

      <Paragraph title="Education">
        <ContentContainer
            v-for="ed in education"
            :key="ed.subtitle"
            v-bind="{ title: ed.title, subtitle: ed.subtitle, from: ed.from, to: ed.to }" />
      </Paragraph>

      <div class="start-end-container"></div>
    </div>
  </div>
</template>

<script>
import { ContentContainer, Paragraph } from '@/layouts';
import { BadmintonIcon, ClimbingIcon, CodingIcon, HockeyIcon, TravelIcon } from "@/assets";

export default {
  name: 'CurriculumView',
  components: { ContentContainer, Paragraph },
  data() {
    return {
      expertise: [
        'Frontend development', 'Backend development', 'App development'
      ],
      languages: [
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
      ],
      interests: [
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
      ],
      skills: [
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
      ],
      experiences: [
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
      ],
      education: [
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
      ]
    }
  },
  methods: {
    getInterests() {
      const newInterestsArr = [];
      for (let i = 0; i < this.interests.length; i++) {
        if (i % 3 === 0) {
          newInterestsArr.push([]);
        }
        newInterestsArr[newInterestsArr.length - 1].push(this.interests[i]);
      }
      return newInterestsArr;
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
}


/* Email and link to contact */
.email-contact-container {
  z-index: 1;
  display: flex;
  position: relative;

  font-weight: bold;
  margin: 1rem 0 0 5rem;
}

.email-contact-container > p {
  margin: 0 0.3rem;
  color: var(--tertiary-color);
  font-weight: normal;
}

.email-contact-container > p > a {
  margin: 0 0.3rem;
  color: var(--interactive-color);
  text-decoration: none;
}

.email-contact-container > p > a:hover {
  cursor: pointer;
}


/* divided screen*/
.half-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  min-height: 100%;
  width: 50%;
}

.half-container.left {
  left: 0;
  background-color: var(--background-color);
}

.half-container.right {
  right: 0;
  background-color: var(--shadow-color);
}

.start-end-container {
  height: 6.5rem;
}


/* Interests */
.interest-list {
  display: flex;
  margin-bottom: 1rem;
}

.interest-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  margin-bottom: .75rem;
}

.interest-icon-container {
  padding: .75rem;
  border-radius: 50%;
  background-color: var(--shadow-color);
  margin-bottom: .4rem;
}

[data-theme="dark"] .interest-icon-container {
  background-color: var(--tertiary-color);
}

.interest-icon-container, .interest-icon-container > img {
  width: 2.75rem;
}


/* Name and job */
.name-container {
  padding-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.name-container > h1 {
  text-transform: uppercase;
  font-size: 5rem;
  letter-spacing: .1rem;
}

.name-container > h1:first-child {
  font-weight: lighter;
  margin-bottom: -2rem;
}

.name-container > h1:last-child {
  font-weight: lighter;
  font-size: 1rem;
  letter-spacing: .175rem;

  margin-left: .35rem;
  padding: .4rem 2rem;
  color: var(--background-color);
  background-color: var(--primary-color);
}


/* skill */
.skill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  margin-bottom: .35rem;
}

.dot {
  height: .7rem;
  width: .7rem;
  background-color: var(--background-second);
  border-radius: 50%;
  display: inline-block;
  margin-left: .5rem;
}

.dot.fill {
  background-color: var(--primary-color);
}


/* Experiences */
.experience {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 1.3rem;
}

.experience > h3 {
  font-weight: normal;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.job {
  font-size: .95rem;
  margin-bottom: .2rem;
}

.experience > p {
  color: var(--light-text-color);
  max-width: 30rem;
  text-align: left;
}

.experience > h4 {
  font-weight: normal;
  color: var(--secondary-color);
}

.experience > h4:last-child > span {
  color: var(--tertiary-color);
  margin-left: 1rem;
}

.exp-date {
  font-size: .9rem;
  color: var(--secondary-color);
  margin-bottom: .05rem;
}


/* Expertise */
.expertise-list {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.expertise-list > div {
  display: flex;
  align-items: center;
  margin-bottom: .25rem;
}

.expertise-list > div > div {
  border-radius: 50%;
  border: 1px solid var(--background-second);
  color: var(--background-color);
  height: .25rem;
  width: .25rem;
  margin-right: .5rem;
}
</style>
