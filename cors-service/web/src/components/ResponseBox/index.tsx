import React from 'react'
import styled from '@emotion/styled';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// #f98080 
// #31c48d
const ResponseBox = () => {
    const codeString = `{ 
    hello: asd, 
    asd : asd 
}`;
    return (
        <Container>
            <h3>Response</h3>
            <div className="status-list">
                <span>
                    status : <strong className="success">200</strong>
                </span>
                <div className="detail">
                    <span>Duration : 000 ms</span>
                    <span>Size : 000 B</span>
                </div>
            </div>
            <SyntaxHighlighter showLineNumbers language="json" style={dark}>
                {codeString}
            </SyntaxHighlighter>
        </Container>
    )
}

export default ResponseBox

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

    .success {
        color: #31c48d
    }

    .fail {
        color: #f98080;
    }

    .status-list {
        padding-left: .5rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
        flex: 1;

        .detail {

           span {
               padding: 1rem;
           }
        }
    }

        .url-field {
            display: flex;
            flex-direction: column;
            flex: 5;
            .url-area {
                display: flex;
            }
        }

    label {
        color: #fff;
        padding: 1rem;
        font-size: .875rem;
        font-weight: 500;
    }
`