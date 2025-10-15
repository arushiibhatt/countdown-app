# Custom Countdown Tool

A customizable countdown creator that lets users specify a target date (or multiple), upload a background (video or image), and style the countdown text directly over it.
Built with a focus on interactivity, modular design, and a clear feature prioritization process.

## Table of Contents
1. Tech Stack and Tools Used
2. Features
   - Tier 1: Core Features
   - Tier 2: Extended Features
   - Tier 3: Enhancements
4. Project Structure
5. Setup Instructions
6. Bonus Questions/Future Improvements

## Tech Stack and Tools Used
- React: Component-based architecture
- JavaScript: Core logic and DOM manipulation
- CSS / Tailwind: Styling
- Draggable library: For repositioning countdown text
  
I chose React for this countdown app because its components and state system make it easy to handle multiple user interactions and update the UI in real time. Tailwind CSS was useful for styling and positioning elements quickly, especially for the Settings panel. JavaScript handles the main logic, and the Draggable library allows users to move the countdown text around easily. These tools together make the app interactive, organized, and easy to maintain.

## Features
### 🟢 Tier 1 - Core Features
**Live Countdown Timer ✅**  
Displays days, hours, minutes, and seconds updating in realtime  
- Approach: Initially, I created a sample targetDate and implemented logic to calculate the remaining days, hours, minutes, and seconds. I used React’s useState to store these values and useEffect with a 1-second interval to update them continuously. The UI automatically re-renders every second, and performs calculations based on the target date and time.
- Challenges: The main challenge for this section was the initial setup of my React app. I had to decide how I would organize my components (though that changed later in the development process) and how I was going to display the countdown on the screen.

**Date Selection ✅**  
Users can input a target date and time or multiple datetimes  
- Approach: For this step, I added the settings panel that is used to control all customizations and is organized in the SettingsPanel.js and SettingsControls.js files. I created a DateTimePicker component that uses date and time inputs to update the target date and time. The settings panel constructs an ISO datetime string and then calls updateCountdown to do so. To enter multiple datetimes, each countdown is represented as an object within an array and has a unique id and its own style data. Selecting a countdown updates the selectedCountdownId, letting the app display and edit only that timer’s settings.
- Challenges: This task took a significant amount of time because the main challenge was enabling users to add and manage multiple countdown dates. I initially focused on implementing the basic styling features first, then restructured the code to store each countdown in a list. From there, I added functionality to create a new countdown whenever the user clicked the “Add” button. Another challenge was designing an intuitive way for users to edit the date and time for each countdown. I solved this by making the settings panel context-aware — when a user selects a specific countdown, the panel updates to let them edit the styling and settings for that particular timer.

**Video Upload ✅**
Users can upload a .mp4 or .PNG/.JPEG file as the background.
- Approach: The way I chose to implement this feature is to allow users to either pick a color for the background or upload an image or video. The logic for this is handled in my BackgroundPicker component in SettingsControls.js. The uploaded file is converted into an object URL using URL.createObjectURL(file), then rendered dynamically in the background with object-cover styling. Color selections are applied with inline styling in App.js.
- Challenges: The main challenge for this task was ensuring the user is unable to pick a color if an image or video is uploaded. I also added the option to delete their uploaded image/video. In my BackgroundPicker component, I handled the logic for disabling selection of a color whenever an image/video is uploaded. 

**Basic Styling Controls ✅**  
User can choose a font size for the entire countdown and/or pick a single font color for all text  
- Approach: For styling controls, I added components to my Settings panel that allow the user to choose a fontsize via a slider or text input and choose a color via a color-picker using inputs. These inputs update the current countdown’s style object through a central updateCountdown() function, something I implemented after allowing the user to set multiple datetimes.
- Challenges: I spent some time figuring out the best way to handle font size customization. I wanted users to have flexibility but still stay within reasonable limits. At first, I tried a dropdown for preset sizes, then a mix of dropdown and text input, but syncing them was messy. I eventually switched to a range slider with a number input so users can drag or type a value within a set range. The main challenge was making this work smoothly in the settings panel.

### 🟡 Tier 2 - Extended Features
**Individual Styling Controls ✅**  
Users can set unique styles for Day, Hour, Minute, Seconds text including Font, Size, Color  
- Approach: For individualized styling controls I made it so each part of the countdown (Days, Hours, Minutes, Seconds) had its own customizable font, size, and color stored under countdown.styles[unit]. The settings panel dynamically renders controls for each section, updating only the affected unit when the user makes a change.
- Challenges: The key challenge was restructuring my style object to support nested styles for each part of the countdown. I fixed this by using object spread syntax and a consistent approach to merging state updates. I also made sure every style property was initialized from the start to avoid React’s controlled/uncontrolled input warnings.

**Draggable Text ✅**  
Users can manually position countdown text anywhere over the video to accomadate different background  
- Approach: I used react-draggable to make the countdown text repositionable. Each countdown has a nodeRef that allows users to drag it over the background freely. This improves layout flexibility and ensures compatibility with React’s strict mode (avoiding deprecated findDOMNode).
- Challenges: While there were other libraries available to implement draggable text, I used react-draggable as it was the most straightforward. In a future implementation, other tools can be used to make the dragging more responsive. 

**Live Preview ✅**  
Styling changes update instantly over the video or image so the user is able to easily update their choices.  
- Approach: Because I used React components for this app and all settings flow through React’s state, any style or background changes instantly update the live preview. Thus, I didn't have to do any extra implementation to fulfill this requirement. 
- Challenges: The main challenge was organizing the layout so the settings panel wouldn’t cover the preview. I used CSS transforms to try and make enough of the countdown visible. However, given that the text is draggable, there are cases where the text is covered by the settings panel when it comes up. This is something that could definitely be optimized in future versions of the app, possibly allowing the user to scroll to see all countdowns that are visible. 

### 🔴 Tier 3 - Enhancements
**Font Upload ✅**  
Users can upload their own .ttf or .otf font file  
- Approach: Users can upload .ttf or .otf files, which are read as object URLs and dynamically injected into the document as <style> tags using @font-face. The logic for this is handled in my FontUploader component. The uploaded font name is added to the available fonts list, allowing the user to pick it for each part of the countdown. I have an initialized list for available fonts the user can choose from and any uploaded files become fonts that are added to the list. Using this list logic made it easy to integrate the upload logic into my FontPicker component and I had to make minimal changes.
- Challenges:  I struggled with figuring out how to properly add uploaded fonts to the existing font list. I eventually decided to append the new font to the list so users could select it afterward, but implementing this logic within the FontPicker component was tricky to get right.

**Save and Reload Settings**  
Save user preferences in localStorage   
I was not able to implement this feature due to limited time. However, in a future version, countdown data and preferences specified by the user (including styles, backgrounds, and positions) can be saved to localStorage as JSON and reloaded on app startup using JavaScript. This would be managed with useEffect hooks.

**Animation Options**  
Users can apply fade-in, bouncing, or pulsating effects to the text.  
I was not able to implement this feature due to limited time. However, animations like fade-in, bounce, or pulse can be implemented with CSS @keyframes and added to certain components conditionally via class names based on the user's choices. This would allow users to toggle effects per unit without affecting performance.
 
## Setup Instructions
Follow these steps to run the project locally or build it for production.  

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```
### 2. Install Dependancies
Make sure you have Node.js (v16 or higher) and npm installed.
Then, install all required dependencies:
```bash
npm install
```
This will install React, Tailwind CSS, and other required packages listed in package.json

### 3. Run the development server
To run the project locally in development mode:
```bash
npm start
```
This will open the app in your browser at: 👉 http://localhost:3000

### 4. Build for production
To create an optimized production build:
```bash
npm run build
```
This will generate a build/ folder with all the compiled static files.
You can then host this folder on any static hosting service (e.g. GitHub Pages, Netlify, or Vercel).

## Bonus Questions
**If you had to scale this project for a real production packageable application, what considerations and optimizations would you make?**  

If I were to scale this project into a real production-level tool, I would focus on performance, maintainability, and user experience improvements:  
Although I did not get to the localStorage portion of the tasks, I believe in a real application, storing data in localStorage may not be the most optimal and secure, considering localStorage is accessible on the browser. Using cloud storage or a NoSQL database to store user preferences can be more scalable in the long-run. This would also allow for cross-browser usage of the app by the same user.

For a more packagable application, I would also split my code into smaller components. Although I tried my best to adhere to the single responsibility principle, there are parts of my organization that can be further optimized and broken down into smaller components. Better organization also opens up the possibility to easily add new features and edit existing features.

For better user experience (UX), I would make changes to the layout of my settings panel. I would ensure that all customization options are clearly labelled and the user is clearly informed of what each customization will do. In my current implementation, the user has to click on different countdowns to edit them but this is not made explicit and can be confusing. For a production-ready application, I would spend more time optimizing my UI and ensuring each interactive component of my application is clear and accessible.

For more complex user interactions (like multiple countdowns, global preferences, or collaborations), I’d use Redux or Context API to handle global state cleanly.

**Export Options → How would users be able to easily zip up an export package that can be run with the index.html on any browser and screen?** 

Exporting is important for an application like a countdown that can be displayed on multiple screens. To make this easy for the users, I'd add an "Export" option or button in my application that automatically downloads a .zip file that bundle's the user's preferences onto their device. The ZIP would have a version of the countdown that can run locally in any browser without needing a server and the user would open the index.html file to see their customized countdown on any screen.
