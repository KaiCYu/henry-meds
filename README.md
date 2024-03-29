# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.g
ithub.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Figma wireframe link: https://www.figma.com/file/JzMpjtZL9MXdsqCbILotFs/Untitled?type=design&node-id=0%3A1&mode=design&t=CZLADRCbVngaBLKl-1

TODO/Nice to Haves:
General/overall:
- Better CSS/layout
- Add API mocks instead of hardcoded data
  - Add network mock (fake a promise) and add loading spinner
- Refactor components and file structure
- Use a flatter data structure (denormalize the reservation data so it's easier to manipulate)
- Convert to TS
- General readability
- Replace alerts/confirms with actual modals (bootstrap modal CSS wasnt working out of the box)
- Probably didn't actually need React context, but setup anyways
- Better route handling instead of relying on userId/isProvider/isClient
- More generalized utilities (setting the context, handling the back button better, etc)
- Improve createTimeslots to take into account exclusions (like weekends, nights, etc), or just use a better library lol

Provider side
- Show current provider set availability and/or confirmed schedule
- Allow multiple timeframes for provider availability ()
- Allow provider to cancel/delete reservation
- Add error handling/form validation to Provider form
- Allow timezone selection and localize TZ

Client side
- Need to filter out provider times that are already confirmed and unconfirmed reservations from the available timeslots

