import React,{useState, useEffect} from 'react'
import alanBtn from "@alan-ai/alan-sdk-web" //import alan button and initializing it, using useEffect
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import { NewsCards } from './components';
import useStyles from './styles';
import logo from './logo.png';

const alanKey='45bd57e9eb8e96d8364a09ba1fd1304d2e956eca572e1d8b807a3e2338fdd0dc/stage';

export default function App() {
  
const [newsArticles, setNewsArticles] = useState([]); 
const [activeArticle, setActiveArticle] = useState(0);//for highlight active article, an underline 


const classes = useStyles();

    useEffect(()=>{
        alanBtn({
            key:alanKey,
            //alan listen command below code
            onCommand: ({ command, articles, number }) => {
              //serch by source, term, catergories
                if (command === 'newHeadlines') {
                  setNewsArticles(articles);
                   setActiveArticle(-1); //to start from 1st box article (page2)
                }
                //for highlight active article, an underline
                else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1); //use previous state change current state
                }
                //to open article with number
                 else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
              },
            });
          }, []);
        
          return (
            <div>
              <div className={classes.logoContainer}>
                {/* if-else condition */}
                {newsArticles.length ? (
                  <div className={classes.infoContainer}>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                  </div>
                ) : null}
                <img src={logo} className={classes.alanLogo} alt="logo" />
              </div>
              <NewsCards articles={newsArticles} activeArticle={activeArticle} />
              {/* if-else condition */}
              {!newsArticles.length ? (
                <div className={classes.footer}>
                  <Typography variant="body1" component="h2">
                    Created by Prathmesh Asole
                  </Typography>
                </div>
              ) : null}
            </div>
          );
        };
        

        