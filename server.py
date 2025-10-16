from flask import Flask, request, jsonify
from flask_cors import CORS
import helper
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    ai_response = helper.call_api(user_message)
    return jsonify({'response': f'<span class="wormgpt-prefix">[WormGPT]</span>: {ai_response}'})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'wormgpt-api'})

if __name__ == '__main__':
    # Production settings
    debug_mode = os.getenv('FLASK_DEBUG', '0') == '1'
    port = int(os.getenv('PORT', 5000))
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug_mode
    )