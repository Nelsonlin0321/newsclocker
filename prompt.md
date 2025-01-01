I'm going to optimize the app/page.tsx to further to make it more appealing. Please update the features based on below platform introduction.

Before that, let me introduce newsclocker:

NewsClocker is an intelligent news platform and subscription platform.

The platform offers below features:

User are allowed to subscribe news by tailor their preference,
    including keywords for search news,
    customize news sources selection
    when deliver to them
    News Insight generation based on the user prompt
AI Insight, news clocker is news prompt platform where user can create their own news prompt or share it with others.
With news prompt, are able to generate the news insight with PDF generation based on the user news prompt.
AI Insight mailbox enable user to receive their news and store and manage their historical AI insight news mail.


bolt.new/~/github.com/Nelsonlin0321/newsclocker/tree/feature/bolt-new



 Update components/hero/news-hero.tsx to visualize a flow diagram  
 (1) Consolidate news from different news sources, such as the new york time, bbc, Associated Press yahoo finance, seeking alpha etc to a 
 (2) central AI 
 (3) clock scheduler
 (4) deliver to user mail box.