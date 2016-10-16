# Stateflow CSGO

stateflow-csgo is a small application layer that listens to the (rather quirky) CSGO Gamestate Integration API to help developers derive useful match information in the form of events.

# What CSGO gives you

# What Stateflow-csgo gives you

Remove duplication
Meaningful events

# TODO

- How does the application talk to other applications? fresh HTTP requests?


# Requirements
- node 6.0.0+
- mongodb (?)

# Installation
Requires a configuration file to be placed inside `${CSGO_DIR}/cfg` with something akin to the following...
```
{
 "uri" "http://127.0.0.1:3001"
 "timeout" "5.0"
 "buffer"  "0.1"
 "throttle" "0.5"
 "heartbeat" "60.0"
 "auth"
 {
   "token" "CCWJu64ZV3JHDT8hZc"
 }
 "data"
 {
   "provider"            "1"
   "map"                 "1"
   "round"               "1"
   "player_id"           "1"
   "player_state"        "1"
   "player_weapons"      "1"
   "player_match_stats"  "1"
 }
}
```