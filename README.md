# UserInfoAssignment(react-native)

# About

================================================

Developed in IntelliJ IDEA 

================================================



# Project structure

       socialPostsTestAssignment
        |
        \= android                          <-- android resource folder  
        |
        |= src                              <-- main source code
        \
            |
            |
            \= AppNavContainer              <-- react-navigation container
            |
            |
               |= assets                    <-- resources (images, locales)
               |= components                <-- stateless and stetefull components
               |= constants                 <-- configs and constants
               |= screens                   <-- App screens     
                                         
        \= ios                       
            |
            \= UserInfoAssignment           <--  iOS resource folder
             
        |= index.js                         <--  entry point
        
        
      
# Assignment as it is


### Social Feed Mobile App

Implement a mobile app using React Native that renders N last social posts from the given JSON
feed. The mobile app should pull updates from the feed with the given interval and update the
displayed list by removing old items and displaying the new ones, so the most recent N posts are
displayed. The user should be able to scroll and view N posts.

Each post record should display:
    •  Post Date (formatted as DD/MM/YYYY HH:MM) in user’s timezone
    •  Author Name
    •  Message body

The mobile app should accept the following configuration:
    • Feed URL
    • Number of posts to display
    • Update interval

Code should be accessible via a public code repository like github.
Provide instructions for building and running the mobile app locally and on iOS emulator.

While implementing, think about loading and rendering performance, memory usage and leaks.

The following feed can be used: http://api.massrelevance.com/MassRelDemo/kindle.json . It supports both CORS and JSONP. It also provides some Web API:
http://dev.massrelevance.com/docs/api/v1.0/stream/#ref-params-standard

Bonus points for more advanced webpack/babel configurations, adding unit tests, atomic
component design and or use of higher order components, and UI/UX best practices.


# Instructions for building and running the mobile app

You need to follow [instuctions](https://facebook.github.io/react-native/docs/getting-started#running-your-react-native-application-2) for Android as I don't have a Mac currently