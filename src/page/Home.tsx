import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

function HomePage(){
    const [Count, setCount] = useState(0);

    return (<div className="container">
        <InputGroup data-bs-theme="dark">
            <Form.Control placeholder="서버 이름 또는 IP 검색"/>
            <Button variant="outline-secondary">전체</Button>
            <Button variant="outline-secondary">추천 TOP</Button>
            <Button variant="outline-secondary">온라인만</Button>
      </InputGroup>
      <div className="server-count">총 {Count}개 서버</div>
      <div className='server-list'>
        
      </div>
    </div>);
}

export default HomePage