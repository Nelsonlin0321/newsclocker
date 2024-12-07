You're professional Full stack engineer specialized at building full-stack application using Next.JS. Now, you're given a project. 
The project goal is to build a news subscription platform that allows users to create a email notification job. The email is to send the news by user job settings.

## The setting includes:
- keywords: A list of keywords that users want to search the news
- language: (language_code)
- date_range:  any_time | past_hour | past_24_hours | past_week | pass_month | past_year
- active: boolean
- frequency: every_12_hour | every_day | every_week
- time_to_send: 12:00
- AM_OR_PM: (if the frequency is every_12_hour, this field is not applicable ) 


## You need to create below pages to fulfill the application requirements:

### Landing page
- header with sign-in and sign-up button, and user profile button. 
- footer
- A attractive design of landing page with slogan like a pro website

### User profile button
- Click the profile button, there's user works space and logout dropdown menu

### User Workspace
- Design the user workspace with great user experience to list of the news keywords subscription with next run time, active.

## User Subscription page:
- Once user click one of keywords subscription, there's input that allow input the keywords at tags, language, date_range ,active frequency and AM_OR_PM options, and a button called search .
- This example format of search result: After the user click the search button, the subscription page will show the search results, including title, snippet, date, source and image.
```json
{
  "searchParameters": {
    "q": "apple inc",
    "type": "news",
    "engine": "google"
  },
  "news": [
    {
      "title": "The Inside Story of Apple Intelligence",
      "link": "https://www.wired.com/story/plaintext-the-inside-story-of-apple-intelligence/",
      "snippet": "Apple's leaders claim the company wasn't late to generative AI, but instead following what has become its familiar playbook: try to be the...",
      "date": "15 hours ago",
      "source": "WIRED",
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgiU772gcRzqDky78wSeJidjEtib80h1MO9MymbkBbbtZojAhamv6kKovWDg&s",
      "position": 1
    },
    {
      "title": "Apple Plans Three-Year Modem Rollout in Bid to Top Qualcomm",
      "link": "https://finance.yahoo.com/news/apple-prepares-three-modem-rollout-164412669.html",
      "snippet": "(Bloomberg) -- Apple Inc. is preparing to finally bring one of its most ambitious projects to market: a series of cellular modem chips that...",
      "date": "11 hours ago",
      "source": "Yahoo Finance",
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sbw0sjRItHaLBZDZvNcYnMh1bwsbtVwOL0S-wprITAcjpAJ5FXb0vVu0Ig&s",
      "position": 2
    },
  ]
  }

```

## These are the tech-stack you need to create this news email notification subscription platform:
- nextjs react typescript
- app router
- shadcn ui



- clerk auth
- prisma ORM
- mongodb


You are a professional Full Stack Engineer tasked with building a news subscription platform using Next.js. Users should be able to create customized email notifications containing news articles based on their chosen keywords and preferences.

Core Features:

    User Authentication: Implement secure user registration and login using Clerk Auth.
    Subscription Management:
        Allow users to create, edit, and delete news subscriptions.
        Each subscription should include:
            Keywords: A list of keywords to search for in news articles.
            Language: The language of the desired news articles (using language codes).
            Date Range: Filter articles by publication date (e.g., past hour, past 24 hours, past week, past month, past year, any time).
            Frequency: How often the email notification should be sent (e.g., every 12 hours, every day, every week).
            Time to Send: The preferred time for receiving the email notification (if frequency is set to every 12 hours, offer AM/PM selection).
            Active Status: Enable/disable subscriptions.
    News Search and Retrieval:
        Utilize a news API based on serper.dev api to fetch relevant news articles based on user-defined keywords and filters.
        Display search results on the subscription page with title, snippet, date, source, and image.
    Email Notifications:
        Develop a system to send email notifications to users at their chosen frequency with a curated list of news articles matching their subscription settings.

Technical Requirements:

    Frontend: Next.js, React, TypeScript, Shadcn UI
    Authentication: Clerk Auth
    Backend: Node.js, Prisma ORM
    Database: MongoDB
    Routing: Next.js App Router

User Interface:

    Landing Page:
        Visually appealing design with a professional aesthetic.
        Clear call to action with sign-in and sign-up buttons.
        User profile button (if logged in).
    User Profile:
        Dropdown menu accessible from the profile button with options for "Workspace" and "Logout."
    User Workspace:
        Intuitive dashboard listing all active news subscriptions.
        Display key information for each subscription: keywords, next run time, and active status.
    Subscription Page:
        User-friendly form for creating and editing subscriptions with input fields for all required settings.
        "Search" button to preview news results based on the entered criteria.
        Clear and organized display of search results.

Deliverables:

    A fully functional Next.js application meeting the outlined requirements.
    Well-structured and documented code.
