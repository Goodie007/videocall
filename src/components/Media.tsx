import React, { useRef, useEffect } from "react";
import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";



export interface MediaProps {
    videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
    audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const Media = (props: MediaProps) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!container.current) return;

        props.videoTrack?.play(container.current);
        return () => {
            props.videoTrack?.stop()
        };
    }, [container, props.videoTrack])

    useEffect(() => {
        if(props.audioTrack){
            props.audioTrack?.play();
        }
        return () => {
            props.audioTrack?.stop()
        }
    }, [props.audioTrack]);

    return (
        <div ref={container} className="video-player" style={{ 
            width: '1200px', height: '800px',
             backgroundColor: 'black',
             marginLeft: '120px'
            }}></div>
    )
}

export { Media };