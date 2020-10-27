import markovify
import numpy as np
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def render_index():
    return render_template('index.html')


@app.route('/particle.html')
def render_particles():
    print("egg")
    return render_template('particle.html')


@app.route('/poem.html')
def render_poem():
    with open("static/poem.txt", encoding="utf8") as f:
        text = f.read()
    num = np.random.randint(2)
    if num == 0:
        text_model = markovify.NewlineText(text)
    else:
        text_model = markovify.Text(text)

    sentence = text_model.make_sentence()
    blob = TextBlob(sentence) #analyzer=NaiveBayesAnalyzer()
    print(blob.sentiment)
    return render_template('poem.html', data=sentence)


if __name__ == '__main__':
    app.run()

# MAKROV CHAIN OLD
"""
def pair_words(words):
    for i in range(len(words)-1):
        yield (words[i], words[i+1])
        
 poem = open("static/poem.txt", encoding="utf8").read()
    split_poem = poem.split()
    print(split_poem)
    word_pairs = pair_words(split_poem)
    print(word_pairs)
    word_dictionary = {}
    for word1, word2 in word_pairs:
        if word1 in word_dictionary.keys():
            word_dictionary[word1].append(word2)
        else:
            word_dictionary[word1] = [word2]
    first = np.random.choice(split_poem)
    while first.islower():
        first = np.random.choice(split_poem)
    chain = [first]
    n = 30
    for i in range(n):
        chain.append(np.random.choice(word_dictionary[chain[-1]]))
    final=' '.join(chain)
    print(final)
"""
