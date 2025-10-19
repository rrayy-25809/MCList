import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import ServerCard from '../components/ServerCard';

function HomePage(){
    const [Count, setCount] = useState(4);

    return (<div className="container">
        <InputGroup data-bs-theme="dark">
            <Form.Control placeholder="서버 이름 또는 IP 검색"/>
            <Button variant="outline-secondary">전체</Button>
            <Button variant="outline-secondary">추천 TOP</Button>
            <Button variant="outline-secondary">온라인만</Button>
        </InputGroup>
        <div className="server-count">총 {Count}개 서버</div>
        <div className='server-list'>
            <ServerCard Name='테스트 용 하픽' address='hypixel.net' port={25565} tag={["미니게임", "배드워즈"]}></ServerCard>
            <ServerCard Name='테스트 용 동글랜드' address='dongleland.com' port={25565} tag={["야생","성인 전용","타우니","RPG","경제"]}></ServerCard>
            <ServerCard Name='테스트 용 베어타운' address='beartown.kr' port={25565} tag={["경제", "RPG", "타우니", "건축","야생"]}></ServerCard>
            <ServerCard Name='테스트 용 슈' address='syuu.net' port={25565} tag={["미니게임", "배드워즈"]}></ServerCard>
        </div>
        <div className="pagination">
            <button>이전</button>
            <span>1 / 1</span>
            <button>다음</button>
        </div>
    </div>);
}

export default HomePage