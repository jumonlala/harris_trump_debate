# harris_trump_debate

Data Processing Steps: 

    I spent an extensive amount of time doing data processing.  
    My work can be found in the Presidential_Debate_Analysis.ipynb in the python folder. 
    I used the Python Library "Pattern" Documentation (https://github.com/clips/pattern) for tokenizing, lemmatizing, removing words with less significant particle of speech, unnecessary and/or unidentified tokens, singularizing nouns, fixing spelling errors, removing stop words, removing punctuations, and removing numbers, since I wanted to focus on words. 
    I also divided each row into multiple rows with single sentence. 

Analysis & Insight Generation: 

    I extensively used the Python Library "Pattern" Documentation (https://github.com/clips/pattern) to perform semantic analysis.
    One of the first things I did was identify the topics discussed by looking at the questions posed by the journalists. 
    After I categorized each rows to a topic, I worked on doing a latent semantic analysis by each topic. 
    I extracted words of significance from each sentence, and then extracted final top words from the combined list.
    When there were not enough words, because there were not many sentences available, I selected words by their frequencies. 

    The questions I wanted to answer was what are each candidate passionate about / interested in the most, how do they each appear (measured by the polarity, subjectivity, and certainty of their sentences) when talking about different topics, and how do they feel about certain topics. 
    After I did my analysis, it was really interesting to see how in certain topics, the candidates are positioned in different areas of the scatter plot and how their word choices entirely give off different feelings. 