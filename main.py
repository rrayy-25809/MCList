from flask import Flask, request, session, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from server import server_bp
from user import user_bp
import sqlite3

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.register_blueprint(server_bp)
app.register_blueprint(user_bp)
CORS(app)  # 모든 출처 허용. 필요한 경우 특정 도메인만 허용도 가능

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")