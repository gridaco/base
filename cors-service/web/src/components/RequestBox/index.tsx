import React, { useState} from 'react'
import styled from '@emotion/styled';
import send from './send-button.svg';
import close from './close.svg';

const RequestBox = () => {
    const [isSend, setIsSend] = useState(false);

    return (
        <Container>
            <h3>Request</h3>
            <div className="row">
                <div className="method-selector">
                    <label>Method</label>
                    <Selector>
                        <option value="GET" label="GET" />
                        <option value="POST" label="POST" />
                    </Selector>
                </div>
                <div className="url-field">
                    <label>URL</label>
                    <div className="url-area">
                        <UrlInput placeholder="API URL, https://google.com" />
                        <RequestButton onClick={() => setIsSend(!isSend)}>
                            {isSend ? "CLOSE" : "REQUEST" }
                            <img src={isSend ? close : send} />
                        </RequestButton>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RequestBox

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0.8);
    border-radius: .5rem;
    padding-bottom: .5rem;
    padding-right: .5rem;
    padding-left: .5rem;
    margin-bottom: 1rem;

    h3 {
        color: #fff;
        padding-left: .5rem;
    }

    .row {
        display: flex;
        .method-selector {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .url-field {
            display: flex;
            flex-direction: column;
            flex: 5;
            .url-area {
                display: flex;
            }
        }
    }

    label {
        color: #fff;
        padding: 1rem;
        font-size: .875rem;
        font-weight: 500;
    }
`

const Selector = styled.select`
    height: 57px;
    background-color: hsla(0, 0%, 100%, 0);
    border: none;
    outline: none;
    padding: .5rem;
    font: 400 13.3333px;
    color: #fff;
    margin-left: .5rem;

    &:hover {
        box-shadow: inset 0 0 0 2px hsla(0,0%,100%,0.5);
    }
`

const UrlInput = styled.input`
    height: 56px;
    margin-left: .5rem;
    background-color: hsla(0, 0%, 100%, 0);
    border: none;
    outline: none;
    color: #fff;
    flex: 7;
    padding: 0px .5rem 0px .5rem;

    &:hover, &:focus {
        box-shadow: inset 0 0 0 2px hsla(0,0%,100%,0.5);
    }
`

const RequestButton = styled.button`
    flex: 1;
    display: flex;
    background-color: #31c48d;
    border: none;
    align-items: center;
    outline: none;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;

    img {
        width: 24px;
        margin-left: 1em;
    }
`