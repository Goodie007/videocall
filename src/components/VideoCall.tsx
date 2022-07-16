import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useLivestream from '../hooks/useLivestream';
import { Media } from './Media';


 const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc'})

 const VideoCall = () => {
    const [ appId, setAppId ] = useState('')
    const [ token, setToken ] = useState('')
    const [ channel, setChannel ] = useState('')
    const {
        localAudioTrack, localVideoTrack, join, leave, joinState, remoteUsers,
    } = useLivestream(client)

    return (
        <div>
            <form className="call-form">
                <label>
                    AppID:
                    <input type='text' name='appId' onChange={(event) => { setAppId(event.target.value)}} />
                </label>
                <label>
                    Token(Optional):
                    <input type='text' name='token' onChange={(event) => { setToken(event.target.value)}} />
                </label>
                <label>
                    Channel:
                    <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value)}} />
                </label>
                <div className="btn-group">
                    <button id="join" type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {
                        join(appId, channel, token )
                    }}>join</button>
                    <button id="leave" type='button' className="btn btn-primary btn-sm" disabled={!joinState} onClick={() => {
                        leave()
                    }}>leave</button>
                </div>
            </form>
            <div className='media-container'>
                <div className='player'>
                    <p className='local-player-text'>{localVideoTrack && `localTrack`}{ joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
                    <Media videoTrack={localVideoTrack} audioTrack={localAudioTrack} />
                </div>
                {remoteUsers.map(user => (<div className='remote-player' key={user.uid}>
                    <p className='remote-text'>{`remoteVideo(${user.uid})`}</p>
                    <Media videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
                </div>))}
            </div>
        </div>
    )
 }

 export default VideoCall;
