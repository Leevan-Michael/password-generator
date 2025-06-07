from flask import Flask, render_template, request
import random
import string

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    password = None
    error = None
    if request.method == 'POST':
        try:
            length = int(request.form.get('length', 12))
        except ValueError:
            length = 12

        uppercase = 'uppercase' in request.form
        lowercase = 'lowercase' in request.form
        numbers = 'numbers' in request.form
        special = 'special' in request.form

        chars = ''
        if uppercase: chars += string.ascii_uppercase
        if lowercase: chars += string.ascii_lowercase
        if numbers: chars += string.digits
        if special: chars += string.punctuation

        if not chars:
            error = "Select at least one character type."
        else:
            password = ''.join(random.choice(chars) for _ in range(length))

    return render_template('index.html', password=password, error=error)

if __name__ == '__main__':
    app.run(debug=True)
