import React from 'react'
import styled from '@emotion/styled';

const Header = () => {
    return (
        <Container>
            <h1 className="title">cors.birdged.cc</h1>
            <iframe src="https://ghbtns.com/github-btn.html?user=bridgedxyz&amp;repo=services&amp;type=star&amp;count=true" width="150" height="20" title="GitHub" loading="lazy" />
        </Container>
    )
}

export default Header

const Container = styled.div`
    padding: .5rem;
    display: flex;
    align-items: center;

    .title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
    }

    iframe {
        border: none;
        margin-left: 2rem;
    }
`
