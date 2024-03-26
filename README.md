# Steam Library Stats

This is a code test submission for Perion to meet the requirements described [here](https://periondao.notion.site/Steam-Game-Library-Analyser-b381de248a464efe8ea9eaecd6358e57).

A deployed version can be found here: https://steam-stats-iota.vercel.app

**Note that library contents cannot be fetched if the library is not public**

Be sure to go to your profile settings page, and under privacy settings ensure your "Game details" are public

This app was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Next.js was picked for ease, as it allowed for a trivial deployment of both the backend and the frontend.

## Running Locally

In order to run this project locally, a steam api key must be provided to the project via an environment variable with the key `STEAM_API_KEY`. This can also be done by creating a `.env.local` at the project's root with the following content, replacing `XXX` with your api key:
```
STEAM_API_KEY=XXX
```

The development server can then be started by running the `dev` script command using the cli, or if using visual studio, pressing F5.

## Available API

The project exposes two api endpoints:

`/api/users/[user]/summary` - This endpoint is only provided for compliance and is not being used. It provides processed information for the user's steam library.
Its response is of the following shape:
```
{
    "totalOwned": the total number of games in a player's library
    "totalPlayedTime": the total number of hours played across all games in the library
    "mostPlayed" the name of the most played game in the library
    "games": [
        {
            "name": the name of the game
            "playtime": the time spent playing this game in hours
        }
    ]
}
```

This endpoint was created in order to meet the outlined requirements, but as a personal preference I believe that this sort of light data processing is in fact a client concern, not a server concern, and as such a second endpoint was introduced to provide the consuming app with greater flexibility

`/api/users/[user]` - The main endpoint powering the web app. It is just a thin wrapper around the steam api, mostly offloading authentication. It returns information about games in the user's library in the following shape:
```
{
    "games": [
        {
            "name": the name of the game
            "appid": the steam app id for the game
            "img": a steam internal id used for game image lookup
            "playtime": the time spent playing this game in minutes
        }
    ]
}
```

## Possible enhancements

### Steamid lookup

At the moment, the user must provide a steamid in order to search for a library. This is a fairly opaque string which is not trivial to find.
The user experience would be considerably better if instead of the steamid, the library could be looked up based on a user's account name, or other more publicly visibly identifier. This would require a mapping from such a representation to steamid, which based on the existence of [mapping services](https://www.steamidfinder.com) is definitely doable, however it appears that the api to achieve this is not straight forward to access and as such was not attempted as part of this submission

### Sharable links

It would be a great feature to add if users could share a link from the app already containing a loaded library, rather than sharing a link to the app as well as an id the receiver must look up.

This is fairly simple to implement, and I chose to skip it mostly because I felt like implementing it in anything other than a server component would feel a bit silly in the current context, but would also go very much directly against the instructions of this challenge.

### Profile details other than library

In addition to a player's library, their display name and avatar could also be displayed for a more complete view of their profile. 

This was not implmeneted because it just feels like it is more of the same and doesn't really bring anything new to the challenge.