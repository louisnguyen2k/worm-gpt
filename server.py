from flask import Flask, request, jsonify
from flask_cors import CORS
import helper
app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    ai_response = helper.call_api(user_message)
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)