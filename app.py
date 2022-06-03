import json
from nis import match
from flask import Flask, jsonify, request, json
import pandas as pd
import random
import ast

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

english_matches = pd.read_csv("./data/matches_England.csv")
euro_matches = pd.read_csv("./data/matches_European_Championship.csv")
french_matches = pd.read_csv("./data/matches_France.csv")
german_matches = pd.read_csv("./data/matches_Germany.csv")
italian_matches = pd.read_csv("./data/matches_Italy.csv")
spanish_matches = pd.read_csv("./data/matches_Spain.csv")
wc_matches = pd.read_csv("./data/matches_World_Cup.csv")
match_list = [english_matches, euro_matches, french_matches, german_matches, italian_matches, spanish_matches, wc_matches]

english_events = pd.read_csv("./data/events_England.csv")
euro_events = pd.read_csv("./data/events_European_Championship.csv")
french_events = pd.read_csv("./data/events_France.csv")
german_events = pd.read_csv("./data/events_Germany.csv")
italian_events = pd.read_csv("./data/events_Italy.csv")
spanish_events = pd.read_csv("./data/events_Spain.csv")
wc_events = pd.read_csv("./data/events_World_Cup.csv")
event_list = [english_events, euro_events, french_events, german_events, italian_events, spanish_events, wc_events]

players = pd.read_csv("./data/players.csv")

tags = pd.read_csv("./data/tags2name.csv")
#print(tags)

@app.route("/matches/<int:league_index>")
def get_matches(league_index):
    league_matches = match_list[league_index]
    #print(league_matches.loc[:,["wyId","gameweek","label"]].to_dict('records'))
    return jsonify(league_matches.loc[:,["wyId","gameweek","label","date"]].to_dict('records'))

@app.route("/matches/<int:league_index>/match/<int:wy_id>")
def get_match(league_index, wy_id):
    league_matches = match_list[league_index]
    return jsonify(league_matches[league_matches.wyId == wy_id].to_dict('records')[0])

@app.route("/matches/<int:league_index>/match/<int:match_id>/events")
def get_match_events(league_index, match_id):
    def event_summary(row):
        game_time = round(row.eventSec / 60) + (45 if row.matchPeriod == '2H' else 0)
        player_name = '' if not len(players[players.wyId == row.playerId]['shortName'].values) else players[players.wyId == row.playerId]['shortName'].values[0]
        event_name = row.subEventName if not (isinstance(row.tagsList,str) and '101' in row.tagsList[1:-1].split(',')) else "GOAL!!!"
        return "{game_time}' - {player_name} {event_name}".format(game_time=game_time, player_name=player_name, event_name=event_name) 
    match_events = event_list[league_index].groupby('matchId').get_group(match_id)
    match_events.loc[:,'summary_str'] = match_events.apply(event_summary, axis="columns")
    match_events = match_events.fillna('')
    return json.dumps(match_events.to_dict('records'))

@app.route("/matches/<int:league_index>/match/<int:match_id>/positions")
def get_match_positions(league_index, match_id):
    def position_split(row):
        pos_obj = ast.literal_eval(row.positions[1:-1])
        #print(pos_obj)
        #print(ast.literal_eval(row.positions[1:-1]))
        row['start_x'] = pos_obj[0]['x']
        row['start_y'] = pos_obj[0]['y']
        row['end_x'] = pos_obj[1]['x']
        row['end_y'] = pos_obj[1]['y']
        return row
    #league_matches = match_list[league_index]
    #match = league_matches[league_matches.wyId == wy_id].to_dict('records')[0]
    #team1_id = match["team1.teamId"]
    #team2_id = match["team2.teamId"]
    match_events = event_list[league_index].groupby('matchId').get_group(match_id).apply(position_split, axis=1)
    player_positions = match_events.groupby(['teamId','playerId']).mean().loc[:,['start_x', 'start_y', 'end_x', 'end_y']].reset_index()
    #print(player_positions)
    return jsonify(player_positions.to_dict('records'))
    

@app.route("/event/<int:league_index>/<int:match_id>/<int:event_id>")
def get_event_details(league_index, match_id, event_id):
    league_events = event_list[league_index]
    print(event_id)
    event = league_events[league_events.id == event_id]
    def event_summary(row):
        game_time = round(row.eventSec / 60) + (45 if row.matchPeriod == '2H' else 0)
        player_name = '' if not len(players[players.wyId == row.playerId]['shortName'].values) else players[players.wyId == row.playerId]['shortName'].values[0]
        event_name = row.subEventName if not (isinstance(row.tagsList,str) and '101' in row.tagsList[1:-1].split(',')) else "GOAL"
        return "{game_time}' - {player_name} {event_name}".format(game_time=game_time, player_name=player_name, event_name=event_name) 
    def tag_string(row):
        tag_str = []
        for tag_id in ast.literal_eval(row.tagsList):
            #print(tag_id)
            tag_desc = tags[tags.Tag == tag_id]['Description'].values
            if len(tag_desc):
                tag_str.append(tag_desc[0])
        #print(tag_str)
        return ', '.join(tag_str)
    event.loc[:,'summary_str'] = event.apply(event_summary, axis="columns")
    event.loc[:,'tag_str'] = event.apply(tag_string, axis="columns")
    return jsonify(event.to_dict('records')[0])


@app.route("/matches/random")
def random_match():
    random_match = random.choice(match_list).sample()
    return jsonify(random_match.to_dict('records')[0])

@app.route("/player/<int:player_id>")
def get_player(player_id):
    player = players[players.wyId == player_id]
    return jsonify(player.to_dict('records'))

if __name__ == "__main__":
    app.run(debug=True, )