import { Outlet, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {

  return (
    <div>
      <header className="header">
        <div className="logo">MC List</div>
        <nav className="nav">
            <Link to="/"><Button variant="success">서버 등록</Button></Link>
            <Link to="/"><Button className='gray-btn'>커뮤니티</Button></Link>
            <Link to="/login"><Button className='gray-btn'>로그인</Button></Link>
            <Link to="/signup"><Button className='gray-btn'>회원가입</Button></Link>
        </nav>
    </header>
      <main>
        {/* 현재 경로에 맞는 페이지(예: HomePage.tsx)가 이 위치에 렌더링됩니다. */}
        <Outlet />
      </main>
      <footer className="footer">
        License <a href="https://opensource.org/license/mit" target='_blank'>MIT</a> · MCList 스타일 서버 리스트 & 추천
    </footer>
    </div>
  );
}

export default App;