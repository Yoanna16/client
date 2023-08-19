import React, { useState } from 'react';
import {
    Slider,
    SliderFilledTrack,
    SliderTrack,
    Tooltip,
    SliderThumb,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Portal,
    Button,
} from '@chakra-ui/react'
import { supabase } from '../supabase';
import { renderDiffColors } from '../helpers';



const Difficulty = ({ difficulty, id }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [diff, setDifficulty] = useState('');

    async function handleChange(value) {
        const { data } = await supabase
            .from('todos')
            .update({ difficulty: value })
            .eq('id', id)
        window.location.reload();
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button colorScheme={renderDiffColors(difficulty)}>{difficulty}</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        <Slider 
                        aria-label='slider-ex-1' 
                        defaultValue={difficulty} 
                        min={0}
                        max={100} 
                        onChange={v => setDifficulty(v)}
                        onChangeEnd={handleChange} 
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg="blue.500"
                                color="white"
                                placement="top"
                                isOpen={showTooltip}
                                label={`${diff}`}
                            >
                                <SliderThumb />
                            </Tooltip>
                        </Slider>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>




    )
}

export default Difficulty
