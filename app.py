from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def render_index():
    return render_template('index.html')

@app.route('/particle.html')
def render_particles():
    return render_template('particle.html')


if __name__ == '__main__':
    app.run()
