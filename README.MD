# obama cares

## Inspiration

The alarming statistic that only 12% of U.S. adults have proficient health literacy highlights a critical gap in healthcare accessibility. Limited health literacy contributes to increased healthcare burdens, higher emergency department visits, and worsening health disparities. Inspired by this challenge, we set out to create ObamaCares, an intuitive and accessible platform that simplifies healthcare information, empowers individuals to make informed decisions, and reduces preventable health crises.

## What it does

ObamaCares is a user-friendly digital platform designed to enhance health literacy. It creates AI generated 'brainrot' reels based on key medical information, which simplifies and breaks complex topics into easy to understand content. We wanted Personalized Health Guidance by providing tailored healthcare resources based on user needs, as well as Emergency & Preventative Care Insights for example helping users navigate when to seek emergency care vs. preventative interventions.

This was also the premise behind our theme and name of ObamaCares, as Obama is seen frequently in 'brainrot' memes and is a play on "ObamaCare".

## How we built it

We created a beautiful React.js frontend that allows users to scroll through different medical categories of reels and also generate any of their likings. The backend is powered with Flask which serves as the API for our AI generated reels. The AI generated reels work by taking a topic, generating outlines, which get turned into video scripts. From there we created a TTS model to get timestamps and produce human like speech, and then read the audio file to generate wav formats. Finally connecting all of this with a video overlaying it all, and audio synced.

Something else we had been in the process of was taking long form medical content and using AI to cut it up into smaller short form, and then from there overlaying the audio to make it more 'brainrot'. The issue with this approach was that it was too intensive (since we're parsing entire videos) which didnt allow us the seamsless category selection. But it is something on the feature reservoir in the future once we can make it more efficient.

In the future we aimed to add more flavor to the generated content, and make it even more enjoyable for the users. This can be done by mixing entirely AI generated content with real content, and extracting what may be best.
