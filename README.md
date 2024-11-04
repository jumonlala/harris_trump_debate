# 2024 Presidential Debate Analysis: Semantic & Sentiment Insights

## Overview

This project analyzes the semantic content and sentiment expressed in the 2024 Presidential Debate between Kamala Harris and Donald Trump. The debate transcript, sourced from [ABC News](https://abcnews.go.com/Politics/harris-trump-presidential-debate-transcript/story?id=113560542), serves as the data for this analysis. I utilized the Python library *Pattern* for text processing, sentiment analysis, and latent semantic analysis. 

Users can explore topics discussed during the debate using the select box located below the webpage title.

The scatterplot on the left displays the candidates’ phrases or sentences evaluated by *polarity*, *subjectivity*, and *certainty*.  Users can adjust the X and Y axes to view data from different perspectives. Definitions for each measure, along with their ranges, are provided in the [Key Terms and Insights](#key-terms-and-insights) section. Checkboxes at the top left of the scatterplot allow filtering by candidate, with red circles representing Donald Trump’s words and blue circles representing Kamala Harris's words. When you hover over each circle, the sentence or phrase, along with the exact scores of the X and Y axis measures, is displayed.

The columns on the right highlight the top 10 significant words from each sentence, ranked by their weights. These weights indicate how much each word contributes to the sentence's meaning, influencing its positioning in the two-dimensional model generated through latent semantic analysis. Words with higher importance appear at the top in larger fonts.

## Key Terms and Insights

* *Polarity*

    Polarity differentiates between positive and negative sentiments, where +1.0 indicates strongly positive and -1.0 indicates strongly negative.
    For example, 
  
* *Subjectivity*

    Subjectivity measures objectivity versus subjectivity, with a score of 0.0 being strongly objective and +1.0 highly subjective.
  
* *Certainty*

    Certainty measures the degree of confidence, where +1.0 is highly certain and -1.0 indicates low certainty. For example, the Pattern library notes that “I wish it would stop raining” scores -0.35, while “It will stop raining” scores +0.75. This measure has an accuracy of around 68% on Wikipedia texts.


## Data Processing Steps: 

 Using the "Pattern" library (https://github.com/clips/pattern), I processed the text by *tokenizing*, *lemmatizing*, removing words with less significant *particle of speech* and unnecessary and/or unidentified tokens, *singularizing* nouns, fixing *spelling* errors, and removing *stop words*, *punctuations*, and numbers, focusing solely on meaningful words. Each row was also split into single sentences or phrases for more granular analysis.

Details of this process can be found in the `Presidential_Debate_Analysis.ipynb` in the `python` folder. 

## Analysis & Insight Generation: 

I employed Pattern’s semantic analysis tools extensively, first identifying topics based on journalists' questions. Each row was categorized by topic, and then a latent semantic analysis (LSA) was applied per topic. For each sentence, I extracted key words and selected the top words from the combined list. Where data was limited, word selection was based on frequency.

My goal was to determine each candidate’s main concerns, understand their stance on different topics (measured through polarity, subjectivity, and certainty), and assess their sentiment on key issues. The scatterplot highlights differences in positioning and sentiment, showing how each candidate’s language and word choice reveal distinct attitudes.
