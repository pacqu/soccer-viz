import json
from flask import Flask, jsonify, request, json
import pandas as pd
import random
import ast
import datetime

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
teams = pd.read_csv("./data/teams.csv")
#print(tags)

@app.route("/matches/<int:league_index>")
def get_matches(league_index):
    league_matches = match_list[league_index].copy()
    
    #filters
    #print(request.args.get('start'))
    start_date = pd.to_datetime((request.args.get(
        'start') if request.args.get('start') else '2016-6-10'), utc=True)
    #print(start_date)
    end_date = pd.to_datetime((request.args.get('end') if request.args.get('end') else '2019-5-20'), utc=True)
    league_matches['date'] = pd.to_datetime(league_matches['date'], utc=True)
    league_matches = league_matches[(league_matches.date >= start_date) & (league_matches.date <= end_date)]
    if request.args.get('teams'):
        #team_ids = [1612, 1610, 1624, 1625] #ast.literal_eval(request.args.get('teams'))
        team_ids = ast.literal_eval(request.args.get('teams'))
        league_matches = league_matches[(league_matches['team1.teamId'].isin(
            team_ids)) | (league_matches['team2.teamId'].isin(team_ids))]
    
    #sorts
    #date
    if request.args.get('sort'):
        league_matches = league_matches.sort_values(by=['date'], ascending=(True if request.args.get('asc') else False))
    
    def match_label_decode(row):
        label = row.label.encode('utf-8').decode('unicode-escape')
        return pd.Series([label], index=['label'])
    league_matches.loc[:,['label']] = league_matches.apply(match_label_decode, axis=1)
    return jsonify(league_matches.loc[:,["wyId","gameweek","label","date"]].to_dict('records'))

@app.route("/matches/<int:league_index>/match/<int:wy_id>")
def get_match(league_index, wy_id):
    league_matches = match_list[league_index]
    match = league_matches[league_matches.wyId == wy_id].copy()
    team1_id = match["team1.teamId"].values[0]
    team1 = teams[teams.wyId == team1_id].loc[:, 'name'].values[0].encode(
        'utf-8').decode('unicode-escape')
    team2_id = match["team2.teamId"].values[0]
    team2 = teams[teams.wyId == team2_id].loc[:, 'name'].values[0].encode(
        'utf-8').decode('unicode-escape')
    match.loc[:, 'team1.name'] = team1
    match.loc[:, 'team2.name'] = team2
    match.loc[:, 'team1.formation'] = json.dumps(ast.literal_eval(match.loc[:, 'team1.formation'].values[0]))
    match.loc[:, 'team2.formation'] = json.dumps(ast.literal_eval(match.loc[:, 'team2.formation'].values[0]))
    match.loc[:, 'label'] = match.loc[:, 'label'].values[0].encode(
        'utf-8').decode('unicode-escape')
    return jsonify(match.to_dict('records')[0])

@app.route("/matches/<int:league_index>/match/<int:match_id>/events")
def get_match_events(league_index, match_id):
    match_events = event_list[league_index].groupby('matchId').get_group(match_id)
    match_events = match_events.fillna('')
    return jsonify(match_events.to_dict('records'))

@app.route("/matches/<int:league_index>/match/<int:match_id>/positions")
def get_match_positions(league_index, match_id):
    def position_split(row):
        pos_obj = ast.literal_eval(row.positions[1:-1])
        start_x = start_y = end_x = end_y = None
        if type(pos_obj) is dict:
            start_x = pos_obj['x']
            start_y = pos_obj['y']
            end_x = pos_obj['x']
            end_y = pos_obj['y']
        else:
            start_x = pos_obj[0]['x']
            start_y = pos_obj[0]['y']
            end_x = pos_obj[1]['x']
            end_y = pos_obj[1]['y']
        return pd.Series([start_x, start_y, end_x, end_y],index=['start_x', 'start_y', 'end_x', 'end_y'])
    match_events = event_list[league_index].groupby('matchId').get_group(match_id).copy()
    match_events.loc[:, ['start_x', 'start_y', 'end_x', 'end_y']] = match_events.apply(position_split, axis=1)
    match_events = match_events.fillna('')
    player_positions = match_events.groupby('playerId').mean().loc[:, ['start_x', 'start_y', 'end_x', 'end_y', 'pos_orig_x', 'pos_orig_y', 'pos_dest_x', 'pos_dest_y']]
    return jsonify(player_positions.to_dict('index'))
    

@app.route("/matches/<int:league_index>/match/<int:match_id>/events/<int:event_id>")
def get_event_details(league_index, match_id, event_id):
    league_events = event_list[league_index]
    event = league_events[league_events.id == event_id]
    event = event.fillna('')
    def tag_string(row):
        tag_str = []
        tag_arr = [] if not row.tagsList else ast.literal_eval(row.tagsList)
        for tag_id in tag_arr:
            #print(tag_id)
            tag_desc = tags[tags.Tag == tag_id]['Description'].values
            if len(tag_desc):
                tag_str.append(tag_desc[0])
        tag_str = ', '.join(tag_str)
        return pd.Series([tag_str, tag_arr], index=['tag_str', 'tag_arr'])
    def position_split(row):
        pos_obj = ast.literal_eval(row.positions[1:-1])
        start_x = pos_obj[0]['x']
        start_y = pos_obj[0]['y']
        end_x = pos_obj[1]['x']
        end_y = pos_obj[1]['y']
        return pd.Series([start_x, start_y, end_x, end_y], index=['start_x', 'start_y', 'end_x', 'end_y'])
    event.loc[:,['tag_str', 'tag_arr']] = event.apply(tag_string, axis="columns")
    event.loc[:, ['start_x', 'start_y', 'end_x', 'end_y']] = event.apply(position_split, axis=1)
    return jsonify(event.to_dict('records')[0])


@app.route("/matches/random")
def random_match():
    random_match = random.choice(match_list).sample()
    return jsonify(random_match.to_dict('records')[0])

@app.route("/player")
def get_player():
    def player_name_decode(row):
        firstName = row.firstName.encode('utf-8').decode('unicode-escape')
        lastName = row.lastName.encode('utf-8').decode('unicode-escape')
        middleName = row.middleName.encode('utf-8').decode('unicode-escape')
        shortName = row.shortName.encode('utf-8').decode('unicode-escape')
        role = json.dumps(ast.literal_eval(row.role))
        return pd.Series([firstName, lastName, middleName, shortName,role],index=['firstName', 'lastName', 'middleName', 'shortName','role'])
    player_ids = ast.literal_eval(request.args.get('id'))
    players_q = players[players.wyId.isin(player_ids)].loc[:,['firstName','lastName','middleName','role','shortName','wyId']].copy().set_index('wyId')
    players_q = players_q.fillna('')
    players_q.loc[:, ['firstName','lastName','middleName','shortName','role']] = players_q.apply(player_name_decode, axis=1)
    return jsonify(players_q.to_dict('index'))

if __name__ == "__main__":
    app.run(debug=True, ) 