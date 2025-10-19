import { get_info } from "../api/server_info";
import { useEffect, useState } from 'react';

type Props = {
  Name: string;
  address: string;
  port: number;
  tag: string[];
};

function ServerCard({Name, address, port, tag}: Props){
    const [info, setInfo] = useState<{status:string, Players:string|number}|null>(null);

    useEffect(() => {
        let mounted = true;
        get_info(address).then(data => { if (mounted) setInfo(data); });
        return () => { mounted = false; };
    }, [address]);

    if (info) {
        return (<div className="server-card">
            <div className="server-status">
                <span className={"status-dot "+info.status}></span>
                <span className="status-text">{info.status}</span>
            </div>

            <h2 className="server-name">{Name}</h2>
            <p className="server-desc">{tag.join(", ")}</p>

            <div className="server-info">
                <div className="info-box">
                    <div className="info-label">IP</div>
                    <div className="info-value">{address}</div>
                </div>
                <div className="info-box">
                    <div className="info-label">Port</div>
                    <div className="info-value">{port}</div>
                </div>
                <div className="info-box">
                    <div className="info-label">투표</div>
                    <div className="info-value">0</div>
                </div>
                <div className="info-box">
                    <div className="info-label">플레이어</div>
                    <div className="info-value">{info.Players}</div>
                </div>
            </div>
        </div>);
    }
}

export default ServerCard;