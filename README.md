# Trivioke

Trivia quiz game made with React.

## Table of Contents

1. [Team](#team)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Login / Logout](#login-/-logout)
5.[Deployment](#deployment)
6.[Known Bugs](#known-bugs)

## Team

  - __Development Team Members__: Berhane Cole, Bilal Hankins, James Thomason, & Persis Randolph


## Usage

> Sign Up/Login leads to trivia page where user can input team names, trivia category, and difficulty. Begins when begin game button is clicked, Correct answer adds a point to the team and incorrect triggers youtube call for karaoke.

## Requirements

- MySQL database v5.7

## Development

- Open Trivia Database is used for questions.
- Youtube API is used for karaoke.

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Login / Logout

- Used react-google-login and Oath 2.0 for Login and Logout buttons.
  Set up credentials for the Google+ API in order to attain the Client ID. Used that client ID in conjunction with
  the react-google-login package in order to allow logins. Upon login, Google sends back a profile object containing
  the user's username, full name, profile picture, email, and googleId. Used this information to save new users to
  our DB, or log them back in if already existing.
  react-google-login documentation: https://www.npmjs.com/package/react-google-login

## Deployment

- Used an Amazon EC2 Instance with Ubuntu 20.04.
  Used PM2 for process management.
  Tutorial article here: https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171
  Also see part 2 of that article for more steps.

## Known Bugs

1) Open Trivia DB has an API token to limit duplicate questions, but it expires every 6 hours.
2) Buttons in load menu don't maintain styling after selecting a second button.
3) Should not be a 50/50 lifeline option when playing T/F questions.
4) You should not be able to play a game unless you are logged in.
5) On production - team names are not saving to the associated googleId/userId.