import { React, useState, useEffect} from 'react'
import Page from '../components/Page'

export default function About() {
    const [contributors, setContributors] = useState([])
    
    useEffect(() => {
      const fetchContributors = async () => {
        const response = await fetch(
          'https://api.github.com/repos/carbon-app/carbon/contributors'
        )
        const contributors = await response.json()
  
        setContributors(
          contributors.filter((contributor) => !contributor.login.includes('bot'))
        )
      }
  
      fetchContributors()
    }, [])
  return (
    <Page>
      <div className="about">
        <div className="mb4">
          <h2>Contributors</h2>
          <br/>
          <div className="contributors-wrapper">
        {contributors.map((contributor) => (
            <a key={contributor.id} href={contributor.html_url} target="_blank" rel="noreferrer">
            <img alt={contributor.login} className="contributor" src={contributor.avatar_url} />
            </a>
        ))}
        </div>
        </div>

       
      </div>
      <style jsx>
        {`
          .about {
            font-size: 16px;
            max-width: 632px;
            margin: 0 auto var(--x4);
          }

          @media (max-width: 768px) {
            .about {
              max-width: 90vw;
            }
          }

          img {
            max-width: 100%;
          }

          h2 {
            font-weight: bold;
            font-size: 32px;
          }
          h4 {
            font-weight: bold;
          }

          p,
          li {
            color: #fff;
          }

          ul {
            list-style-position: inside;
            list-style-type: circle;
          }

          span {
            color: #fff;
          }

          td {
            padding: 0.25rem 0;
          }

          kbd {
            margin-left: var(--x3);
            letter-spacing: 0.1em;
          }

          .contributors-wrapper {
            justify-content: left;
            align-items: left; 
            text-align: left;
            margin-bottom: 50px;
        }
          
        .contributor {
            border-radius: 50%;
            border: 2px solid white;
            width: 32px;
            height: 32px;
            cursor: pointer;
            margin-right: 10px;
            transition: all 0.40s ease;
            margin-bottom: 5px;
        }
        
        .contributor:hover {
            opacity: 0.5;
            transition: all 0.40s ease;
        }
        `}
      </style>
    </Page>
  )
}
