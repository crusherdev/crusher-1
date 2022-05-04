import React, {Suspense} from 'react';
import { css } from "@emotion/react";

import { Toolbar } from './toolbar';
import { Sidebar } from './sidebar';
import Player from "./player";
import { useRouter } from 'next/router';
import { Conditional } from 'dyson/src/components/layouts';

function LivePlayer() {
  const { query } = useRouter();
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    if(query.recording) {
      window.fetch(query.recording).then((res) => {
       return res.text();
      }).then((res) => {
        try{
          setEvents(JSON.parse(res));
        } catch(ex) {}
        console.log("URL is", query.recording);
      });
    }
  }, [query.recording]);
  return (
      <div css={containerStyle}>
        <Toolbar/>
        <div css={mainContainerStyle}>
          {events && (
            <Player events={events} />
          )}
          <Sidebar/>
        </div>
      </div>
  );
}

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  background: #101215;
  display: flex;
  flex-direction: column;
`;

const mainContainerStyle = css`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export { LivePlayer };