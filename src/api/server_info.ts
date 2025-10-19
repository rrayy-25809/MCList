async function get_info(address:string){
    const response =  await fetch(`https://api.mcsrvstat.us/3/${address}`);
    const json = await response.json();
    if (json["online"]) {
        return {"status" : "Online", "Players" : json["players"]["online"]}
    } else {
        return {"status" : "Offline", "Players" : "-"}
    }
}

export {get_info};