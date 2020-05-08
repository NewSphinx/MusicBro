import React from 'react'
import styled from 'styled-components';

type SeekerProps = {
    percentage: Number,
    color: String,
    gArea: String
}

const Seeker = ({ percentage, color, gArea }: SeekerProps) => {
    return (
        <Container gridArea={gArea}>
            <Seek width={percentage} bgColor={color} />
        </Container>
    )
}

export default Seeker;

interface ContainerProps {
    gridArea: any
}
const Container = styled.div<ContainerProps>`
    /* these could be props too */
    grid-area: ${(props: any) => props.gridArea};
    height: 2px;
    width: 100%;
    background-color: grey;
`;

interface SeekProps {
    width: Number,
    bgColor: String
}
const Seek = styled.div<SeekProps>`
    height: 100%;
    width: ${(props: any) => props.width}%;
    background-color: ${(props: any) => props.bgColor};
`;