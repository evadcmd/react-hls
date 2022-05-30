import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const hlsSupported = Hls.isSupported()

export default function Video({ src }) {
    const videoRef = useRef(null)
    useEffect(() => {
        if (!hlsSupported)
            return
        let hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            videoRef.current.muted = true
            videoRef.current.play()
            videoRef.current.addEventListener('timeupdate', ({ timeStamp }) => console.log(timeStamp))
        })
    }, [src])
    return <>
        <video ref={videoRef} />
        <div>
            <button onClick={() => videoRef.current.play()}>play</button>
        </div>
    </>
}