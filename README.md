# 🔥 Byculla Flame
##### DJSCOE ACM Lines of Code Hackathon 2019
> Digital minor fires reporting using Twitter chatbot

Byculla Flames is a simpler way of reporting minor fires in Mumbai.

![Backend](https://img.shields.io/badge/Backend-Firebase-orange.svg)
[![HitCount](http://hits.dwyl.io/vixrant/dj-loc-19.svg)](http://hits.dwyl.io/vixrant/dj-loc-19)

![chatbot](/docs/img/chatbot.png) <br>
_General public can report a minor fire by tweeting to a Twitter chatbot._

![volunteer](/docs/img/pwa.jpg) <br>
_These reports are then verified by a trained volunteer. Firestations in Mumbai train over 2000 volunteers all over Mumbai. This is a Progressive Web App._

![map](/docs/img/map.png) <br>
_The reports are then displayed on the admin site._
_The admin map tells you where the fire is and which is the nearest firesation to deploy a firefighters unit to._

## Build instructions

#### React Dashboard:

Install all packages using `npm install` or `yarn install`.

- To run the server, `npm start` or `yarn start`.

- To build the webpack, `npm run build` or `yarn build`.

#### Firebase:

This project relies on firebase and firebase-tools for working.

I have used: *Authentication (Email & Password provider)* and *Cloud Firestore*.

- Deploy the functions to firebase by running `npm run deploy` or `yarn deploy` in the `functions/` directory.
- You can serve the functions using `npm run serve` or `yarn serve`.

#### Chatbot:

This solution depends on my configured Dialogflow. `mumareas.csv` is a CSV files of all the areas in Mumbai, taken from [Wikipedia](https://en.wikipedia.org/wiki/List_of_neighbourhoods_in_Mumbai).

## Solution technology Stack

1. Firebase for backend.
2. React for web app and PWA.
3. Dialogflow for Twitter chatbot.

## Developer

> Team Jalebi Fafadaa.

This was built by 1 developer in 24 hours, from 10.30AM on March 15 to 10.30AM on March 16.

> Vikrant Gajria - [vikrant.ga](https://www.vikrant.ga/) - [github.com/vixrant](https://github.com/vixrant)

## Contributing

1. Fork it (<https://github.com/vixrant/dj-loc-19/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Failures

> As with all my hackathon projects, I include a [FAILURES.md](/FAILURES.md)
> which includes all the obstacles that I encountered while developing this project.
> This project was completed. 
> But that doesn't mean I ignore the small mistakes that I made along the way.

--------------
APGLv3 LICENSE
--------------

> Copyright (C) 2019 Vikrant Gajria
>
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU Affero General Public License as published
> by the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU Affero General Public License for more details.
>
> You should have received a copy of the GNU Affero General Public License
> along with this program.  If not, see <https://www.gnu.org/licenses/>.
