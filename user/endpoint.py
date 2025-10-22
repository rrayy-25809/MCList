from flask import blueprints, current_app, jsonify

bp = blueprints.Blueprint('user', __name__)

@bp.route('/users/')
def get_users():
    # 예시 사용자 데이터
    users = [
        { "id": 1, "username": '스티브' },
        { "id": 2, "username": '알렉스' },
        { "id": 3, "username": '크리퍼팬' },
        { "id": 4, "username": '엔더맨러버' },
    ]
    return jsonify(users)