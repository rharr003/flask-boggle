from boggle import Boggle
from flask import request, render_template, redirect, session, url_for, Flask, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello'
boggle_game = Boggle()


@app.route('/')
def home():
    if not session.get('board'):
        session['board'] = boggle_game.make_board()
    return render_template('index.html', board=session['board'])


@app.route('/check-answer/<guess>')
def check_answer(guess):
    response = boggle_game.check_valid_word(session['board'], guess)
    return jsonify({'result': response})

@app.route('/game-finished/<score>')
def finish_game(score):
    if not session.get('highscore'):
        session['highscore'] = score
    else:
        session['highscore'] = max(session['highscore'], score)
    if not session.get('attemps'):
        session['attemps'] = 1
    else:
        session['attemps'] += 1
    session['board'] = boggle_game.make_board()
    return redirect(url_for('home'))

app.run(debug=True)