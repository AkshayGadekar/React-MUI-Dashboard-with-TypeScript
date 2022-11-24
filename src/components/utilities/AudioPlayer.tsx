import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { log } from "../../funcs/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import type {AudioPlayerProps} from '../../types/components';
import {formatSecondsAsTime} from "../../funcs/helpers";
import {noWrap} from "../../objects/objects";

const AudioPlayer = (props: AudioPlayerProps) => {

    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioPlayingHasStarted, setAudioPlayingHasStarted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRestartRef = useRef<HTMLDivElement>(null);
    const audioLoaderRef = useRef<HTMLDivElement>(null);
    const audioTimeRef = useRef<HTMLSpanElement>(null);

    const playAudio = () => {
      setAudioPlaying((value) => !value);
    }
    const restartAudio = () => {
      audioRef.current!.currentTime = 0;
      setAudioPlaying(true);
    }
    audioPlaying ? audioRef.current?.play() : audioRef.current?.pause();

    const updateTime = () => {
        setAudioPlayingHasStarted(true);

        const currTimeFloat = audioRef.current!.currentTime;
        const durationFloat = audioRef.current!.duration;
        
        const currTime: number = Math.floor(currTimeFloat); 
        const duration: number = Math.floor(durationFloat);

        const currTimeString = formatSecondsAsTime(currTime);
        const durationString = formatSecondsAsTime(duration)
        
        audioTimeRef.current!.innerHTML = `${currTimeString} / ${durationString}`;
        audioLoaderRef.current!.style.width = `${(currTimeFloat/durationFloat)*100}%`;
        
        if (!audioRef.current!.ended) {
            audioRestartRef.current!.style.display = "block";
        } else {
            audioRestartRef.current!.style.display = "none";
            setAudioPlaying(false);
        }

    }

    return (
        <>
            <audio ref={audioRef} onTimeUpdate={updateTime} style={{display: 'none'}}>
                <source src={props.url} type="audio/wav" />
            </audio>
            <Box display="flex" alignItems={"center"} width={'90%'}>
                <Box bgcolor={'primary.main'} width="25px" 
                    sx={{borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRight: '1px solid rgba(0,0,0,.2)', 
                    cursor: 'pointer', '&:hover': {opacity:'.9'}}}
                    onClick={playAudio}>
                    {
                        !audioPlaying ? 
                        <PlayArrowIcon sx={{verticalAlign: 'middle'}} /> :
                        <PauseIcon sx={{verticalAlign: 'middle'}} />
                    }
                </Box>
                <Box bgcolor={'primary.main'} width="25px" display="none"
                    sx={{cursor: 'pointer', '&:hover': {opacity:'.9'}}} onClick={restartAudio} ref={audioRestartRef}>
                    <SkipPreviousIcon sx={{verticalAlign: 'middle'}} />
                </Box>
                <Box bgcolor={'grey.300'} alignSelf={"normal"} position="relative"
                    sx={{borderTopRightRadius: 6, borderBottomRightRadius: 6, flexGrow: 1}}>
                    <Box position="absolute" width="0%" height="100%" bgcolor={'rgba(0,0,0,.1)'} top={0} sx={{transition: 'width .5s', borderTopRightRadius: 6, borderBottomRightRadius: 6}} ref={audioLoaderRef}></Box>
                    <Box component="span" display="inline-block" width='calc(100% - 123px)' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "left", 
                        ...noWrap}}>{props.fileName}</Box>
                    <Box component="span" display="inline-block" width='23px' position="relative" zIndex={100} pr={1} sx={{top: '5px', float: "right"}} >
                        <CircularProgress size={15} sx={{float: 'right', visibility: ((audioPlaying && !audioPlayingHasStarted) ? 'visible': 'hidden')}} />
                    </Box>
                    <Box component="span" display="inline-block" width='100px' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "right"}} ref={audioTimeRef}>00:00 / {formatSecondsAsTime(Math.floor(props.duration))}</Box>
                </Box>
            </Box>
        </>
    )
}

export default AudioPlayer;